#!/usr/bin/env node
/**
 * generate-component-sources.mjs
 * 
 * Build-time script that reads all component source files and generates
 * a TypeScript map for the export engine. This allows ExportEngine to
 * include real component code (not JSX preview snippets) in the ZIP.
 * 
 * Usage: node scripts/generate-component-sources.mjs
 * Add to package.json: "prebuild": "node scripts/generate-component-sources.mjs"
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const REGISTRY_DIR = path.join(ROOT, 'components', 'registry')
const UI_DIR = path.join(ROOT, 'components', 'ui')
const SHARED_DIR = path.join(ROOT, 'components', 'registry', '_shared')
const OUTPUT_FILE = path.join(ROOT, 'lib', 'export', 'component-sources.ts')

/**
 * Recursively read all .tsx files from a directory
 */
function readTsxFiles(dir, prefix = '') {
  const entries = {}
  
  if (!fs.existsSync(dir)) return entries

  const items = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    const relativePath = prefix ? `${prefix}/${item.name}` : item.name

    if (item.isDirectory()) {
      Object.assign(entries, readTsxFiles(fullPath, relativePath))
    } else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf-8')
      entries[relativePath] = content
    }
  }

  return entries
}

/**
 * Build a mapping from registry component ID → source file path
 * by parsing the registry index files
 */
function buildRegistryIdMap() {
  const sources = ['shadcn', 'aceternity', 'osmo', 'skiper', 'gsap', 'builtin']
  const idToFile = {}

  for (const source of sources) {
    const registryIndex = path.join(ROOT, 'lib', 'components-registry', source, 'index.ts')
    if (!fs.existsSync(registryIndex)) continue

    const content = fs.readFileSync(registryIndex, 'utf-8')
    
    // Extract id and modulePath pairs
    const idRegex = /id:\s*['"]([^'"]+)['"]/g
    const moduleRegex = /modulePath:\s*['"]([^'"]+)['"]/g
    
    const ids = []
    const modules = []
    let match

    while ((match = idRegex.exec(content)) !== null) {
      ids.push(match[1])
    }
    while ((match = moduleRegex.exec(content)) !== null) {
      modules.push(match[1])
    }

    // Match ids to modulePaths (they appear in order)
    for (let i = 0; i < ids.length && i < modules.length; i++) {
      idToFile[ids[i]] = { source, modulePath: modules[i] }
    }
  }

  return idToFile
}

/**
 * Find the actual file for a registry component
 */
function findComponentFile(source, modulePath) {
  const registryDir = path.join(REGISTRY_DIR, source)
  if (!fs.existsSync(registryDir)) return null

  // Try exact match first
  const candidates = [
    `${modulePath}.tsx`,
    `${modulePath.replace(`${source}-`, '')}.tsx`,
    `${modulePath.replace(/^[^-]+-/, '')}.tsx`,
  ]

  for (const candidate of candidates) {
    const fullPath = path.join(registryDir, candidate)
    if (fs.existsSync(fullPath)) {
      return { relativePath: `${source}/${candidate}`, fullPath }
    }
  }

  // Fallback: search by partial match
  const files = fs.readdirSync(registryDir).filter(f => f.endsWith('.tsx'))
  const slug = modulePath.replace(`${source}-`, '').toLowerCase()
  
  for (const file of files) {
    const fileSlug = file.replace('.tsx', '').toLowerCase()
    if (fileSlug === slug || fileSlug.includes(slug) || slug.includes(fileSlug)) {
      return { 
        relativePath: `${source}/${file}`, 
        fullPath: path.join(registryDir, file) 
      }
    }
  }

  return null
}

function main() {
  console.log('📦 Generating component source map...')

  // 1. Read all UI primitive files
  const uiFiles = readTsxFiles(UI_DIR)
  console.log(`  ✓ ${Object.keys(uiFiles).length} UI primitives`)

  // 2. Read all registry component files
  const registryFiles = readTsxFiles(REGISTRY_DIR)
  console.log(`  ✓ ${Object.keys(registryFiles).length} registry components`)

  // 2b. Read all _shared helper files
  const sharedFiles = readTsxFiles(SHARED_DIR)
  console.log(`  ✓ ${Object.keys(sharedFiles).length} shared helpers`)

  // 3. Build registry ID → file mapping
  const idMap = buildRegistryIdMap()
  const registryIdSources = {}
  let matched = 0
  let unmatched = 0

  for (const [id, info] of Object.entries(idMap)) {
    const found = findComponentFile(info.source, info.modulePath)
    if (found) {
      const content = fs.readFileSync(found.fullPath, 'utf-8')
      registryIdSources[id] = content
      matched++
    } else {
      console.warn(`  ⚠ No source file found for ${id} (modulePath: ${info.modulePath})`)
      unmatched++
    }
  }

  console.log(`  ✓ ${matched} registry IDs matched to source files`)
  if (unmatched > 0) {
    console.log(`  ⚠ ${unmatched} registry IDs without source files`)
  }

  // 4. Generate TypeScript output
  const output = `// AUTO-GENERATED by scripts/generate-component-sources.mjs
// Do not edit manually. Run: node scripts/generate-component-sources.mjs
// Generated at: ${new Date().toISOString()}

/**
 * Map of registry component ID → full source code
 * Used by ExportEngine to include real component code in exports
 */
export const REGISTRY_SOURCES: Record<string, string> = ${JSON.stringify(registryIdSources, null, 2)}

/**
 * Map of UI primitive path → full source code
 * e.g. "button.tsx" → source code of components/ui/button.tsx
 */
export const UI_SOURCES: Record<string, string> = ${JSON.stringify(uiFiles, null, 2)}

/**
 * Map of shared helper path → full source code
 * e.g. "section-wrapper.tsx" → source code of components/registry/_shared/section-wrapper.tsx
 */
export const SHARED_SOURCES: Record<string, string> = ${JSON.stringify(sharedFiles, null, 2)}

/**
 * Get source code for a registry component by ID
 */
export function getRegistrySource(registryId: string): string | undefined {
  return REGISTRY_SOURCES[registryId]
}

/**
 * Get source code for a UI primitive by filename
 */
export function getUiSource(filename: string): string | undefined {
  return UI_SOURCES[filename]
}

/**
 * Get source code for a shared helper by filename
 */
export function getSharedSource(filename: string): string | undefined {
  return SHARED_SOURCES[filename]
}

/**
 * Get all UI primitive filenames
 */
export function getAllUiFilenames(): string[] {
  return Object.keys(UI_SOURCES)
}

/**
 * Get all shared helper filenames
 */
export function getAllSharedFilenames(): string[] {
  return Object.keys(SHARED_SOURCES)
}
`

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8')
  
  const sizeKB = Math.round(fs.statSync(OUTPUT_FILE).size / 1024)
  console.log(`\n✅ Generated ${OUTPUT_FILE} (${sizeKB} KB)`)
  console.log(`   ${Object.keys(registryIdSources).length} registry sources + ${Object.keys(uiFiles).length} UI primitives + ${Object.keys(sharedFiles).length} shared helpers`)
}

main()
