import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { Project, Page, DesignSystem, ComponentInstance } from '@/types'
import { componentRegistry } from '@/lib/components-registry'
import { db } from '@/lib/db'

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
  private options: ExportOptions

  constructor(
    project: Project,
    designSystem: DesignSystem,
    pages: Page[],
    componentsByPage: Map<string, ComponentInstance[]>,
    options: Partial<ExportOptions> = {}
  ) {
    this.project = project
    this.designSystem = designSystem
    this.pages = pages
    this.componentsByPage = componentsByPage
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
    files['tailwind.config.js'] = this.getTailwindConfigContent()
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
        next: '^14.2.0',
        react: '^18.3.0',
        'react-dom': '^18.3.0',
        ...dependencies,
      },
      devDependencies: {
        '@types/node': '^20.0.0',
        '@types/react': '^18.3.0',
        '@types/react-dom': '^18.3.0',
        typescript: '^5.0.0',
        tailwindcss: '^3.4.0',
        postcss: '^8.4.0',
        autoprefixer: '^10.4.0',
        eslint: '^8.0.0',
        'eslint-config-next': '^14.2.0',
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
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig
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
    zip.file('tailwind.config.js', this.getTailwindConfigContent())
    zip.file('postcss.config.js', this.getPostCssConfigContent())
  }

  private getTailwindConfigContent(): string {
    const { colors, borderRadius } = this.designSystem

    return `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '${colors.background}',
        foreground: '${colors.foreground}',
        primary: {
          DEFAULT: '${colors.primary}',
          foreground: '${colors.primaryForeground}',
        },
        secondary: {
          DEFAULT: '${colors.secondary}',
          foreground: '${colors.secondaryForeground}',
        },
        muted: {
          DEFAULT: '${colors.muted}',
          foreground: '${colors.mutedForeground}',
        },
        accent: {
          DEFAULT: '${colors.accent}',
          foreground: '${colors.accentForeground}',
        },
        destructive: {
          DEFAULT: '${colors.destructive}',
          foreground: '#ffffff',
        },
        border: '${colors.border}',
        ring: '${colors.primary}',
      },
      borderRadius: {
        none: '${borderRadius.none}',
        sm: '${borderRadius.sm}',
        DEFAULT: '${borderRadius.md}',
        md: '${borderRadius.md}',
        lg: '${borderRadius.lg}',
        xl: '${borderRadius.xl}',
        full: '${borderRadius.full}',
      },
    },
  },
  plugins: [],
}
`
  }

  private getPostCssConfigContent(): string {
    return `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`
  }

  private async generateGlobalsCss(zip: JSZip): Promise<void> {
    const appFolder = zip.folder('app')
    appFolder?.file('globals.css', this.getGlobalsCssContent())
  }

  private getGlobalsCssContent(): string {
    const { colors, typography } = this.designSystem

    return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: ${colors.background};
    --foreground: ${colors.foreground};
    --primary: ${colors.primary};
    --primary-foreground: ${colors.primaryForeground};
    --secondary: ${colors.secondary};
    --secondary-foreground: ${colors.secondaryForeground};
    --muted: ${colors.muted};
    --muted-foreground: ${colors.mutedForeground};
    --accent: ${colors.accent};
    --accent-foreground: ${colors.accentForeground};
    --destructive: ${colors.destructive};
    --border: ${colors.border};
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
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
    const uiFolder = componentsFolder.folder('ui')!

    // Get all unique components used
    const usedComponents = this.getAllUsedComponents()
    const uniqueRegistryIds = new Set(usedComponents.map((c) => c.componentRegistryId))

    // Generate each component file
    for (const registryId of uniqueRegistryIds) {
      const registryItem = componentRegistry.getById(registryId)
      if (!registryItem) continue

      const componentCode = this.generateComponentCode(registryItem)
      const filename = `${registryItem.name.toLowerCase().replace(/\s+/g, '-')}.tsx`
      
      uiFolder.file(filename, componentCode)
    }

    // Generate index file
    const indexContent = this.generateComponentsIndex(uniqueRegistryIds)
    uiFolder.file('index.ts', indexContent)
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

  private generateComponentsIndex(registryIds: Set<string>): string {
    const exports: string[] = []

    for (const id of registryIds) {
      const registryItem = componentRegistry.getById(id)
      if (!registryItem) continue

      const filename = registryItem.name.toLowerCase().replace(/\s+/g, '-')
      exports.push(`export * from './${filename}'`)
    }

    return exports.join('\n')
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

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Project Structure

\`\`\`
├── app/              # Next.js App Router pages
├── components/       # React components
│   └── ui/          # UI components
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
    const uniqueIds = new Set(components.map((c) => c.componentRegistryId))
    const imports: string[] = []

    for (const id of uniqueIds) {
      const registryItem = componentRegistry.getById(id)
      if (!registryItem) continue

      const componentName = this.toPascalCase(registryItem.name)
      imports.push(`import { ${componentName} } from '@/components/ui/${registryItem.name.toLowerCase().replace(/\s+/g, '-')}'`)
    }

    return imports.join('\n')
  }

  private generateComponentsJsx(components: ComponentInstance[]): string {
    if (components.length === 0) return ''

    return components
      .sort((a, b) => a.order - b.order)
      .map((comp) => {
        const registryItem = componentRegistry.getById(comp.componentRegistryId)
        if (!registryItem) return `      {/* Unknown component: ${comp.componentRegistryId} */}`

        const componentName = this.toPascalCase(registryItem.name)
        const propsString = this.generatePropsString(comp.props)

        return `      <${componentName}${propsString} />`
      })
      .join('\n')
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

  // Create exporter and generate ZIP
  const exporter = new ExportEngine(project, designSystem, pages, componentsByPage, options)
  await exporter.exportToZip()
}
