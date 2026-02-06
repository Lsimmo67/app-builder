#!/usr/bin/env tsx
/**
 * Vault Extraction Script
 * Extracts components from the Builder MCP and saves to a JSON dump.
 * 
 * Usage: npx tsx scripts/extract-vault.ts
 * 
 * This script:
 * 1. Queries the Builder MCP by source x category
 * 2. Retrieves component TSX code
 * 3. Saves to vault-dump.json for import processing
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

// Sources and categories to extract
const SOURCES = ['aceternity', 'shadcn', 'osmo', 'skiper', 'gsap'] as const
const CATEGORIES = [
  'hero', 'features', 'pricing', 'testimonials', 'cta', 'faq',
  'footer', 'header', 'navigation', 'card', 'form', 'layout',
  'grid', 'animation', 'effect', 'text', 'media', 'button',
  'input', 'modal', 'section', 'background', 'overlay',
] as const

async function extractFromMCP(source: string, category: string): Promise<VaultComponent[]> {
  // This would integrate with the Builder MCP
  // For now, return empty array as placeholder
  console.log(`  Querying MCP: ${source} / ${category}`)
  return []
}

async function inventoryExisting(): Promise<Set<string>> {
  const registryDir = path.join(process.cwd(), 'components', 'registry')
  const existingIds = new Set<string>()

  const sources = fs.readdirSync(registryDir).filter(f => {
    const stat = fs.statSync(path.join(registryDir, f))
    return stat.isDirectory() && f !== '_shared'
  })

  for (const source of sources) {
    const sourceDir = path.join(registryDir, source)
    const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.tsx'))
    for (const file of files) {
      const name = file.replace('.tsx', '')
      existingIds.add(`${source}-${name}`)
    }
  }

  return existingIds
}

async function main() {
  console.log('=== Vault Extraction Script ===\n')

  // Step 1: Inventory existing components
  console.log('Step 1: Inventorying existing components...')
  const existing = await inventoryExisting()
  console.log(`  Found ${existing.size} existing components\n`)

  // Step 2: Extract from MCP
  console.log('Step 2: Extracting from Builder MCP...')
  const allComponents: VaultComponent[] = []

  for (const source of SOURCES) {
    for (const category of CATEGORIES) {
      const components = await extractFromMCP(source, category)
      const newComponents = components.filter(c => !existing.has(c.id))
      allComponents.push(...newComponents)
    }
  }

  console.log(`\n  Extracted ${allComponents.length} new components\n`)

  // Step 3: Calculate delta
  const bySource: Record<string, number> = {}
  for (const comp of allComponents) {
    bySource[comp.source] = (bySource[comp.source] || 0) + 1
  }

  console.log('Step 3: Delta by source:')
  for (const [source, count] of Object.entries(bySource)) {
    console.log(`  ${source}: +${count} new`)
  }

  // Step 4: Save dump
  const dump: VaultDump = {
    extractedAt: new Date().toISOString(),
    totalComponents: allComponents.length,
    bySource,
    components: allComponents,
  }

  const outputPath = path.join(process.cwd(), 'vault-dump.json')
  fs.writeFileSync(outputPath, JSON.stringify(dump, null, 2))
  console.log(`\nSaved to ${outputPath}`)
  console.log(`\nNext step: Run 'npx tsx scripts/import-vault.ts' to import into registry`)
}

main().catch(console.error)
