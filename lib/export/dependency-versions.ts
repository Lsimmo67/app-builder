/**
 * Centralized dependency version map for exports.
 * Used by ExportEngine to avoid 'latest' versions.
 */
export const DEPENDENCY_VERSIONS: Record<string, string> = {
  // Core
  react: '^19.0.0',
  'react-dom': '^19.0.0',
  next: '^15.2.0',

  // Styling utilities
  clsx: '^2.1.0',
  'tailwind-merge': '^3.0.0',
  'class-variance-authority': '^0.7.0',

  // Icons
  'lucide-react': '^0.400.0',

  // Radix UI primitives
  '@radix-ui/react-slot': '^1.1.0',
  '@radix-ui/react-dialog': '^1.1.0',
  '@radix-ui/react-tabs': '^1.1.0',
  '@radix-ui/react-accordion': '^1.2.0',
  '@radix-ui/react-avatar': '^1.1.0',
  '@radix-ui/react-label': '^2.1.0',
  '@radix-ui/react-separator': '^1.1.0',
  '@radix-ui/react-navigation-menu': '^1.2.0',
  '@radix-ui/react-tooltip': '^1.1.0',
  '@radix-ui/react-context-menu': '^2.2.0',
  '@radix-ui/react-select': '^2.1.0',
  '@radix-ui/react-switch': '^1.1.0',
  '@radix-ui/react-popover': '^1.1.0',

  // Animation
  'framer-motion': '^12.0.0',
  gsap: '^3.12.0',
  '@gsap/react': '^2.1.0',
  'split-type': '^0.3.0',

  // Utilities
  'react-use-measure': '^2.1.0',

  // Particles
  '@tsparticles/react': '^3.0.0',
  '@tsparticles/slim': '^3.0.0',
  tsparticles: '^3.0.0',

  // Dev dependencies
  typescript: '^5.0.0',
  '@types/react': '^19.0.0',
  '@types/react-dom': '^19.0.0',
  '@types/node': '^22.0.0',
  tailwindcss: '^4.0.0',
  '@tailwindcss/postcss': '^4.0.0',
  postcss: '^8.4.0',
  eslint: '^9.0.0',
  'eslint-config-next': '^15.2.0',
}

export function getVersionForDep(dep: string): string {
  return DEPENDENCY_VERSIONS[dep] || '^1.0.0'
}
