import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { Project, Page, DesignSystem, ComponentInstance, CMSCollection, CMSItem } from '@/types'
import { componentRegistry } from '@/lib/components-registry'
import { stylesToCSSString } from '@/lib/styles/styles-to-css'
import { db } from '@/lib/db'
import { getVersionForDep } from './dependency-versions'

// Map builtin registry IDs to their HTML element tags
const BUILTIN_TAG_MAP: Record<string, string> = {
  'builtin-section': 'section',
  'builtin-container': 'div',
  'builtin-div-block': 'div',
  'builtin-flex-box': 'div',
  'builtin-grid-layout': 'div',
  'builtin-columns': 'div',
  'builtin-heading': 'h2',
  'builtin-paragraph': 'p',
  'builtin-text-block': 'span',
  'builtin-link-element': 'a',
  'builtin-rich-text': 'div',
  'builtin-list-element': 'ul',
  'builtin-image': 'img',
  'builtin-video': 'video',
  'builtin-form-block': 'form',
  'builtin-input-field': 'input',
  'builtin-text-area': 'textarea',
  'builtin-select-field': 'select',
  'builtin-button-element': 'button',
  'builtin-link-block': 'a',
}

export interface ExportOptions {
  includeReadme: boolean
  includeTypeScript: boolean
  includeTailwind: boolean
  includeEnvExample: boolean
  packageManager: 'npm' | 'yarn' | 'pnpm' | 'bun'
}

const DEFAULT_OPTIONS: ExportOptions = {
  includeReadme: true,
  includeTypeScript: true,
  includeTailwind: true,
  includeEnvExample: true,
  packageManager: 'npm',
}

export class ExportEngine {
  private project: Project
  private designSystem: DesignSystem
  private pages: Page[]
  private componentsByPage: Map<string, ComponentInstance[]>
  private cmsCollections: CMSCollection[]
  private cmsItems: CMSItem[]
  private options: ExportOptions

  constructor(
    project: Project,
    designSystem: DesignSystem,
    pages: Page[],
    componentsByPage: Map<string, ComponentInstance[]>,
    options: Partial<ExportOptions> = {},
    cmsCollections: CMSCollection[] = [],
    cmsItems: CMSItem[] = [],
  ) {
    this.project = project
    this.designSystem = designSystem
    this.pages = pages
    this.componentsByPage = componentsByPage
    this.cmsCollections = cmsCollections
    this.cmsItems = cmsItems
    this.options = { ...DEFAULT_OPTIONS, ...options }
  }

  /**
   * Generate and download the project as a ZIP file
   */
  async exportToZip(): Promise<void> {
    const zip = new JSZip()

    // Generate all files
    await this.generatePackageJson(zip)
    await this.generateNextConfig(zip)
    await this.generateTsConfig(zip)
    await this.generateTailwindConfig(zip)
    await this.generateGlobalsCss(zip)
    await this.generateLayoutFile(zip)
    await this.generatePages(zip)
    await this.generateComponents(zip)
    await this.generateLibFiles(zip)
    await this.generateCMSFiles(zip)

    if (this.options.includeReadme) {
      await this.generateReadme(zip)
    }
    
    if (this.options.includeEnvExample) {
      await this.generateEnvExample(zip)
    }

    // Generate gitignore
    zip.file('.gitignore', this.getGitignore())

    // Download ZIP
    const blob = await zip.generateAsync({ type: 'blob' })
    const filename = `${this.project.name.toLowerCase().replace(/\s+/g, '-')}-export.zip`
    saveAs(blob, filename)
  }

  /**
   * Get the generated code as an object (for preview)
   */
  async getGeneratedCode(): Promise<Record<string, string>> {
    const files: Record<string, string> = {}

    // Generate all files
    files['package.json'] = this.getPackageJsonContent()
    files['next.config.js'] = this.getNextConfigContent()
    files['tsconfig.json'] = this.getTsConfigContent()
    files['postcss.config.mjs'] = this.getPostCssConfigContent()
    files['app/globals.css'] = this.getGlobalsCssContent()
    files['app/layout.tsx'] = this.getLayoutContent()

    // Generate pages
    for (const page of this.pages) {
      const components = this.componentsByPage.get(page.id) || []
      const pagePath = page.slug === 'home' ? 'app/page.tsx' : `app/${page.slug}/page.tsx`
      files[pagePath] = this.generatePageContent(page, components)
    }

    return files
  }

  // =====================================
  // File Generators
  // =====================================

  private async generatePackageJson(zip: JSZip): Promise<void> {
    zip.file('package.json', this.getPackageJsonContent())
  }

  private getPackageJsonContent(): string {
    const allComponents = this.getAllUsedComponents()
    const dependencies = this.collectDependencies(allComponents)

    const packageJson = {
      name: this.project.name.toLowerCase().replace(/\s+/g, '-'),
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
      },
      dependencies: {
        next: getVersionForDep('next'),
        react: getVersionForDep('react'),
        'react-dom': getVersionForDep('react-dom'),
        ...dependencies,
      },
      devDependencies: {
        '@types/node': getVersionForDep('@types/node'),
        '@types/react': getVersionForDep('@types/react'),
        '@types/react-dom': getVersionForDep('@types/react-dom'),
        typescript: getVersionForDep('typescript'),
        tailwindcss: getVersionForDep('tailwindcss'),
        '@tailwindcss/postcss': getVersionForDep('@tailwindcss/postcss'),
        postcss: getVersionForDep('postcss'),
        eslint: getVersionForDep('eslint'),
        'eslint-config-next': getVersionForDep('eslint-config-next'),
      },
    }

    return JSON.stringify(packageJson, null, 2)
  }

  private async generateNextConfig(zip: JSZip): Promise<void> {
    zip.file('next.config.js', this.getNextConfigContent())
  }

  private getNextConfigContent(): string {
    return `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
}

export default nextConfig
`
  }

  private async generateTsConfig(zip: JSZip): Promise<void> {
    zip.file('tsconfig.json', this.getTsConfigContent())
  }

  private getTsConfigContent(): string {
    const tsConfig = {
      compilerOptions: {
        target: 'es5',
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: 'esnext',
        moduleResolution: 'bundler',
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: 'preserve',
        incremental: true,
        plugins: [{ name: 'next' }],
        paths: {
          '@/*': ['./*'],
        },
      },
      include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
      exclude: ['node_modules'],
    }

    return JSON.stringify(tsConfig, null, 2)
  }

  private async generateTailwindConfig(zip: JSZip): Promise<void> {
    // Tailwind v4 uses CSS-based config, no tailwind.config.js needed
    zip.file('postcss.config.mjs', this.getPostCssConfigContent())
  }

  private getPostCssConfigContent(): string {
    return `export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
`
  }

  private async generateGlobalsCss(zip: JSZip): Promise<void> {
    const appFolder = zip.folder('app')
    appFolder?.file('globals.css', this.getGlobalsCssContent())
  }

  private getGlobalsCssContent(): string {
    const { colors, typography, borderRadius } = this.designSystem

    return `@import "tailwindcss";

@theme {
  --color-background: ${colors.background};
  --color-foreground: ${colors.foreground};
  --color-primary: ${colors.primary};
  --color-primary-foreground: ${colors.primaryForeground};
  --color-secondary: ${colors.secondary};
  --color-secondary-foreground: ${colors.secondaryForeground};
  --color-muted: ${colors.muted};
  --color-muted-foreground: ${colors.mutedForeground};
  --color-accent: ${colors.accent};
  --color-accent-foreground: ${colors.accentForeground};
  --color-destructive: ${colors.destructive};
  --color-border: ${colors.border};
  --color-ring: ${colors.primary};

  --radius-sm: ${borderRadius.sm};
  --radius-md: ${borderRadius.md};
  --radius-lg: ${borderRadius.lg};
  --radius-xl: ${borderRadius.xl};
}

@layer base {
  * {
    border-color: var(--color-border);
  }

  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: ${typography.fontFamily.body}, system-ui, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${typography.fontFamily.heading}, system-ui, sans-serif;
  }
}
`
  }

  private async generateLayoutFile(zip: JSZip): Promise<void> {
    const appFolder = zip.folder('app')
    appFolder?.file('layout.tsx', this.getLayoutContent())
  }

  private getLayoutContent(): string {
    return `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '${this.project.name}',
  description: '${this.project.description || 'Built with App Builder'}',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`
  }

  private async generatePages(zip: JSZip): Promise<void> {
    const appFolder = zip.folder('app')!

    for (const page of this.pages) {
      const components = this.componentsByPage.get(page.id) || []
      const content = this.generatePageContent(page, components)

      if (page.slug === 'home') {
        appFolder.file('page.tsx', content)
      } else {
        const pageFolder = appFolder.folder(page.slug)
        pageFolder?.file('page.tsx', content)
      }
    }
  }

  private generatePageContent(page: Page, components: ComponentInstance[]): string {
    const imports = this.generateImports(components)
    const componentJsx = this.generateComponentsJsx(components)

    return `${imports}

export default function ${this.toPascalCase(page.name)}Page() {
  return (
    <main className="min-h-screen">
      ${componentJsx || '      {/* Add your components here */}'}
    </main>
  )
}
`
  }

  private async generateComponents(zip: JSZip): Promise<void> {
    const componentsFolder = zip.folder('components')!

    // Get all unique components used
    const usedComponents = this.getAllUsedComponents()
    const uniqueRegistryIds = new Set(usedComponents.map((c) => c.componentRegistryId))

    // Generate each component file in source-based subfolders
    for (const registryId of uniqueRegistryIds) {
      const registryItem = componentRegistry.getById(registryId)
      if (!registryItem) continue

      const componentCode = this.generateComponentCode(registryItem)
      const filename = `${registryItem.name.toLowerCase().replace(/\s+/g, '-')}.tsx`

      const sourceFolder = componentsFolder.folder(registryItem.source)!
      sourceFolder.file(filename, componentCode)
    }
  }

  private generateComponentCode(registryItem: ReturnType<typeof componentRegistry.getById>): string {
    if (!registryItem) return ''

    // Use the component's code from registry, with some cleanup
    let code = registryItem.code

    // Add 'use client' directive if it uses hooks or interactivity
    if (code.includes('useState') || code.includes('useEffect') || code.includes('onClick')) {
      if (!code.startsWith("'use client'") && !code.startsWith('"use client"')) {
        code = `'use client'\n\n${code}`
      }
    }

    return code
  }

  private async generateLibFiles(zip: JSZip): Promise<void> {
    const libFolder = zip.folder('lib')!

    // Utils
    libFolder.file('utils.ts', `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`)
  }

  private async generateCMSFiles(zip: JSZip): Promise<void> {
    if (this.cmsCollections.length === 0) return

    const cmsFolder = zip.folder('lib/cms')!

    // Generate TypeScript types for each collection
    const typeDefs = this.cmsCollections.map((col) => {
      const fields = col.fields.map((f) => {
        let tsType = 'string'
        switch (f.type) {
          case 'number': tsType = 'number'; break
          case 'boolean': tsType = 'boolean'; break
          case 'date': tsType = 'string'; break
          case 'option': tsType = f.validation?.options
            ? f.validation.options.map((o) => `'${o}'`).join(' | ')
            : 'string'; break
          default: tsType = 'string'
        }
        return `  ${f.slug}${f.required ? '' : '?'}: ${tsType}`
      })
      const typeName = this.toPascalCase(col.name)
      return `export interface ${typeName} {\n  id: string\n${fields.join('\n')}\n  _status: 'draft' | 'published'\n}`
    }).join('\n\n')

    cmsFolder.file('types.ts', typeDefs + '\n')

    // Generate static data
    const dataExports = this.cmsCollections.map((col) => {
      const typeName = this.toPascalCase(col.name)
      const varName = col.slug.replace(/-/g, '_')
      const items = this.cmsItems
        .filter((i) => i.collectionId === col.id)
        .map((item) => ({
          id: item.id,
          ...item.data,
          _status: item.status,
        }))
      return `export const ${varName}: ${typeName}[] = ${JSON.stringify(items, null, 2)}`
    }).join('\n\n')

    cmsFolder.file('data.ts', `import type { ${this.cmsCollections.map((c) => this.toPascalCase(c.name)).join(', ')} } from './types'\n\n${dataExports}\n`)

    // Generate helper functions
    const helpers = `// CMS Helpers - Auto-generated
${this.cmsCollections.map((col) => {
  const typeName = this.toPascalCase(col.name)
  const varName = col.slug.replace(/-/g, '_')
  return `import { ${varName} } from './data'
import type { ${typeName} } from './types'

export function get${typeName}s(onlyPublished = true): ${typeName}[] {
  return onlyPublished ? ${varName}.filter(i => i._status === 'published') : ${varName}
}

export function get${typeName}ById(id: string): ${typeName} | undefined {
  return ${varName}.find(i => i.id === id)
}`
}).join('\n\n')}
`
    cmsFolder.file('helpers.ts', helpers)
  }

  private async generateReadme(zip: JSZip): Promise<void> {
    const readme = `# ${this.project.name}

${this.project.description || 'A Next.js project built with App Builder.'}

## Getting Started

1. Install dependencies:

\`\`\`bash
${this.getInstallCommand()}
\`\`\`

2. Run the development server:

\`\`\`bash
${this.getDevCommand()}
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Project Structure

\`\`\`
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── shadcn/      # ShadCN UI components
│   ├── aceternity/  # Aceternity UI components
│   ├── osmo/        # Osmo Supply components
│   ├── skiper/      # Skiper UI components
│   └── gsap/        # GSAP effect components
├── lib/             # Utility functions
└── public/          # Static assets
\`\`\`

## License

MIT
`

    zip.file('README.md', readme)
  }

  private async generateEnvExample(zip: JSZip): Promise<void> {
    zip.file('.env.example', `# Environment Variables
# Copy this file to .env.local and fill in the values

# Example:
# DATABASE_URL=your_database_url
# API_KEY=your_api_key
`)
  }

  // =====================================
  // Helper Methods
  // =====================================

  private getAllUsedComponents(): ComponentInstance[] {
    const allComponents: ComponentInstance[] = []
    for (const components of this.componentsByPage.values()) {
      allComponents.push(...components)
    }
    return allComponents
  }

  private collectDependencies(components: ComponentInstance[]): Record<string, string> {
    const deps: Record<string, string> = {
      clsx: '^2.1.0',
      'tailwind-merge': '^3.0.0',
      'class-variance-authority': '^0.7.0',
      'lucide-react': '^0.400.0',
    }

    // Version map for known packages
    const KNOWN_VERSIONS: Record<string, string> = {
      'framer-motion': '^12.0.0',
      'gsap': '^3.12.0',
      '@gsap/react': '^2.1.0',
      'clsx': '^2.1.0',
      'tailwind-merge': '^3.0.0',
      'lucide-react': '^0.400.0',
      'three': '^0.160.0',
      '@react-three/fiber': '^8.15.0',
      '@react-three/drei': '^9.90.0',
      '@radix-ui/react-accordion': '^1.2.0',
      'tsparticles': '^3.0.0',
      '@tsparticles/react': '^3.0.0',
      '@tsparticles/slim': '^3.0.0',
      'react-colorful': '^5.6.0',
    }

    const uniqueIds = new Set(components.map((c) => c.componentRegistryId))

    for (const id of uniqueIds) {
      const registryItem = componentRegistry.getById(id)
      if (!registryItem) continue

      // Prefer dependencyManifest (version-locked) over dependencies (string[])
      if (registryItem.dependencyManifest?.length) {
        for (const dep of registryItem.dependencyManifest) {
          deps[dep.package] = dep.version
        }
      } else {
        for (const dep of registryItem.dependencies) {
          if (!deps[dep]) {
            deps[dep] = KNOWN_VERSIONS[dep] || 'latest'
          }
        }
      }
    }

    // Add framer-motion if any Aceternity or animation components
    if (uniqueIds.size > 0) {
      const hasAnimations = [...uniqueIds].some((id) => {
        const item = componentRegistry.getById(id)
        return item?.source === 'aceternity' || item?.source === 'gsap'
      })
      if (hasAnimations) {
        deps['framer-motion'] = KNOWN_VERSIONS['framer-motion']
      }
      const hasGsap = [...uniqueIds].some((id) => {
        const item = componentRegistry.getById(id)
        return item?.source === 'gsap'
      })
      if (hasGsap) {
        deps['gsap'] = KNOWN_VERSIONS['gsap']
        deps['@gsap/react'] = KNOWN_VERSIONS['@gsap/react']
      }
    }

    return deps
  }

  private generateImports(components: ComponentInstance[]): string {
    // Only import non-builtin components (builtins emit raw HTML)
    const uniqueIds = new Set(
      components
        .filter((c) => c.source !== 'builtin')
        .map((c) => c.componentRegistryId)
    )
    const imports: string[] = []

    for (const id of uniqueIds) {
      const registryItem = componentRegistry.getById(id)
      if (!registryItem) continue

      const componentName = this.toPascalCase(registryItem.name)
      imports.push(`import ${componentName} from '@/components/${registryItem.source}/${registryItem.name.toLowerCase().replace(/\s+/g, '-')}'`)
    }

    return imports.join('\n')
  }

  /**
   * Recursively generate JSX for nested component tree
   */
  private generateComponentsJsx(components: ComponentInstance[], indent = 6): string {
    if (components.length === 0) return ''

    // Build tree: only root-level components (no parentId) at top
    const rootComponents = components
      .filter((c) => !c.parentId)
      .sort((a, b) => a.order - b.order)

    return rootComponents
      .map((comp) => this.renderComponentNode(comp, components, indent))
      .join('\n')
  }

  private renderComponentNode(
    comp: ComponentInstance,
    allComponents: ComponentInstance[],
    indent: number,
  ): string {
    const pad = ' '.repeat(indent)
    const registryItem = componentRegistry.getById(comp.componentRegistryId)
    if (!registryItem) return `${pad}{/* Unknown: ${comp.componentRegistryId} */}`

    // Build inline style string from structured styles
    const styleStr = this.buildStyleAttribute(comp)

    // Get children (nested components)
    const children = allComponents
      .filter((c) => c.parentId === comp.id)
      .sort((a, b) => a.order - b.order)

    // Builtin elements → emit semantic HTML
    const builtinTag = BUILTIN_TAG_MAP[comp.componentRegistryId]
    if (builtinTag) {
      return this.renderBuiltinElement(comp, builtinTag, children, allComponents, indent, styleStr)
    }

    // Library components → emit <ComponentName />
    const componentName = this.toPascalCase(registryItem.name)
    const propsString = this.generatePropsString(comp.props)

    if (children.length > 0) {
      const childrenJsx = children
        .map((child) => this.renderComponentNode(child, allComponents, indent + 2))
        .join('\n')
      return `${pad}<${componentName}${propsString}${styleStr}>\n${childrenJsx}\n${pad}</${componentName}>`
    }

    return `${pad}<${componentName}${propsString}${styleStr} />`
  }

  private renderBuiltinElement(
    comp: ComponentInstance,
    tag: string,
    children: ComponentInstance[],
    allComponents: ComponentInstance[],
    indent: number,
    styleStr: string,
  ): string {
    const pad = ' '.repeat(indent)

    // Special self-closing tags
    if (tag === 'img') {
      const src = comp.props.src as string || '/placeholder.jpg'
      const alt = comp.props.alt as string || ''
      return `${pad}<img src="${src}" alt="${alt}"${styleStr} />`
    }
    if (tag === 'input') {
      const type = comp.props.type as string || 'text'
      const placeholder = comp.props.placeholder as string || ''
      const name = comp.props.name as string || ''
      return `${pad}<input type="${type}" name="${name}" placeholder="${placeholder}"${styleStr} />`
    }

    // Text content from props
    const textContent = (comp.props.text || comp.props.content || comp.props.label || comp.props.children || '') as string

    // Tags with children
    if (children.length > 0) {
      const childrenJsx = children
        .map((child) => this.renderComponentNode(child, allComponents, indent + 2))
        .join('\n')
      return `${pad}<${tag}${styleStr}>\n${childrenJsx}\n${pad}</${tag}>`
    }

    if (textContent) {
      return `${pad}<${tag}${styleStr}>${textContent}</${tag}>`
    }

    return `${pad}<${tag}${styleStr} />`
  }

  private buildStyleAttribute(comp: ComponentInstance): string {
    const cssString = stylesToCSSString(comp.styles)
    if (!cssString) return ''
    // Convert CSS string to React style object entries
    const entries = cssString.split(';').filter(Boolean).map((rule) => {
      const [prop, val] = rule.split(':').map((s) => s.trim())
      const camelProp = prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
      return `${camelProp}: '${val}'`
    })
    return ` style={{ ${entries.join(', ')} }}`
  }

  private generatePropsString(props: Record<string, unknown>): string {
    const entries = Object.entries(props).filter(([, value]) => value !== undefined && value !== null)
    
    if (entries.length === 0) return ''

    const propsArray = entries.map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${value}"`
      } else if (typeof value === 'boolean') {
        return value ? key : `${key}={false}`
      } else {
        return `${key}={${JSON.stringify(value)}}`
      }
    })

    return ' ' + propsArray.join(' ')
  }

  private toPascalCase(str: string): string {
    return str
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^(.)/, (c) => c.toUpperCase())
  }

  private getInstallCommand(): string {
    const commands: Record<string, string> = {
      npm: 'npm install',
      yarn: 'yarn',
      pnpm: 'pnpm install',
      bun: 'bun install',
    }
    return commands[this.options.packageManager]
  }

  private getDevCommand(): string {
    const commands: Record<string, string> = {
      npm: 'npm run dev',
      yarn: 'yarn dev',
      pnpm: 'pnpm dev',
      bun: 'bun dev',
    }
    return commands[this.options.packageManager]
  }

  private getGitignore(): string {
    return `# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Next.js
.next/
out/

# Production
build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
`
  }
}

// =====================================
// Export Helper Function
// =====================================

export async function exportProject(
  projectId: string,
  options?: Partial<ExportOptions>
): Promise<void> {
  // Load project data
  const project = await db.projects.get(projectId)
  if (!project) throw new Error('Project not found')

  const designSystem = await db.designSystems
    .where('projectId')
    .equals(projectId)
    .first()
  if (!designSystem) throw new Error('Design system not found')

  const pages = await db.pages
    .where('projectId')
    .equals(projectId)
    .sortBy('order')

  // Load components for each page
  const componentsByPage = new Map<string, ComponentInstance[]>()
  for (const page of pages) {
    const components = await db.componentInstances
      .where('pageId')
      .equals(page.id)
      .sortBy('order')
    componentsByPage.set(page.id, components)
  }

  // Load CMS data
  const cmsCollections = await db.cmsCollections
    .where('projectId')
    .equals(projectId)
    .toArray()

  const cmsItems: CMSItem[] = []
  for (const collection of cmsCollections) {
    const items = await db.cmsItems
      .where('collectionId')
      .equals(collection.id)
      .toArray()
    cmsItems.push(...items)
  }

  // Create exporter and generate ZIP
  const exporter = new ExportEngine(
    project,
    designSystem,
    pages,
    componentsByPage,
    options,
    cmsCollections,
    cmsItems,
  )
  await exporter.exportToZip()
}
