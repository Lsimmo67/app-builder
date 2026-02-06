#!/usr/bin/env tsx
/**
 * Vault Import Script
 * Imports components from vault-dump.json into the app-builder registry.
 * 
 * Usage: npx tsx scripts/import-vault.ts
 * 
 * This script:
 * 1. Reads vault-dump.json
 * 2. Creates TSX files in components/registry/{source}/
 * 3. Updates registry metadata in lib/components-registry/{source}/index.ts
 * 4. Updates lazy import map in lib/component-loader.ts
 */

import fs from 'fs'
import path from 'path'

interface VaultComponent {
  id: string
  name: string
  source: string
  category: string
  code: string
  dependencies: string[]
  description: string
  tags: string[]
}

interface VaultDump {
  extractedAt: string
  totalComponents: number
  bySource: Record<string, number>
  components: VaultComponent[]
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

function toPascalCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (c) => c.toUpperCase())
}

function detectUIImports(code: string): string[] {
  const matches = code.matchAll(/from\s+['"]@\/components\/ui\/([^'"]+)['"]/g)
  return [...matches].map(m => m[1])
}

function detectNpmDeps(code: string): string[] {
  const matches = code.matchAll(/(?:import|from)\s+['"]([^@./][^'"]*)['"]/g)
  const deps = new Set<string>()
  for (const match of matches) {
    let pkg = match[1]
    if (pkg.startsWith('@')) {
      const parts = pkg.split('/')
      pkg = parts.slice(0, 2).join('/')
    } else {
      pkg = pkg.split('/')[0]
    }
    if (!['react', 'react-dom', 'next'].includes(pkg)) {
      deps.add(pkg)
    }
  }
  return [...deps]
}

async function main() {
  console.log('=== Vault Import Script ===\n')

  const dumpPath = path.join(process.cwd(), 'vault-dump.json')
  if (!fs.existsSync(dumpPath)) {
    console.error('vault-dump.json not found. Run extract-vault.ts first.')
    process.exit(1)
  }

  const dump: VaultDump = JSON.parse(fs.readFileSync(dumpPath, 'utf-8'))
  console.log(`Loading ${dump.totalComponents} components from dump...\n`)

  let created = 0
  let skipped = 0

  for (const comp of dump.components) {
    const fileName = toKebabCase(comp.name)
    const componentDir = path.join(process.cwd(), 'components', 'registry', comp.source)
    const filePath = path.join(componentDir, `${fileName}.tsx`)

    // Skip if already exists
    if (fs.existsSync(filePath)) {
      skipped++
      continue
    }

    // Ensure directory exists
    fs.mkdirSync(componentDir, { recursive: true })

    // Detect imports and dependencies
    const uiImports = detectUIImports(comp.code)
    const npmDeps = detectNpmDeps(comp.code)

    // Write component file
    fs.writeFileSync(filePath, comp.code)

    // Log warnings for missing UI imports
    for (const uiImport of uiImports) {
      const uiFile = path.join(process.cwd(), 'components', 'ui', `${uiImport}.tsx`)
      if (!fs.existsSync(uiFile)) {
        console.warn(`  WARNING: ${comp.id} imports ui/${uiImport} which doesn't exist`)
      }
    }

    console.log(`  Created: ${comp.source}/${fileName}.tsx (deps: ${npmDeps.join(', ') || 'none'})`)
    created++
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`)
  console.log('\nNext steps:')
  console.log('1. Update lib/components-registry/{source}/index.ts with new entries')
  console.log('2. Update lib/component-loader.ts with new lazy imports')
  console.log('3. Run the app to verify: npm run dev')
}

main().catch(console.error)
