import type { ElementStyles } from '@/types'

/**
 * Convert ElementStyles to React CSSProperties for canvas rendering
 */
export function stylesToCSSProperties(styles: ElementStyles | undefined): React.CSSProperties | undefined {
  if (!styles) return undefined

  const css: Record<string, string> = {}

  for (const [key, value] of Object.entries(styles)) {
    if (value !== undefined && value !== '' && value !== null) {
      css[key] = String(value)
    }
  }

  return Object.keys(css).length > 0 ? css as unknown as React.CSSProperties : undefined
}

/**
 * Convert ElementStyles to a CSS string (for export)
 */
export function stylesToCSSString(styles: ElementStyles | undefined): string {
  if (!styles) return ''

  const entries: string[] = []
  for (const [key, value] of Object.entries(styles)) {
    if (value !== undefined && value !== '' && value !== null) {
      const kebabKey = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
      entries.push(`${kebabKey}: ${value}`)
    }
  }
  return entries.join('; ')
}

/**
 * Parse legacy CSS string to ElementStyles (backward compat)
 */
export function parseInlineStyles(css: string | undefined): React.CSSProperties | undefined {
  if (!css) return undefined
  const styles: Record<string, string> = {}
  const rules = css.split(';').filter(Boolean)
  for (const rule of rules) {
    const colonIdx = rule.indexOf(':')
    if (colonIdx === -1) continue
    const prop = rule.slice(0, colonIdx).trim()
    const val = rule.slice(colonIdx + 1).trim()
    if (!prop || !val) continue
    const camelProp = prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    styles[camelProp] = val
  }
  return Object.keys(styles).length > 0 ? styles : undefined
}

/**
 * Merge structured styles with legacy customStyles
 */
export function mergeStyles(
  elementStyles: ElementStyles | undefined,
  customStyles: string | undefined
): React.CSSProperties | undefined {
  const structured = stylesToCSSProperties(elementStyles)
  const legacy = parseInlineStyles(customStyles)

  if (!structured && !legacy) return undefined
  return { ...legacy, ...structured }
}
