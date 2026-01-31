import type { DesignSystem } from '@/types'

export interface DesignSystemPreset {
  id: string
  name: string
  description: string
  preview: string
  tokens: Omit<DesignSystem, 'id' | 'projectId' | 'presetId'>
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
        secondary: '#71717a',
        accent: '#3b82f6',
        background: '#ffffff',
        foreground: '#09090b',
        muted: '#f4f4f5',
        mutedForeground: '#71717a',
        border: '#e4e4e7',
        destructive: '#ef4444',
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
        secondary: '#a1a1aa',
        accent: '#8b5cf6',
        background: '#09090b',
        foreground: '#fafafa',
        muted: '#27272a',
        mutedForeground: '#a1a1aa',
        border: '#3f3f46',
        destructive: '#ef4444',
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
        secondary: '#525252',
        accent: '#f97316',
        background: '#fafaf9',
        foreground: '#0c0a09',
        muted: '#f5f5f4',
        mutedForeground: '#78716c',
        border: '#e7e5e4',
        destructive: '#dc2626',
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
        secondary: '#8b5cf6',
        accent: '#ec4899',
        background: '#fefefe',
        foreground: '#1e1b4b',
        muted: '#f1f5f9',
        mutedForeground: '#64748b',
        border: '#e2e8f0',
        destructive: '#f43f5e',
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
        secondary: '#475569',
        accent: '#0891b2',
        background: '#ffffff',
        foreground: '#0f172a',
        muted: '#f8fafc',
        mutedForeground: '#64748b',
        border: '#e2e8f0',
        destructive: '#dc2626',
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
    },
  },
]

export function getPreset(id: string): DesignSystemPreset | undefined {
  return presets.find(p => p.id === id)
}

export function getDefaultPreset(): DesignSystemPreset {
  return presets[0]
}
