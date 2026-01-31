import { ComponentInstance } from '@/types/component'
import { componentRegistry } from '@/lib/components-registry'

/**
 * Generate React component code from component instances
 */
export function generatePageCode(
  components: ComponentInstance[],
  pageName: string = 'Page'
): string {
  if (components.length === 0) {
    return `export default function ${pageName}() {
  return (
    <main className="min-h-screen">
      {/* Add components to get started */}
    </main>
  )
}`
  }

  const sorted = [...components].sort((a, b) => a.order - b.order)
  
  // Collect imports
  const imports = new Map<string, Set<string>>()
  
  for (const comp of sorted) {
    const registry = componentRegistry.getById(comp.componentRegistryId)
    if (!registry) continue
    
    const importPath = `@/components/ui/${kebabCase(registry.name)}`
    if (!imports.has(importPath)) {
      imports.set(importPath, new Set())
    }
    imports.get(importPath)!.add(registry.name)
  }

  // Generate import statements
  const importStatements = Array.from(imports.entries())
    .map(([path, names]) => {
      const namedImports = Array.from(names).join(', ')
      return `import { ${namedImports} } from '${path}'`
    })
    .join('\n')

  // Generate JSX for each component
  const jsxComponents = sorted
    .filter(comp => !comp.isHidden)
    .map((comp) => generateComponentJsx(comp))
    .join('\n      ')

  return `'use client'

${importStatements}

export default function ${pageName}() {
  return (
    <main className="min-h-screen">
      ${jsxComponents}
    </main>
  )
}`
}

/**
 * Generate JSX for a single component
 */
export function generateComponentJsx(component: ComponentInstance): string {
  const registry = componentRegistry.getById(component.componentRegistryId)
  if (!registry) {
    return `{/* Unknown component: ${component.componentRegistryId} */}`
  }

  const props = Object.entries(component.props)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${escapeString(value)}"`
      } else if (typeof value === 'boolean') {
        return value ? key : `${key}={false}`
      } else if (typeof value === 'number') {
        return `${key}={${value}}`
      } else if (Array.isArray(value)) {
        return `${key}={${JSON.stringify(value)}}`
      } else if (typeof value === 'object') {
        return `${key}={${JSON.stringify(value)}}`
      }
      return `${key}={${JSON.stringify(value)}}`
    })
    .join('\n        ')

  const hasProps = props.length > 0
  const componentName = registry.name

  if (hasProps) {
    return `<${componentName}
        ${props}
      />`
  }

  return `<${componentName} />`
}

/**
 * Generate code for a single component (for the component tab)
 */
export function generateSingleComponentCode(component: ComponentInstance): string {
  const registry = componentRegistry.getById(component.componentRegistryId)
  if (!registry) {
    return `// Component not found in registry: ${component.componentRegistryId}`
  }

  // Get the template code
  let code = registry.code

  // Replace placeholders with actual prop values
  for (const [key, value] of Object.entries(component.props)) {
    const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g')
    const stringValue = typeof value === 'string' 
      ? value 
      : JSON.stringify(value)
    code = code.replace(placeholder, stringValue)
  }

  // Replace remaining placeholders with defaults
  for (const prop of registry.props) {
    const placeholder = new RegExp(`\\{\\{${prop.name}\\}\\}`, 'g')
    const defaultValue = prop.default !== undefined 
      ? (typeof prop.default === 'string' ? prop.default : JSON.stringify(prop.default))
      : ''
    code = code.replace(placeholder, defaultValue)
  }

  return code
}

/**
 * Generate CSS from design system
 */
export function generateStylesCode(designSystem: Record<string, unknown> | null): string {
  if (!designSystem) {
    return '/* No design system loaded */'
  }

  const cssVars: string[] = []

  // Colors
  const colors = designSystem.colors as Record<string, string> | undefined
  if (colors) {
    cssVars.push('/* Colors */')
    for (const [name, value] of Object.entries(colors)) {
      cssVars.push(`--${name}: ${value};`)
    }
  }

  // Spacing
  const spacing = designSystem.spacing as Record<string, string> | undefined
  if (spacing) {
    cssVars.push('\n/* Spacing */')
    for (const [name, value] of Object.entries(spacing)) {
      cssVars.push(`--spacing-${name}: ${value};`)
    }
  }

  // Border Radius
  const borderRadius = designSystem.borderRadius as Record<string, string> | undefined
  if (borderRadius) {
    cssVars.push('\n/* Border Radius */')
    for (const [name, value] of Object.entries(borderRadius)) {
      cssVars.push(`--radius-${name}: ${value};`)
    }
  }

  return `:root {
  ${cssVars.join('\n  ')}
}

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: var(--background);
  color: var(--foreground);
}`
}

// Helpers

function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

function escapeString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
}
