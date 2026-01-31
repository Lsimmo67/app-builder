export interface Project {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
  designSystemId: string
  thumbnail?: string
}

export interface ProjectWithDetails extends Project {
  designSystem: DesignSystem
  pages: Page[]
  stackRecommendations: StackRecommendation[]
}

export interface DesignSystem {
  id: string
  projectId: string
  presetId?: string
  colors: ColorTokens
  typography: TypographyTokens
  spacing: SpacingTokens
  borderRadius: BorderRadiusTokens
}

export interface ColorTokens {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  mutedForeground: string
  border: string
  destructive: string
  success: string
  warning: string
  [key: string]: string
}

export interface TypographyTokens {
  fontFamily: {
    heading: string
    body: string
    mono: string
  }
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
    '5xl': string
  }
  fontWeight: {
    normal: number
    medium: number
    semibold: number
    bold: number
  }
  lineHeight: {
    tight: string
    normal: string
    relaxed: string
  }
}

export interface SpacingTokens {
  unit: number
  scale: number[]
}

export interface BorderRadiusTokens {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  full: string
}

export interface Page {
  id: string
  projectId: string
  name: string
  slug: string
  order: number
  createdAt: Date
  updatedAt: Date
  relumeImportId?: string
}

export interface StackRecommendation {
  package: string
  version: string
  reason: string
  installCommand: string
  required: boolean
}
