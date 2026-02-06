import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { Project, Page, DesignSystem, ComponentInstance, CMSCollection, CMSItem } from '@/types'
import { componentRegistry } from '@/lib/components-registry'
import { stylesToCSSString } from '@/lib/styles/styles-to-css'
import { db } from '@/lib/db'
import { getVersionForDep, DEPENDENCY_VERSIONS } from './dependency-versions'

// Map builtin registry IDs to their HTML element tags
const BUILTIN_TAG_MAP: Record<string, string> = {
  "builtin-section": "section",
  "builtin-container": "div",
  "builtin-div-block": "div",
  "builtin-flex-box": "div",
  "builtin-grid-layout": "div",
  "builtin-columns": "div",
  "builtin-heading": "dynamic", // resolved from props.level
  "builtin-paragraph": "p",
  "builtin-text-block": "span",
  "builtin-link-element": "a",
  "builtin-rich-text": "div",
  "builtin-list-element": "ul",
  "builtin-image": "img",
  "builtin-video": "video",
  "builtin-form-block": "form",
  "builtin-input-field": "input",
  "builtin-text-area": "textarea",
  "builtin-select-field": "select",
  "builtin-button-element": "button",
  "builtin-link-block": "a",
};

// Extended 'use client' detection patterns
const USE_CLIENT_PATTERNS = [
  /\buseState\b/,
  /\buseEffect\b/,
  /\buseRef\b/,
  /\buseCallback\b/,
  /\buseMemo\b/,
  /\buseContext\b/,
  /\buseReducer\b/,
  /\buseLayoutEffect\b/,
  /\buseTransition\b/,
  /\buseDeferredValue\b/,
  /\buseImperativeHandle\b/,
  /\bwindow\b/,
  /\bdocument\b/,
  /\bnavigator\b/,
  /\blocalStorage\b/,
  /\bsessionStorage\b/,
  /\bon[A-Z]\w+=/,
  /\bIntersectionObserver\b/,
  /\bResizeObserver\b/,
  /\bMutationObserver\b/,
  /\brequestAnimationFrame\b/,
  /\bgsap\b/,
  /\buseGSAP\b/,
  /\bmotion\b/,
  /\bAnimatePresence\b/,
]

// Sources that always need 'use client'
const ALWAYS_CLIENT_SOURCES = ['aceternity', 'gsap', 'osmo', 'skiper']

export interface ExportOptions {
  includeReadme: boolean;
  includeTypeScript: boolean;
  includeTailwind: boolean;
  includeEnvExample: boolean;
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
}

const DEFAULT_OPTIONS: ExportOptions = {
  includeReadme: true,
  includeTypeScript: true,
  includeTailwind: true,
  includeEnvExample: true,
  packageManager: "npm",
};

interface SourceFiles {
  ui: Record<string, string>
  shared: Record<string, string>
  registry: Record<string, string>
}

export class ExportEngine {
  private project: Project
  private designSystem: DesignSystem
  private pages: Page[]
  private componentsByPage: Map<string, ComponentInstance[]>
  private cmsCollections: CMSCollection[]
  private cmsItems: CMSItem[]
  private options: ExportOptions
  private sourceFiles: SourceFiles | null = null

  constructor(
    project: Project,
    designSystem: DesignSystem,
    pages: Page[],
    componentsByPage: Map<string, ComponentInstance[]>,
    options: Partial<ExportOptions> = {},
    cmsCollections: CMSCollection[] = [],
    cmsItems: CMSItem[] = [],
  ) {
    this.project = project;
    this.designSystem = designSystem;
    this.pages = pages;
    this.componentsByPage = componentsByPage;
    this.cmsCollections = cmsCollections;
    this.cmsItems = cmsItems;
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  /**
   * Fetch real source files from the API route
   */
  private async fetchSourceFiles(): Promise<SourceFiles> {
    if (this.sourceFiles) return this.sourceFiles

    try {
      const response = await fetch('/api/export-sources')
      if (!response.ok) throw new Error('Failed to fetch source files')
      this.sourceFiles = await response.json()
      return this.sourceFiles!
    } catch {
      console.warn('Could not fetch source files, using registry code fallback')
      return { ui: {}, shared: {}, registry: {} }
    }
  }

  /**
   * Generate and download the project as a ZIP file
   */
  async exportToZip(): Promise<void> {
    await this.fetchSourceFiles()

    const zip = new JSZip()

    await this.generatePackageJson(zip)
    await this.generateNextConfig(zip)
    await this.generateTsConfig(zip)
    await this.generateTailwindConfig(zip)
    await this.generateGlobalsCss(zip)
    await this.generateLayoutFile(zip)
    await this.generatePages(zip)
    await this.generateComponents(zip)
    await this.generateUIComponents(zip)
    await this.generateSharedComponents(zip)
    await this.generateLibFiles(zip)
    await this.generateCMSFiles(zip)
    await this.generateCMSHelpers(zip)

    if (this.options.includeReadme) {
      await this.generateReadme(zip);
    }

    if (this.options.includeEnvExample) {
      await this.generateEnvExample(zip);
    }

    zip.file('.gitignore', this.getGitignore())

    const blob = await zip.generateAsync({ type: 'blob' })
    const filename = `${this.project.name.toLowerCase().replace(/\s+/g, '-')}-export.zip`
    saveAs(blob, filename)
  }

  /**
   * Get the generated code as an object (for preview)
   */
  async getGeneratedCode(): Promise<Record<string, string>> {
    await this.fetchSourceFiles()
    const files: Record<string, string> = {}

    files['package.json'] = this.getPackageJsonContent()
    files['next.config.js'] = this.getNextConfigContent()
    files['tsconfig.json'] = this.getTsConfigContent()
    files['postcss.config.mjs'] = this.getPostCssConfigContent()
    files['app/globals.css'] = this.getGlobalsCssContent()
    files['app/layout.tsx'] = this.getLayoutContent()

    for (const page of this.pages) {
      const components = this.componentsByPage.get(page.id) || [];
      const pagePath =
        page.slug === "home" ? "app/page.tsx" : `app/${page.slug}/page.tsx`;
      files[pagePath] = this.generatePageContent(page, components);
    }

    return files;
  }

  // =====================================
  // File Generators
  // =====================================

  private async generatePackageJson(zip: JSZip): Promise<void> {
    zip.file("package.json", this.getPackageJsonContent());
  }

  private getPackageJsonContent(): string {
    const allComponents = this.getAllUsedComponents();
    const dependencies = this.collectDependencies(allComponents);

    const packageJson = {
      name: this.project.name.toLowerCase().replace(/\s+/g, "-"),
      version: "0.1.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
        lint: "next lint",
      },
      dependencies: {
        next: getVersionForDep("next"),
        react: getVersionForDep("react"),
        "react-dom": getVersionForDep("react-dom"),
        ...dependencies,
      },
      devDependencies: {
        "@types/node": getVersionForDep("@types/node"),
        "@types/react": getVersionForDep("@types/react"),
        "@types/react-dom": getVersionForDep("@types/react-dom"),
        typescript: getVersionForDep("typescript"),
        tailwindcss: getVersionForDep("tailwindcss"),
        "@tailwindcss/postcss": getVersionForDep("@tailwindcss/postcss"),
        postcss: getVersionForDep("postcss"),
        eslint: getVersionForDep("eslint"),
        "eslint-config-next": getVersionForDep("eslint-config-next"),
      },
    };

    return JSON.stringify(packageJson, null, 2);
  }

  private async generateNextConfig(zip: JSZip): Promise<void> {
    zip.file("next.config.js", this.getNextConfigContent());
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
`;
  }

  private async generateTsConfig(zip: JSZip): Promise<void> {
    zip.file("tsconfig.json", this.getTsConfigContent());
  }

  private getTsConfigContent(): string {
    const tsConfig = {
      compilerOptions: {
        target: "es5",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: {
          "@/*": ["./*"],
        },
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"],
    };

    return JSON.stringify(tsConfig, null, 2);
  }

  private async generateTailwindConfig(zip: JSZip): Promise<void> {
    // Tailwind v4 uses CSS-based config, no tailwind.config.js needed
    zip.file("postcss.config.mjs", this.getPostCssConfigContent());
  }

  private getPostCssConfigContent(): string {
    return `export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
`;
  }

  private async generateGlobalsCss(zip: JSZip): Promise<void> {
    const appFolder = zip.folder("app");
    appFolder?.file("globals.css", this.getGlobalsCssContent());
  }

  private getGlobalsCssContent(): string {
    const { colors, typography, borderRadius, spacing, shadows } =
      this.designSystem;

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
  --color-card: ${colors.background};
  --color-card-foreground: ${colors.foreground};
  --color-popover: ${colors.background};
  --color-popover-foreground: ${colors.foreground};
  --color-input: ${colors.border};

  --radius-sm: ${borderRadius.sm};
  --radius-md: ${borderRadius.md};
  --radius-lg: ${borderRadius.lg};
  --radius-xl: ${borderRadius.xl};

  --font-family-heading: var(--font-heading), system-ui, sans-serif;
  --font-family-body: var(--font-body), system-ui, sans-serif;
  --font-family-mono: ui-monospace, monospace;

  --font-size-xs: ${typography.fontSize.xs};
  --font-size-sm: ${typography.fontSize.sm};
  --font-size-base: ${typography.fontSize.base};
  --font-size-lg: ${typography.fontSize.lg};
  --font-size-xl: ${typography.fontSize.xl};
  --font-size-2xl: ${typography.fontSize["2xl"]};
  --font-size-3xl: ${typography.fontSize["3xl"]};
  --font-size-4xl: ${typography.fontSize["4xl"]};
  --font-size-5xl: ${typography.fontSize["5xl"]};

  --font-weight-normal: ${typography.fontWeight.normal};
  --font-weight-medium: ${typography.fontWeight.medium};
  --font-weight-semibold: ${typography.fontWeight.semibold};
  --font-weight-bold: ${typography.fontWeight.bold};

  --line-height-tight: ${typography.lineHeight.tight};
  --line-height-normal: ${typography.lineHeight.normal};
  --line-height-relaxed: ${typography.lineHeight.relaxed};

${spacing.scale.map((val, i) => `  --spacing-${i}: ${val}px;`).join("\n")}

${
  shadows
    ? `  --shadow-sm: ${shadows.sm};
  --shadow-md: ${shadows.md};
  --shadow-lg: ${shadows.lg};
  --shadow-xl: ${shadows.xl};
  --shadow-2xl: ${shadows["2xl"]};
  --shadow-inner: ${shadows.inner};`
    : ""
}
}

@layer base {
  * {
    border-color: var(--color-border);
  }

  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-family-body);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-heading);
  }

  code, pre, kbd {
    font-family: var(--font-family-mono);
  }
}

/* Dark mode - invert foreground/background */
.dark {
  --color-background: ${colors.foreground || "#0a0a0a"};
  --color-foreground: ${colors.background || "#fafafa"};
  --color-muted: ${colors.mutedForeground || "#262626"};
  --color-muted-foreground: ${colors.muted || "#a3a3a3"};
  --color-border: ${colors.mutedForeground || "#262626"};
}
`;
  }

  private async generateLayoutFile(zip: JSZip): Promise<void> {
    const appFolder = zip.folder("app");
    appFolder?.file("layout.tsx", this.getLayoutContent());
  }

  private getLayoutContent(): string {
    const escapedName = (this.project.name || '').replace(/'/g, "\\'")
    const escapedDesc = (this.project.description || 'Built with App Builder').replace(/'/g, "\\'")

    const headingFont = this.designSystem.typography?.fontFamily?.heading || 'Inter'
    const bodyFont = this.designSystem.typography?.fontFamily?.body || 'Inter'

    const headingFontImport = headingFont.replace(/\s+/g, '_')
    const bodyFontImport = bodyFont.replace(/\s+/g, '_')

    const isSameFont = headingFont === bodyFont
    const fontImports = isSameFont
      ? `import { ${headingFontImport} } from 'next/font/google'`
      : `import { ${headingFontImport}, ${bodyFontImport} } from 'next/font/google'`

    const fontSetup = isSameFont
      ? `
const headingFontConfig = ${headingFontImport}({
  subsets: ['latin'],
  variable: '--font-heading',
})
`
      : `
const headingFontConfig = ${headingFontImport}({
  subsets: ['latin'],
  variable: '--font-heading',
})

const bodyFontConfig = ${bodyFontImport}({
  subsets: ['latin'],
  variable: '--font-body',
})
`

    const classNames = isSameFont
      ? 'headingFontConfig.variable'
      : '`${headingFontConfig.variable} ${bodyFontConfig.variable}`'

    return `import type { Metadata } from 'next'
${fontImports}
import './globals.css'
${fontSetup}
export const metadata: Metadata = {
  title: '${escapedName}',
  description: '${escapedDesc}',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={${classNames}}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
`;
  }

  private async generatePages(zip: JSZip): Promise<void> {
    const appFolder = zip.folder("app")!;

    for (const page of this.pages) {
      const components = this.componentsByPage.get(page.id) || [];
      const content = this.generatePageContent(page, components);

      if (page.slug === "home") {
        appFolder.file("page.tsx", content);
      } else {
        const pageFolder = appFolder.folder(page.slug);
        pageFolder?.file("page.tsx", content);
      }
    }
  }

  private generatePageContent(
    page: Page,
    components: ComponentInstance[],
  ): string {
    const imports = this.generateImports(components);
    const componentJsx = this.generateComponentsJsx(components);

    return `${imports}

export default function ${this.toPascalCase(page.name)}Page() {
  return (
    <main className="min-h-screen">
      ${componentJsx || "      {/* Add your components here */}"}
    </main>
  )
}
`;
  }

  /**
   * Generate component files from real source code (not registry snippets)
   */
  private async generateComponents(zip: JSZip): Promise<void> {
    const componentsFolder = zip.folder('components')!
    const sources = await this.fetchSourceFiles()

    const usedComponents = this.getAllUsedComponents()
    const uniqueRegistryIds = new Set(usedComponents.map((c) => c.componentRegistryId))

    for (const registryId of uniqueRegistryIds) {
      const registryItem = componentRegistry.getById(registryId)
      if (!registryItem) continue
      if (registryItem.source === 'builtin') continue

      const filename = `${registryItem.name.toLowerCase().replace(/\s+/g, '-')}.tsx`
      const sourceKey = `${registryItem.source}/${filename}`

      // Try to get real source file, fall back to registry code field
      let code = sources.registry[sourceKey] || registryItem.code

      // Rewrite @/lib/utils/cn imports for export
      code = code.replace(
        /from ['"]@\/lib\/utils\/cn['"]/g,
        "from '@/lib/utils'"
      )

      // Add 'use client' directive if needed
      code = this.ensureUseClientDirective(code, registryItem.source)

      const sourceFolder = componentsFolder.folder(registryItem.source)!
      sourceFolder.file(filename, code)
    }
  }

  /**
   * Copy UI primitive components (button, card, input, etc.)
   */
  private async generateUIComponents(zip: JSZip): Promise<void> {
    const sources = await this.fetchSourceFiles()
    const uiFolder = zip.folder('components')!.folder('ui')!

    const neededUI = this.detectNeededUIComponents()

    for (const [filename, content] of Object.entries(sources.ui)) {
      const name = filename.replace(/\.tsx?$/, '')
      if (neededUI.size === 0 || neededUI.has(name)) {
        uiFolder.file(filename, content)
      }

    }
  }

  /**
   * Copy shared registry components (_shared/section-wrapper, placeholder-image)
   */
  private async generateSharedComponents(zip: JSZip): Promise<void> {
    const sources = await this.fetchSourceFiles()
    const sharedFolder = zip.folder('components')!.folder('registry')!.folder('_shared')!

    for (const [filename, content] of Object.entries(sources.shared)) {
      sharedFolder.file(filename, content)
    }
  }

  /**
   * Detect which UI components are imported by the used components
   */
  private detectNeededUIComponents(): Set<string> {
    const needed = new Set<string>()
    const allComponents = this.getAllUsedComponents()
    const uniqueIds = new Set(allComponents.map((c) => c.componentRegistryId))

    for (const id of uniqueIds) {
      const registryItem = componentRegistry.getById(id)
      if (!registryItem) continue

      const importMatches = registryItem.code.matchAll(
        /from\s+['"]@\/components\/ui\/([^'"]+)['"]/g
      )
      for (const match of importMatches) {
        needed.add(match[1])
      }
    }

    if (needed.size === 0) {
      needed.add('button')
      needed.add('card')
      needed.add('badge')
      needed.add('input')
    }

    return needed
  }

  /**
   * Enhanced 'use client' detection
   */
  private ensureUseClientDirective(code: string, source: string): string {
    if (code.startsWith("'use client'") || code.startsWith('"use client"')) {
      return code
    }

    if (ALWAYS_CLIENT_SOURCES.includes(source)) {
      return `'use client'\n\n${code}`
    }

    const needsClient = USE_CLIENT_PATTERNS.some((pattern) => pattern.test(code))
    if (needsClient) {
      return `'use client'\n\n${code}`
    }

    return code
  }

  private async generateLibFiles(zip: JSZip): Promise<void> {
    const libFolder = zip.folder("lib")!;

    libFolder.file('utils.ts', `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,
    );

    // Utils/cn (for shadcn components importing from @/lib/utils/cn)
    const utilsFolder = libFolder.folder("utils")!;
    utilsFolder.file(
      "cn.ts",
      `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,
    );
  }

  private async generateCMSFiles(zip: JSZip): Promise<void> {
    if (this.cmsCollections.length === 0) return;

    const cmsFolder = zip.folder("lib/cms")!;

    const typeDefs = this.cmsCollections.map((col) => {
      const typeName = this.toPascalCase(col.name)
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
      }).join("\n")
      return `export interface ${typeName} {\n${fields}\n}`
    }).join("\n\n");

    cmsFolder.file("types.ts", typeDefs + "\n");

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

    const helpers = `// CMS Helpers - Auto-generated
${this.cmsCollections
  .map((col) => {
    const typeName = this.toPascalCase(col.name);
    const varName = col.slug.replace(/-/g, "_");
    return `import { ${varName} } from './data'
import type { ${typeName} } from './types'

export function get${typeName}s(onlyPublished = true): ${typeName}[] {
  return onlyPublished ? ${varName}.filter(i => i._status === 'published') : ${varName}
}

export function get${typeName}ById(id: string): ${typeName} | undefined {
  return ${varName}.find(i => i.id === id)
}`;
  })
  .join("\n\n")}
`;
    cmsFolder.file("helpers.ts", helpers);
  }

  private async generateCMSHelpers(zip: JSZip): Promise<void> {
    if (this.cmsCollections.length > 0) return;

    const hasCMSBindings = Array.from(this.componentsByPage.values())
      .flat()
      .some((c) => c.cmsBindings && c.cmsBindings.length > 0);

    if (!hasCMSBindings) return;

    const cmsFolder = zip.folder('lib')?.folder('cms')

    cmsFolder?.file(
      "helpers.ts",
      `// CMS data helpers - replace with your actual data source
export interface CMSItem {
  id: string
  slug: string
  data: Record<string, unknown>
}

export async function getCollectionItems(collectionSlug: string): Promise<CMSItem[]> {
  // TODO: Connect to your CMS (Contentful, Sanity, Strapi, etc.)
  return []
}

export async function getCollectionItem(collectionSlug: string, itemSlug: string): Promise<CMSItem | null> {
  const items = await getCollectionItems(collectionSlug)
  return items.find(item => item.slug === itemSlug) ?? null
}
`,
    );
  }

  private async generateReadme(zip: JSZip): Promise<void> {
    const readme = `# ${this.project.name}

${this.project.description || "A Next.js project built with App Builder."}

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
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript

## Project Structure

\`\`\`
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # Shadcn UI primitives
│   ├── registry/    # Shared component utilities
│   ├── shadcn/      # ShadCN section components
│   ├── aceternity/  # Aceternity UI components
│   ├── osmo/        # Osmo Supply components
│   ├── skiper/      # Skiper UI components
│   └── gsap/        # GSAP effect components
├── lib/             # Utility functions
│   ├── utils.ts     # cn() helper
│   └── cms/         # CMS data and helpers
└── public/          # Static assets
\`\`\`

## Deploy

\`\`\`bash
npx vercel --prod
\`\`\`

## License

MIT
`
    zip.file('README.md', readme)
  }

  private async generateEnvExample(zip: JSZip): Promise<void> {
    zip.file(
      ".env.example",
      `# Environment Variables
# Copy this file to .env.local and fill in the values

# Example:
# DATABASE_URL=your_database_url
# API_KEY=your_api_key
`,
    );
  }

  // =====================================
  // Dependency Resolution
  // =====================================

  private collectDependencies(components: ComponentInstance[]): Record<string, string> {
    const deps: Record<string, string> = {
      clsx: "^2.1.0",
      "tailwind-merge": "^3.0.0",
      "class-variance-authority": "^0.7.0",
      "lucide-react": "^0.400.0",
    };

    const uniqueIds = new Set(components.map((c) => c.componentRegistryId))

    for (const id of uniqueIds) {
      const registryItem = componentRegistry.getById(id);
      if (!registryItem) continue;

      if (registryItem.dependencyManifest?.length) {
        for (const dep of registryItem.dependencyManifest) {
          deps[dep.package] = dep.version;
        }
      } else {
        for (const dep of registryItem.dependencies) {
          if (!deps[dep]) {
            deps[dep] = DEPENDENCY_VERSIONS[dep] || getVersionForDep(dep)
          }
        }
      }

      // Scan component code for additional npm imports (transitive deps)
      this.scanCodeForDependencies(registryItem.code, deps)
    }

    const hasAceternity = [...uniqueIds].some((id) => componentRegistry.getById(id)?.source === 'aceternity')
    const hasGsap = [...uniqueIds].some((id) => componentRegistry.getById(id)?.source === 'gsap')
    const hasSkiper = [...uniqueIds].some((id) => componentRegistry.getById(id)?.source === 'skiper')

    if (hasAceternity || hasSkiper) {
      deps['framer-motion'] = getVersionForDep('framer-motion')
    }
    if (hasGsap) {
      deps['gsap'] = getVersionForDep('gsap')
      deps['@gsap/react'] = getVersionForDep('@gsap/react')
    }

    // Add Radix UI dependencies for used UI components
    const neededUI = this.detectNeededUIComponents()
    const uiRadixMap: Record<string, string[]> = {
      dialog: ['@radix-ui/react-dialog'],
      accordion: ['@radix-ui/react-accordion'],
      tabs: ['@radix-ui/react-tabs'],
      tooltip: ['@radix-ui/react-tooltip'],
      popover: ['@radix-ui/react-popover'],
      select: ['@radix-ui/react-select'],
      'dropdown-menu': ['@radix-ui/react-dropdown-menu'],
      'context-menu': ['@radix-ui/react-context-menu'],
      'navigation-menu': ['@radix-ui/react-navigation-menu'],
      'hover-card': ['@radix-ui/react-hover-card'],
      switch: ['@radix-ui/react-switch'],
      label: ['@radix-ui/react-label'],
      separator: ['@radix-ui/react-separator'],
      avatar: ['@radix-ui/react-avatar'],
      'radio-group': ['@radix-ui/react-radio-group'],
      checkbox: ['@radix-ui/react-checkbox'],
      collapsible: ['@radix-ui/react-collapsible'],
      'scroll-area': ['@radix-ui/react-scroll-area'],
      slider: ['@radix-ui/react-slider'],
      progress: ['@radix-ui/react-progress'],
      toggle: ['@radix-ui/react-toggle'],
      'toggle-group': ['@radix-ui/react-toggle-group'],
      button: ['@radix-ui/react-slot'],
    }

    for (const uiName of neededUI) {
      const radixDeps = uiRadixMap[uiName]
      if (radixDeps) {
        for (const dep of radixDeps) {
          deps[dep] = getVersionForDep(dep)
        }
      }
    }

    return deps;
  }

  /**
   * Scan component code for npm package imports (transitive dependency detection)
   */
  private scanCodeForDependencies(code: string, deps: Record<string, string>): void {
    const importMatches = code.matchAll(
      /(?:import|from)\s+['"]([^@./][^'"]*)['"]/g
    )
    for (const match of importMatches) {
      let pkg = match[1]
      if (pkg.startsWith('@')) {
        const parts = pkg.split('/')
        pkg = parts.slice(0, 2).join('/')
      } else {
        pkg = pkg.split('/')[0]
      }
      if (['react', 'react-dom', 'next', 'react/jsx-runtime'].includes(pkg)) continue
      if (!deps[pkg]) {
        deps[pkg] = DEPENDENCY_VERSIONS[pkg] || getVersionForDep(pkg)
      }
    }
  }

  // =====================================
  // JSX Generation Helpers
  // =====================================

  private getAllUsedComponents(): ComponentInstance[] {
    const allComponents: ComponentInstance[] = []
    for (const components of this.componentsByPage.values()) {
      allComponents.push(...components)
    }
    return allComponents
  }

  private generateImports(components: ComponentInstance[]): string {
    const uniqueIds = new Set(
      components
        .filter((c) => c.source !== "builtin")
        .map((c) => c.componentRegistryId),
    );
    const imports: string[] = [];

    for (const id of uniqueIds) {
      const registryItem = componentRegistry.getById(id);
      if (!registryItem) continue;

      const componentName = this.toPascalCase(registryItem.name);

      // Use modulePath for the filename, matching what generateComponents writes
      const filename = registryItem.modulePath
        ? registryItem.modulePath.replace(`${registryItem.source}-`, "")
        : registryItem.name.toLowerCase().replace(/\s+/g, "-");

      imports.push(
        `import ${componentName} from '@/components/${registryItem.source}/${filename}'`,
      );
    }

    return imports.join("\n");
  }

  private generateComponentsJsx(components: ComponentInstance[], indent = 6): string {
    if (components.length === 0) return ''

    const rootComponents = components
      .filter((c) => !c.parentId)
      .sort((a, b) => a.order - b.order);

    return rootComponents
      .map((comp) => this.renderComponentNode(comp, components, indent))
      .join("\n");
  }

  private renderComponentNode(
    comp: ComponentInstance,
    allComponents: ComponentInstance[],
    indent: number,
  ): string {
    const pad = " ".repeat(indent);
    const registryItem = componentRegistry.getById(comp.componentRegistryId);
    if (!registryItem)
      return `${pad}{/* Unknown: ${comp.componentRegistryId} */}`;

    const styleStr = this.buildStyleAttribute(comp)

    const children = allComponents
      .filter((c) => c.parentId === comp.id)
      .sort((a, b) => a.order - b.order);

    const builtinTag = BUILTIN_TAG_MAP[comp.componentRegistryId]
    if (builtinTag) {
      return this.renderBuiltinElement(
        comp,
        builtinTag,
        children,
        allComponents,
        indent,
        styleStr,
      );
    }

    const componentName = this.toPascalCase(registryItem.name)
    const propsString = this.generatePropsString(comp.props)

    if (children.length > 0) {
      const childrenJsx = children
        .map((child) =>
          this.renderComponentNode(child, allComponents, indent + 2),
        )
        .join("\n");
      return `${pad}<${componentName}${propsString}${styleStr}>\n${childrenJsx}\n${pad}</${componentName}>`;
    }

    return `${pad}<${componentName}${propsString}${styleStr} />`;
  }

  private renderBuiltinElement(
    comp: ComponentInstance,
    tag: string,
    children: ComponentInstance[],
    allComponents: ComponentInstance[],
    indent: number,
    styleStr: string,
  ): string {
    const pad = " ".repeat(indent);

    // Dynamic heading tag from props
    if (tag === "dynamic") {
      const level =
        (comp.props.level as string) || (comp.props.tag as string) || "h2";
      const validLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];
      tag = validLevels.includes(level) ? level : "h2";
    }

    if (tag === 'img') {
      const src = this.escapeJsxString(comp.props.src as string || '/placeholder.jpg')
      const alt = this.escapeJsxString(comp.props.alt as string || '')
      return `${pad}<img src="${src}" alt="${alt}"${styleStr} />`
    }
    if (tag === "input") {
      const type = this.escapeJsxString((comp.props.type as string) || "text");
      const placeholder = this.escapeJsxString(
        (comp.props.placeholder as string) || "",
      );
      const name = this.escapeJsxString((comp.props.name as string) || "");
      return `${pad}<input type="${type}" name="${name}" placeholder="${placeholder}"${styleStr} />`;
    }

    const textContent = (comp.props.text || comp.props.content || comp.props.label || comp.props.children || '') as string

    if (children.length > 0) {
      const childrenJsx = children
        .map((child) =>
          this.renderComponentNode(child, allComponents, indent + 2),
        )
        .join("\n");
      return `${pad}<${tag}${styleStr}>\n${childrenJsx}\n${pad}</${tag}>`;
    }

    if (textContent) {
      return `${pad}<${tag}${styleStr}>${this.escapeJsxString(textContent)}</${tag}>`;
    }

    return `${pad}<${tag}${styleStr} />`;
  }

  private buildStyleAttribute(comp: ComponentInstance): string {
    const cssString = stylesToCSSString(comp.styles)
    if (!cssString) return ''
    const entries = cssString.split(';').filter(Boolean).map((rule) => {
      const colonIdx = rule.indexOf(':')
      if (colonIdx === -1) return ''
      const prop = rule.slice(0, colonIdx).trim()
      const val = rule.slice(colonIdx + 1).trim()
      const camelProp = prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
      return `${camelProp}: '${val}'`
    }).filter(Boolean)
    return ` style={{ ${entries.join(', ')} }}`
  }

  private escapeJsxString(str: string): string {
    return str
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/'/g, "\\'")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\{/g, "&#123;")
      .replace(/\}/g, "&#125;");
  }

  private generatePropsString(props: Record<string, unknown>): string {
    const entries = Object.entries(props).filter(
      ([, value]) => value !== undefined && value !== null,
    );

    if (entries.length === 0) return "";

    const propsArray = entries.map(([key, value]) => {
      if (typeof value === "string") {
        return `${key}="${this.escapeJsxString(value)}"`;
      } else if (typeof value === "boolean") {
        return value ? key : `${key}={false}`;
      } else {
        try {
          return `${key}={${JSON.stringify(value)}}`;
        } catch {
          return `${key}={undefined /* non-serializable */}`;
        }
      }
    });

    return " " + propsArray.join(" ");
  }

  /**
   * Detect if a component needs 'use client' directive
   * Checks for React hooks, browser APIs, event handlers, and source-based heuristics
   */
  private detectClientDirective(code: string, source: string): boolean {
    // Sources that are always client components (animations, interactivity)
    const alwaysClientSources = ["aceternity", "gsap", "osmo", "skiper"];
    if (alwaysClientSources.includes(source)) {
      return true;
    }

    // React hooks that require client
    const hooks = [
      "useState",
      "useEffect",
      "useRef",
      "useCallback",
      "useMemo",
      "useContext",
      "useReducer",
      "useLayoutEffect",
      "useTransition",
      "useDeferredValue",
      "useId",
      "useSyncExternalStore",
      "useInsertionEffect",
      "useImperativeHandle",
      "useDebugValue",
    ];

    // Browser APIs that require client
    const browserAPIs = [
      "window",
      "document",
      "navigator",
      "localStorage",
      "sessionStorage",
      "IntersectionObserver",
      "ResizeObserver",
      "MutationObserver",
      "requestAnimationFrame",
      "cancelAnimationFrame",
      "setTimeout",
      "setInterval",
      "fetch",
      "XMLHttpRequest",
      "WebSocket",
      "AudioContext",
      "Canvas",
      "getComputedStyle",
    ];

    // Event handlers that require client
    const eventHandlers = [
      "onClick",
      "onChange",
      "onSubmit",
      "onFocus",
      "onBlur",
      "onKeyDown",
      "onKeyUp",
      "onKeyPress",
      "onMouseEnter",
      "onMouseLeave",
      "onMouseMove",
      "onMouseDown",
      "onMouseUp",
      "onScroll",
      "onWheel",
      "onTouchStart",
      "onTouchMove",
      "onTouchEnd",
      "onDrag",
      "onDrop",
      "onInput",
      "onLoad",
      "onError",
      "onAnimationEnd",
      "onTransitionEnd",
    ];

    // Check hooks
    for (const hook of hooks) {
      if (code.includes(hook)) return true;
    }

    // Check browser APIs (with word boundary to avoid false positives)
    for (const api of browserAPIs) {
      const regex = new RegExp(`\\b${api}\\b`);
      if (regex.test(code)) return true;
    }

    // Check event handlers
    for (const handler of eventHandlers) {
      if (code.includes(handler)) return true;
    }

    // Check for framer-motion (always needs client)
    if (code.includes("framer-motion") || code.includes("motion/react")) {
      return true;
    }

    // Check for gsap
    if (code.includes("gsap") || code.includes("@gsap")) {
      return true;
    }

    return false;
  }

  private toPascalCase(str: string): string {
    return str
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
      .replace(/^(.)/, (c) => c.toUpperCase());
  }

  private getInstallCommand(): string {
    const commands: Record<string, string> = {
      npm: "npm install",
      yarn: "yarn",
      pnpm: "pnpm install",
      bun: "bun install",
    };
    return commands[this.options.packageManager];
  }

  private getDevCommand(): string {
    const commands: Record<string, string> = {
      npm: "npm run dev",
      yarn: "yarn dev",
      pnpm: "pnpm dev",
      bun: "bun dev",
    };
    return commands[this.options.packageManager];
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
`;
  }
}

// =====================================
// Export Helper Function
// =====================================

export async function exportProject(
  projectId: string,
  options?: Partial<ExportOptions>,
): Promise<void> {
  const project = await db.projects.get(projectId)
  if (!project) throw new Error('Project not found')

  const designSystem = await db.designSystems
    .where("projectId")
    .equals(projectId)
    .first();
  if (!designSystem) throw new Error("Design system not found");

  const pages = await db.pages
    .where("projectId")
    .equals(projectId)
    .sortBy("order");

  const componentsByPage = new Map<string, ComponentInstance[]>()
  for (const page of pages) {
    const components = await db.componentInstances
      .where("pageId")
      .equals(page.id)
      .sortBy("order");
    componentsByPage.set(page.id, components);
  }

  const cmsCollections = await db.cmsCollections
    .where("projectId")
    .equals(projectId)
    .toArray();

  const cmsItems: CMSItem[] = [];
  for (const collection of cmsCollections) {
    const items = await db.cmsItems
      .where("collectionId")
      .equals(collection.id)
      .toArray();
    cmsItems.push(...items);
  }

  const exporter = new ExportEngine(
    project,
    designSystem,
    pages,
    componentsByPage,
    options,
    cmsCollections,
    cmsItems,
  );
  await exporter.exportToZip();
}
