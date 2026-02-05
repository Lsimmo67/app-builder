import JSZip from 'jszip'
import { componentRegistry } from '@/lib/components-registry'
import type { Project, DesignSystem, ComponentInstance } from '@/types'
import { getVersionForDep } from './dependency-versions'

export interface ExportOptions {
  includeReadme?: boolean
  includePackageJson?: boolean
  includeTailwindConfig?: boolean
  includeGlobalsCss?: boolean
  format?: 'zip' | 'copy'
}

export interface ExportFile {
  path: string
  content: string
}

export interface ExportResult {
  files: ExportFile[]
  dependencies: string[]
  devDependencies: string[]
  zipBlob?: Blob
}

export class ExportGenerator {
  private project: Project
  private designSystem: DesignSystem
  private components: ComponentInstance[]

  constructor(
    project: Project,
    designSystem: DesignSystem,
    components: ComponentInstance[]
  ) {
    this.project = project
    this.designSystem = designSystem
    this.components = components
  }

  async generate(options: ExportOptions = {}): Promise<ExportResult> {
    const {
      includeReadme = true,
      includePackageJson = true,
      includeTailwindConfig = true,
      includeGlobalsCss = true,
    } = options

    const files: ExportFile[] = []
    const allDeps = new Set<string>()
    const devDeps = new Set<string>(['typescript', '@types/react', '@types/node', 'tailwindcss', 'postcss', 'autoprefixer'])

    // Collect dependencies from used components
    this.components.forEach((instance) => {
      const registryComp = componentRegistry.getById(instance.componentRegistryId)
      if (registryComp) {
        registryComp.dependencies.forEach((dep) => allDeps.add(dep))
      }
    })

    // Base dependencies
    allDeps.add('react')
    allDeps.add('react-dom')
    allDeps.add('next')
    allDeps.add('clsx')
    allDeps.add('tailwind-merge')
    allDeps.add('class-variance-authority')
    allDeps.add('lucide-react')

    // Generate main page
    files.push({
      path: 'app/page.tsx',
      content: this.generateMainPage(),
    })

    // Generate layout
    files.push({
      path: 'app/layout.tsx',
      content: this.generateLayout(),
    })

    // Generate component files
    const componentFiles = this.generateComponentFiles()
    files.push(...componentFiles)

    // Generate utils
    files.push({
      path: 'lib/utils.ts',
      content: this.generateUtils(),
    })

    // Generate tailwind config
    if (includeTailwindConfig) {
      files.push({
        path: 'tailwind.config.ts',
        content: this.generateTailwindConfig(),
      })
    }

    // Generate globals.css
    if (includeGlobalsCss) {
      files.push({
        path: 'app/globals.css',
        content: this.generateGlobalsCss(),
      })
    }

    // Generate package.json
    if (includePackageJson) {
      files.push({
        path: 'package.json',
        content: this.generatePackageJson(Array.from(allDeps), Array.from(devDeps)),
      })
    }

    // Generate README
    if (includeReadme) {
      files.push({
        path: 'README.md',
        content: this.generateReadme(Array.from(allDeps)),
      })
    }

    // Generate postcss config
    files.push({
      path: 'postcss.config.js',
      content: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,
    })

    // Generate tsconfig
    files.push({
      path: 'tsconfig.json',
      content: JSON.stringify(
        {
          compilerOptions: {
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
        },
        null,
        2
      ),
    })

    // Generate next.config
    files.push({
      path: 'next.config.js',
      content: `/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig`,
    })

    const result: ExportResult = {
      files,
      dependencies: Array.from(allDeps),
      devDependencies: Array.from(devDeps),
    }

    // Create ZIP if requested
    if (options.format === 'zip') {
      result.zipBlob = await this.createZip(files)
    }

    return result
  }

  private generateMainPage(): string {
    const imports: string[] = []
    const componentRenders: string[] = []

    this.components
      .sort((a, b) => a.order - b.order)
      .forEach((instance) => {
        const registryComp = componentRegistry.getById(instance.componentRegistryId)
        if (registryComp) {
          const componentName = this.toPascalCase(registryComp.name)
          imports.push(`import { ${componentName} } from '@/components/${registryComp.source}/${this.toKebabCase(registryComp.name)}'`)
          componentRenders.push(`      <${componentName} />`)
        }
      })

    return `${imports.join('\n')}

export default function Page() {
  return (
    <main className="min-h-screen">
${componentRenders.join('\n')}
    </main>
  )
}
`
  }

  private generateLayout(): string {
    const fonts = this.designSystem.typography?.fontFamily || {}
    const headingFont = fonts.heading || 'Inter'
    const bodyFont = fonts.body || 'Inter'

    const headingFontImport = headingFont.replace(/\s+/g, '_')
    const bodyFontImport = bodyFont.replace(/\s+/g, '_')

    return `import type { Metadata } from 'next'
import { ${headingFontImport}, ${bodyFontImport} } from 'next/font/google'
import './globals.css'

const headingFont = ${headingFontImport}({
  subsets: ['latin'],
  variable: '--font-heading',
})

const bodyFont = ${bodyFontImport}({
  subsets: ['latin'],
  variable: '--font-body',
})

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
    <html lang="en" className={${'`${headingFont.variable} ${bodyFont.variable}`'}}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
`
  }

  private generateComponentFiles(): ExportFile[] {
    const files: ExportFile[] = []
    const generatedComponents = new Set<string>()

    this.components.forEach((instance) => {
      if (generatedComponents.has(instance.componentRegistryId)) return
      generatedComponents.add(instance.componentRegistryId)

      const registryComp = componentRegistry.getById(instance.componentRegistryId)
      if (!registryComp) return

      const fileName = this.toKebabCase(registryComp.name)

      // Use real code from the registry instead of stubs
      let code = registryComp.code

      // Add 'use client' directive if it uses hooks or interactivity
      if (code.includes('useState') || code.includes('useEffect') || code.includes('onClick')) {
        if (!code.startsWith("'use client'") && !code.startsWith('"use client"')) {
          code = `'use client'\n\n${code}`
        }
      }

      files.push({
        path: `components/${registryComp.source}/${fileName}.tsx`,
        content: code,
      })
    })

    return files
  }

  private generateUtils(): string {
    return `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
  }

  private generateTailwindConfig(): string {
    const colors = this.designSystem.colors || {}

    return `import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '${colors.primary || 'hsl(var(--primary))'}',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: '${colors.secondary || 'hsl(var(--secondary))'}',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: '${colors.accent || 'hsl(var(--accent))'}',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

export default config
`
  }

  private generateGlobalsCss(): string {

    return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`
  }

  private generatePackageJson(deps: string[], devDeps: string[]): string {
    const dependencies: Record<string, string> = {}
    const devDependencies: Record<string, string> = {}

    deps.forEach((dep) => {
      dependencies[dep] = getVersionForDep(dep)
    })

    devDeps.forEach((dep) => {
      devDependencies[dep] = getVersionForDep(dep)
    })

    return JSON.stringify(
      {
        name: this.toKebabCase(this.project.name),
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint',
        },
        dependencies,
        devDependencies,
      },
      null,
      2
    )
  }

  private generateReadme(deps: string[]): string {
    const specialDeps = deps.filter((d) =>
      ['gsap', 'framer-motion', '@tsparticles/react', 'three'].includes(d)
    )

    return `# ${this.project.name}

${this.project.description || 'Built with App Builder'}

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components built with Radix UI primitives

${
  specialDeps.length > 0
    ? `## Additional Libraries

This project uses the following animation/effect libraries:

${specialDeps.map((d) => `- ${d}`).join('\n')}

Make sure to follow their respective documentation for proper setup.
`
    : ''
}

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx    # Root layout with fonts
│   ├── page.tsx      # Main page
│   └── globals.css   # Global styles
├── components/       # UI components by source
├── lib/
│   └── utils.ts      # Utility functions
└── tailwind.config.ts
\`\`\`

## Built with App Builder

This project was generated using App Builder, combining components from:

- ShadCN UI
- Aceternity UI
- Osmo Supply
- Skiper UI
- GSAP Effects
`
  }

  private async createZip(files: ExportFile[]): Promise<Blob> {
    const zip = new JSZip()

    files.forEach((file) => {
      zip.file(file.path, file.content)
    })

    return await zip.generateAsync({ type: 'blob' })
  }

  private toPascalCase(str: string): string {
    return str
      .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
      .replace(/^(.)/, (_, c) => c.toUpperCase())
  }

  private toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
  }
}

export function analyzeStackRecommendations(components: ComponentInstance[]) {
  const recommendations: Array<{
    package: string
    version: string
    reason: string
    installCommand: string
    required: boolean
  }> = []

  const deps = new Set<string>()

  components.forEach((instance) => {
    const registryComp = componentRegistry.getById(instance.componentRegistryId)
    if (registryComp) {
      registryComp.dependencies.forEach((dep) => deps.add(dep))
    }
  })

  if (deps.has('gsap')) {
    recommendations.push({
      package: 'gsap',
      version: '^3.12.0',
      reason: 'Required for GSAP animations and scroll effects',
      installCommand: 'npm install gsap @gsap/react',
      required: true,
    })
  }

  if (deps.has('framer-motion')) {
    recommendations.push({
      package: 'framer-motion',
      version: '^11.0.0',
      reason: 'Required for Framer Motion animations',
      installCommand: 'npm install framer-motion',
      required: true,
    })
  }

  if (deps.has('@tsparticles/react')) {
    recommendations.push({
      package: '@tsparticles/react',
      version: '^3.0.0',
      reason: 'Required for particle effects (Sparkles)',
      installCommand: 'npm install @tsparticles/react @tsparticles/slim tsparticles',
      required: true,
    })
  }

  return recommendations
}
