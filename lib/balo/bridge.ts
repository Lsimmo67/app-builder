import type { DesignSystem, ColorTokens, TypographyTokens, BorderRadiusTokens, SpacingTokens, ShadowTokens } from '@/types'

export interface BaloExport {
  project: {
    name: string
    description?: string
  }
  brand: {
    colors: {
      primary: string
      secondary: string
      accent: string
      background: string
      foreground: string
      muted: string
      border: string
      destructive?: string
      success?: string
      warning?: string
    }
    typography: {
      headingFont: string
      bodyFont: string
      monoFont?: string
      scale?: Record<string, string>
    }
    spacing?: {
      unit?: number
      scale?: number[]
    }
    borderRadius?: {
      sm?: string
      md?: string
      lg?: string
      xl?: string
    }
    shadows?: {
      sm?: string
      md?: string
      lg?: string
      xl?: string
    }
  }
  directions?: {
    tone?: string
    style?: string
    personality?: string[]
  }
}

export interface BaloParseResult {
  isValid: boolean
  errors: string[]
  data: BaloExport | null
}

export function parseBaloJson(jsonString: string): BaloParseResult {
  const errors: string[] = []

  try {
    const data = JSON.parse(jsonString)

    if (!data.project?.name) {
      errors.push('Missing project.name')
    }
    if (!data.brand?.colors) {
      errors.push('Missing brand.colors')
    }
    if (!data.brand?.typography?.headingFont) {
      errors.push('Missing brand.typography.headingFont')
    }
    if (!data.brand?.typography?.bodyFont) {
      errors.push('Missing brand.typography.bodyFont')
    }

    if (errors.length > 0) {
      return { isValid: false, errors, data: null }
    }

    return { isValid: true, errors: [], data: data as BaloExport }
  } catch (e) {
    return {
      isValid: false,
      errors: [`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`],
      data: null,
    }
  }
}

function generateContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

function lighten(hex: string, amount: number): string {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + Math.round(255 * amount))
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + Math.round(255 * amount))
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + Math.round(255 * amount))
  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')
}

export function baloToDesignSystem(balo: BaloExport, projectId: string): DesignSystem {
  const { colors: bc, typography: bt, spacing: bs, borderRadius: br, shadows: bsh } = balo.brand

  const colors: ColorTokens = {
    primary: bc.primary,
    primaryForeground: generateContrastColor(bc.primary),
    secondary: bc.secondary,
    secondaryForeground: generateContrastColor(bc.secondary),
    accent: bc.accent,
    accentForeground: generateContrastColor(bc.accent),
    background: bc.background,
    foreground: bc.foreground,
    muted: bc.muted || lighten(bc.background, 0.05),
    mutedForeground: lighten(bc.foreground, 0.3),
    border: bc.border,
    destructive: bc.destructive || '#ef4444',
    destructiveForeground: '#ffffff',
    success: bc.success || '#22c55e',
    warning: bc.warning || '#f59e0b',
  }

  const typography: TypographyTokens = {
    fontFamily: {
      heading: bt.headingFont,
      body: bt.bodyFont,
      mono: bt.monoFont || 'JetBrains Mono',
    },
    fontSize: bt.scale ? {
      xs: bt.scale.xs || '0.75rem',
      sm: bt.scale.sm || '0.875rem',
      base: bt.scale.base || '1rem',
      lg: bt.scale.lg || '1.125rem',
      xl: bt.scale.xl || '1.25rem',
      '2xl': bt.scale['2xl'] || '1.5rem',
      '3xl': bt.scale['3xl'] || '1.875rem',
      '4xl': bt.scale['4xl'] || '2.25rem',
      '5xl': bt.scale['5xl'] || '3rem',
    } : {
      xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem',
      xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem',
    },
    fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
    lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' },
  }

  const spacing: SpacingTokens = {
    unit: bs?.unit || 4,
    scale: bs?.scale || [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128],
  }

  const borderRadius: BorderRadiusTokens = {
    none: '0',
    sm: br?.sm || '0.25rem',
    md: br?.md || '0.375rem',
    lg: br?.lg || '0.5rem',
    xl: br?.xl || '0.75rem',
    full: '9999px',
  }

  const shadows: ShadowTokens | undefined = bsh ? {
    sm: bsh.sm || '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: bsh.md || '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: bsh.lg || '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: bsh.xl || '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  } : undefined

  return {
    id: crypto.randomUUID(),
    projectId,
    colors,
    typography,
    spacing,
    borderRadius,
    ...(shadows ? { shadows } : {}),
  }
}
