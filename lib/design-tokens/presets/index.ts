import type { DesignSystem } from '@/types'

export interface DesignSystemPreset {
  id: string
  name: string
  description: string
  preview: string
  tokens: Omit<DesignSystem, 'id' | 'projectId' | 'presetId'>
}

const DEFAULT_SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
}

export const presets: DesignSystemPreset[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple with neutral colors',
    preview: '/presets/minimal.png',
    tokens: {
      colors: {
        primary: '#18181b',
        primaryForeground: '#ffffff',
        secondary: '#71717a',
        secondaryForeground: '#ffffff',
        accent: '#3b82f6',
        accentForeground: '#ffffff',
        background: '#ffffff',
        foreground: '#09090b',
        muted: '#f4f4f5',
        mutedForeground: '#71717a',
        border: '#e4e4e7',
        destructive: '#ef4444',
        destructiveForeground: '#ffffff',
        success: '#22c55e',
        warning: '#eab308',
      },
      typography: {
        fontFamily: {
          heading: 'Inter',
          body: 'Inter',
          mono: 'JetBrains Mono',
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem',
          '5xl': '3rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
        lineHeight: {
          tight: '1.25',
          normal: '1.5',
          relaxed: '1.75',
        },
      },
      spacing: {
        unit: 4,
        scale: [4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      shadows: DEFAULT_SHADOWS,
    },
  },
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    description: 'Sleek dark theme with vibrant accents',
    preview: '/presets/modern-dark.png',
    tokens: {
      colors: {
        primary: '#ffffff',
        primaryForeground: '#09090b',
        secondary: '#a1a1aa',
        secondaryForeground: '#09090b',
        accent: '#8b5cf6',
        accentForeground: '#ffffff',
        background: '#09090b',
        foreground: '#fafafa',
        muted: '#27272a',
        mutedForeground: '#a1a1aa',
        border: '#3f3f46',
        destructive: '#ef4444',
        destructiveForeground: '#ffffff',
        success: '#22c55e',
        warning: '#eab308',
      },
      typography: {
        fontFamily: {
          heading: 'Geist',
          body: 'Geist',
          mono: 'Geist Mono',
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem',
          '5xl': '3rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
        lineHeight: {
          tight: '1.25',
          normal: '1.5',
          relaxed: '1.75',
        },
      },
      spacing: {
        unit: 4,
        scale: [4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
      },
      borderRadius: {
        none: '0',
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.6)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.3)',
      },
    },
  },
  {
    id: 'bold',
    name: 'Bold & Vibrant',
    description: 'High contrast with bold typography',
    preview: '/presets/bold.png',
    tokens: {
      colors: {
        primary: '#000000',
        primaryForeground: '#ffffff',
        secondary: '#525252',
        secondaryForeground: '#ffffff',
        accent: '#f97316',
        accentForeground: '#ffffff',
        background: '#fafaf9',
        foreground: '#0c0a09',
        muted: '#f5f5f4',
        mutedForeground: '#78716c',
        border: '#e7e5e4',
        destructive: '#dc2626',
        destructiveForeground: '#ffffff',
        success: '#16a34a',
        warning: '#ca8a04',
      },
      typography: {
        fontFamily: {
          heading: 'Space Grotesk',
          body: 'DM Sans',
          mono: 'Fira Code',
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '2rem',
          '4xl': '2.5rem',
          '5xl': '3.5rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 800,
        },
        lineHeight: {
          tight: '1.1',
          normal: '1.5',
          relaxed: '1.75',
        },
      },
      spacing: {
        unit: 4,
        scale: [4, 8, 16, 24, 32, 48, 64, 80, 120, 160],
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.375rem',
        xl: '0.5rem',
        full: '9999px',
      },
      shadows: DEFAULT_SHADOWS,
    },
  },
  {
    id: 'soft',
    name: 'Soft & Rounded',
    description: 'Friendly design with soft colors and large radii',
    preview: '/presets/soft.png',
    tokens: {
      colors: {
        primary: '#6366f1',
        primaryForeground: '#ffffff',
        secondary: '#8b5cf6',
        secondaryForeground: '#ffffff',
        accent: '#ec4899',
        accentForeground: '#ffffff',
        background: '#fefefe',
        foreground: '#1e1b4b',
        muted: '#f1f5f9',
        mutedForeground: '#64748b',
        border: '#e2e8f0',
        destructive: '#f43f5e',
        destructiveForeground: '#ffffff',
        success: '#10b981',
        warning: '#f59e0b',
      },
      typography: {
        fontFamily: {
          heading: 'Nunito',
          body: 'Nunito',
          mono: 'JetBrains Mono',
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem',
          '5xl': '3rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
        lineHeight: {
          tight: '1.3',
          normal: '1.6',
          relaxed: '1.8',
        },
      },
      spacing: {
        unit: 4,
        scale: [4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
      },
      borderRadius: {
        none: '0',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      shadows: {
        sm: '0 1px 3px 0 rgb(99 102 241 / 0.06)',
        md: '0 4px 6px -1px rgb(99 102 241 / 0.08), 0 2px 4px -2px rgb(99 102 241 / 0.06)',
        lg: '0 10px 15px -3px rgb(99 102 241 / 0.08), 0 4px 6px -4px rgb(99 102 241 / 0.06)',
        xl: '0 20px 25px -5px rgb(99 102 241 / 0.1), 0 8px 10px -6px rgb(99 102 241 / 0.06)',
        '2xl': '0 25px 50px -12px rgb(99 102 241 / 0.2)',
        inner: 'inset 0 2px 4px 0 rgb(99 102 241 / 0.05)',
      },
    },
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional and trustworthy design',
    preview: '/presets/corporate.png',
    tokens: {
      colors: {
        primary: '#1e40af',
        primaryForeground: '#ffffff',
        secondary: '#475569',
        secondaryForeground: '#ffffff',
        accent: '#0891b2',
        accentForeground: '#ffffff',
        background: '#ffffff',
        foreground: '#0f172a',
        muted: '#f8fafc',
        mutedForeground: '#64748b',
        border: '#e2e8f0',
        destructive: '#dc2626',
        destructiveForeground: '#ffffff',
        success: '#059669',
        warning: '#d97706',
      },
      typography: {
        fontFamily: {
          heading: 'Plus Jakarta Sans',
          body: 'Plus Jakarta Sans',
          mono: 'IBM Plex Mono',
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem',
          '5xl': '3rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
        lineHeight: {
          tight: '1.25',
          normal: '1.5',
          relaxed: '1.75',
        },
      },
      spacing: {
        unit: 4,
        scale: [4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      shadows: DEFAULT_SHADOWS,
    },
  },
]

export function getPreset(id: string): DesignSystemPreset | undefined {
  return presets.find(p => p.id === id)
}

export function getDefaultPreset(): DesignSystemPreset {
  return presets[0]
}
