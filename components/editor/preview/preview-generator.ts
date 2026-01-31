import { ComponentInstance } from '@/types/component'
import { componentRegistry } from '@/lib/components-registry'
import { DesignSystem } from '@/types/project'

/**
 * Generate a complete HTML document for preview
 */
export function generatePreviewHtml(
  components: ComponentInstance[],
  designSystem: DesignSystem | null,
  options: {
    darkMode?: boolean
    width?: number
  } = {}
): string {
  const { darkMode = false } = options

  // Generate CSS variables from design system
  const cssVariables = generateCssVariables(designSystem, darkMode)

  // Generate component HTML
  const componentsHtml = components
    .filter((c) => !c.isHidden)
    .sort((a, b) => a.order - b.order)
    .map((c) => generateComponentHtml(c))
    .join('\n')

  return `<!DOCTYPE html>
<html lang="en" class="${darkMode ? 'dark' : ''}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
              DEFAULT: 'hsl(var(--primary))',
              foreground: 'hsl(var(--primary-foreground))',
            },
            secondary: {
              DEFAULT: 'hsl(var(--secondary))',
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
              DEFAULT: 'hsl(var(--accent))',
              foreground: 'hsl(var(--accent-foreground))',
            },
            card: {
              DEFAULT: 'hsl(var(--card))',
              foreground: 'hsl(var(--card-foreground))',
            },
          },
          borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
          },
        },
      },
    }
  </script>
  <style>
    ${cssVariables}
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: hsl(var(--background));
      color: hsl(var(--foreground));
      min-height: 100vh;
    }

    /* Animation keyframes */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }

    /* Placeholder styles for complex components */
    .preview-placeholder {
      border: 2px dashed hsl(var(--border));
      border-radius: var(--radius);
      padding: 2rem;
      text-align: center;
      background: hsl(var(--muted));
    }
  </style>
</head>
<body>
  <main>
    ${componentsHtml || `
      <div class="flex items-center justify-center min-h-screen">
        <div class="text-center text-muted-foreground">
          <p class="text-lg">No components to preview</p>
          <p class="text-sm">Add components to see them here</p>
        </div>
      </div>
    `}
  </main>

  <script>
    // Add intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(el => observer.observe(el));

    // Handle clicks to prevent navigation
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
      }
    });
  </script>
</body>
</html>`
}

/**
 * Generate CSS variables from design system
 */
function generateCssVariables(
  designSystem: DesignSystem | null,
  darkMode: boolean
): string {
  const defaultVars = `
    :root {
      --background: 0 0% 100%;
      --foreground: 222.2 84% 4.9%;
      --card: 0 0% 100%;
      --card-foreground: 222.2 84% 4.9%;
      --popover: 0 0% 100%;
      --popover-foreground: 222.2 84% 4.9%;
      --primary: 222.2 47.4% 11.2%;
      --primary-foreground: 210 40% 98%;
      --secondary: 210 40% 96%;
      --secondary-foreground: 222.2 47.4% 11.2%;
      --muted: 210 40% 96%;
      --muted-foreground: 215.4 16.3% 46.9%;
      --accent: 210 40% 96%;
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
  `

  if (!designSystem?.colors) {
    return defaultVars
  }

  // Override with design system colors
  const colors = designSystem.colors
  let customVars = ':root {\n'

  for (const [key, value] of Object.entries(colors)) {
    // Convert hex to HSL if needed
    const hsl = hexToHsl(value as string)
    if (hsl) {
      customVars += `  --${key}: ${hsl};\n`
    }
  }

  if (designSystem.borderRadius) {
    const radius = designSystem.borderRadius as unknown as Record<string, string>
    customVars += `  --radius: ${radius.md || radius.default || '0.5rem'};\n`
  }

  customVars += '}\n'

  return defaultVars + customVars
}

/**
 * Generate HTML for a single component
 */
function generateComponentHtml(component: ComponentInstance): string {
  const registry = componentRegistry.getById(component.componentRegistryId)
  if (!registry) {
    return `<!-- Unknown component: ${component.componentRegistryId} -->`
  }

  // Get props
  const props = component.props

  // Simple rendering based on component type
  switch (registry.source) {
    case 'osmo':
      return generateOsmoComponentHtml(registry.name, props)
    case 'shadcn':
      return generateShadcnComponentHtml(registry.name, props)
    case 'aceternity':
      return generateAceternityComponentHtml(registry.name, props)
    default:
      return generateGenericComponentHtml(registry.displayName, props)
  }
}

// Generate HTML for Osmo components
function generateOsmoComponentHtml(name: string, props: Record<string, unknown>): string {
  switch (name) {
    case 'HeroSection':
      return `
        <section class="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
          <div class="mx-auto max-w-4xl text-center">
            <h1 class="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              ${props.title || 'Welcome to Our Platform'}
            </h1>
            <p class="text-lg leading-8 text-muted-foreground mb-10">
              ${props.subtitle || 'Build something amazing with our tools and resources.'}
            </p>
            <div class="flex items-center justify-center gap-4">
              <a href="#" class="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90">
                ${props.ctaText || 'Get Started'}
              </a>
              <a href="#" class="text-sm font-semibold text-foreground hover:text-primary">
                Learn more →
              </a>
            </div>
          </div>
        </section>
      `
    case 'FeaturesGrid':
      return `
        <section class="py-20 px-6 lg:px-8">
          <div class="mx-auto max-w-6xl">
            <div class="text-center mb-16">
              <h2 class="text-3xl font-bold mb-4">${props.title || 'Features'}</h2>
              <p class="text-muted-foreground">${props.subtitle || 'Everything you need to succeed'}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              ${generateFeatureCards(props.features as string[] | undefined)}
            </div>
          </div>
        </section>
      `
    case 'CtaSection':
      return `
        <section class="py-20 px-6 lg:px-8 bg-primary text-primary-foreground">
          <div class="mx-auto max-w-4xl text-center">
            <h2 class="text-3xl font-bold mb-4">${props.title || 'Ready to get started?'}</h2>
            <p class="text-lg opacity-90 mb-8">${props.subtitle || 'Join thousands of satisfied customers today.'}</p>
            <a href="#" class="inline-block rounded-md bg-background text-foreground px-6 py-3 text-sm font-semibold shadow-sm hover:opacity-90">
              ${props.ctaText || 'Start Free Trial'}
            </a>
          </div>
        </section>
      `
    case 'Footer':
      return `
        <footer class="py-12 px-6 lg:px-8 border-t">
          <div class="mx-auto max-w-6xl">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
              <p class="text-sm text-muted-foreground">
                ${props.copyright || '© 2024 Your Company. All rights reserved.'}
              </p>
              <div class="flex gap-6">
                <a href="#" class="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
                <a href="#" class="text-sm text-muted-foreground hover:text-foreground">Terms</a>
                <a href="#" class="text-sm text-muted-foreground hover:text-foreground">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      `
    default:
      return generateGenericComponentHtml(name, props)
  }
}

// Generate HTML for ShadCN components
function generateShadcnComponentHtml(name: string, props: Record<string, unknown>): string {
  switch (name) {
    case 'Button':
      const variant = props.variant || 'default'
      const variantClasses = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      }
      return `
        <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors px-4 py-2 ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default}">
          ${props.children || props.label || 'Button'}
        </button>
      `
    case 'Card':
      return `
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          ${props.title ? `<h3 class="text-lg font-semibold mb-2">${props.title}</h3>` : ''}
          ${props.description ? `<p class="text-sm text-muted-foreground">${props.description}</p>` : ''}
          ${props.children || ''}
        </div>
      `
    default:
      return generateGenericComponentHtml(name, props)
  }
}

// Generate HTML for Aceternity components
function generateAceternityComponentHtml(name: string, props: Record<string, unknown>): string {
  switch (name) {
    case 'HeroParallax':
      return `
        <section class="relative h-[600px] overflow-hidden bg-gradient-to-b from-background via-background to-muted">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center z-10">
              <h1 class="text-5xl font-bold mb-4">${props.title || 'Parallax Hero'}</h1>
              <p class="text-xl text-muted-foreground">${props.subtitle || 'Scroll to see the effect'}</p>
            </div>
          </div>
          <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </section>
      `
    case 'BentoGrid':
      return `
        <section class="py-20 px-6">
          <div class="mx-auto max-w-6xl">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="col-span-2 row-span-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                <h3 class="text-2xl font-bold mb-2">${props.title || 'Featured Item'}</h3>
                <p class="text-muted-foreground">${props.description || 'Main feature description'}</p>
              </div>
              <div class="rounded-xl bg-card border p-6">
                <h4 class="font-semibold mb-2">Feature 1</h4>
                <p class="text-sm text-muted-foreground">Description</p>
              </div>
              <div class="rounded-xl bg-card border p-6">
                <h4 class="font-semibold mb-2">Feature 2</h4>
                <p class="text-sm text-muted-foreground">Description</p>
              </div>
            </div>
          </div>
        </section>
      `
    default:
      return generateGenericComponentHtml(name, props)
  }
}

// Generate generic component HTML
function generateGenericComponentHtml(name: string, props: Record<string, unknown>): string {
  return `
    <div class="preview-placeholder my-4 mx-auto max-w-4xl">
      <div class="text-sm font-medium mb-2">${name}</div>
      <div class="text-xs text-muted-foreground">
        ${Object.keys(props).length > 0 
          ? `Props: ${Object.keys(props).join(', ')}` 
          : 'No props configured'}
      </div>
    </div>
  `
}

// Generate feature cards
function generateFeatureCards(features?: string[]): string {
  const defaultFeatures = ['Speed', 'Security', 'Scalability']
  const items = features || defaultFeatures

  return items.slice(0, 6).map((feature, i) => `
    <div class="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
      <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <span class="text-primary text-lg">${i + 1}</span>
      </div>
      <h3 class="font-semibold mb-2">${feature}</h3>
      <p class="text-sm text-muted-foreground">
        Description for ${feature.toLowerCase()} feature.
      </p>
    </div>
  `).join('')
}

// Helper: Convert hex to HSL
function hexToHsl(hex: string): string | null {
  if (!hex || !hex.startsWith('#')) return null

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return null

  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}
