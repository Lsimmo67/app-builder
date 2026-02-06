'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PROJECT_TEMPLATES, type ProjectTemplate } from '@/lib/templates'
import { db } from '@/lib/db'
import { LayoutTemplate, Loader2 } from 'lucide-react'

export function TemplatePickerDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [creating, setCreating] = useState<string | null>(null)

  const handleCreate = async (template: ProjectTemplate) => {
    setCreating(template.id)
    try {
      const projectId = crypto.randomUUID()
      const now = new Date()

      await db.projects.add({
        id: projectId,
        name: `${template.name} Project`,
        description: template.description,
        createdAt: now,
        updatedAt: now,
        designSystemId: '',
      })

      // Create default design system
      const dsId = crypto.randomUUID()
      await db.designSystems.add({
        id: dsId,
        projectId,
        colors: {
          primary: '#2563eb',
          primaryForeground: '#ffffff',
          secondary: '#f1f5f9',
          secondaryForeground: '#0f172a',
          accent: '#8b5cf6',
          accentForeground: '#ffffff',
          background: '#ffffff',
          foreground: '#0f172a',
          muted: '#f1f5f9',
          mutedForeground: '#64748b',
          border: '#e2e8f0',
          destructive: '#ef4444',
          destructiveForeground: '#ffffff',
          success: '#22c55e',
          warning: '#f59e0b',
        },
        typography: {
          fontFamily: { heading: 'Inter', body: 'Inter', mono: 'JetBrains Mono' },
          fontSize: {
            xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem',
            xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem',
          },
          fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
          lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' },
        },
        spacing: { unit: 4, scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128] },
        borderRadius: { none: '0', sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', full: '9999px' },
      })

      await db.projects.update(projectId, { designSystemId: dsId })

      // Create home page
      const pageId = crypto.randomUUID()
      await db.pages.add({
        id: pageId,
        projectId,
        name: 'Home',
        slug: 'home',
        order: 0,
        createdAt: now,
        updatedAt: now,
      })

      // Add template sections as component instances
      for (const section of template.sections) {
        await db.componentInstances.add({
          id: crypto.randomUUID(),
          pageId,
          componentRegistryId: section.registryId,
          source: section.source,
          order: section.order,
          props: section.props,
          isLocked: false,
          isHidden: false,
        })
      }

      setOpen(false)
      router.push(`/projects/${projectId}/editor`)
    } catch (error) {
      console.error('Failed to create project from template:', error)
    } finally {
      setCreating(null)
    }
  }

  const categoryLabels: Record<string, string> = {
    saas: 'SaaS',
    agency: 'Agency',
    b2b: 'B2B',
    ecommerce: 'E-commerce',
    portfolio: 'Portfolio',
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <LayoutTemplate className="h-4 w-4" />
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Start from a Template</DialogTitle>
          <DialogDescription>
            Pre-assembled pages ready to customize. Import your BALO design system and content to make them yours.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {PROJECT_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors"
            >
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <LayoutTemplate className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{template.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {categoryLabels[template.category] || template.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                <p className="text-xs text-muted-foreground">
                  {template.sections.length} sections
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => handleCreate(template)}
                disabled={creating !== null}
              >
                {creating === template.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Use Template'
                )}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
