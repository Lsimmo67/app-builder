import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const uiDir = path.join(process.cwd(), 'components', 'ui')
    const sharedDir = path.join(process.cwd(), 'components', 'registry', '_shared')

    const uiSources: Record<string, string> = {}
    const sharedSources: Record<string, string> = {}

    // Read UI primitive components
    const uiFiles = await fs.readdir(uiDir)
    for (const file of uiFiles) {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = await fs.readFile(path.join(uiDir, file), 'utf-8')
        // Rewrite internal import paths for export compatibility
        const rewritten = content.replace(
          /from ['"]@\/lib\/utils\/cn['"]/g,
          "from '@/lib/utils'"
        )
        uiSources[file] = rewritten
      }
    }

    // Read shared registry components
    const sharedFiles = await fs.readdir(sharedDir)
    for (const file of sharedFiles) {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = await fs.readFile(path.join(sharedDir, file), 'utf-8')
        const rewritten = content.replace(
          /from ['"]@\/lib\/utils\/cn['"]/g,
          "from '@/lib/utils'"
        )
        sharedSources[file] = rewritten
      }
    }

    // Read registry component source files (real TSX code)
    const registryDir = path.join(process.cwd(), 'components', 'registry')
    const registrySources: Record<string, string> = {}
    const sources = await fs.readdir(registryDir)

    for (const source of sources) {
      if (source === '_shared') continue
      const sourceDir = path.join(registryDir, source)
      const stat = await fs.stat(sourceDir)
      if (!stat.isDirectory()) continue

      const files = await fs.readdir(sourceDir)
      for (const file of files) {
        if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          const content = await fs.readFile(path.join(sourceDir, file), 'utf-8')
          const rewritten = content.replace(
            /from ['"]@\/lib\/utils\/cn['"]/g,
            "from '@/lib/utils'"
          )
          registrySources[`${source}/${file}`] = rewritten
        }
      }
    }

    return NextResponse.json({
      ui: uiSources,
      shared: sharedSources,
      registry: registrySources,
    })
  } catch (error) {
    console.error('Failed to read export sources:', error)
    return NextResponse.json({ error: 'Failed to read sources' }, { status: 500 })
  }
}
