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
  DialogFooter,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { parseBaloJson, baloToDesignSystem } from '@/lib/balo'
import type { BaloExport } from '@/lib/balo'
import { db } from '@/lib/db'
import { Upload, Check, AlertCircle, Palette } from 'lucide-react'

export function ImportBaloDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [jsonInput, setJsonInput] = useState('')
  const [parsedData, setParsedData] = useState<BaloExport | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [isCreating, setIsCreating] = useState(false)

  const handleParse = () => {
    const result = parseBaloJson(jsonInput)
    if (result.isValid && result.data) {
      setParsedData(result.data)
      setErrors([])
    } else {
      setParsedData(null)
      setErrors(result.errors)
    }
  }

  const handleCreate = async () => {
    if (!parsedData) return

    setIsCreating(true)
    try {
      const projectId = crypto.randomUUID()
      const now = new Date()

      // Create project
      await db.projects.add({
        id: projectId,
        name: parsedData.project.name,
        description: parsedData.project.description || 'Imported from BALO',
        createdAt: now,
        updatedAt: now,
        designSystemId: '',
      })

      // Create design system from BALO data
      const designSystem = baloToDesignSystem(parsedData, projectId)
      await db.designSystems.add(designSystem)

      // Update project with design system ID
      await db.projects.update(projectId, { designSystemId: designSystem.id })

      // Create default home page
      await db.pages.add({
        id: crypto.randomUUID(),
        projectId,
        name: 'Home',
        slug: 'home',
        order: 0,
        createdAt: now,
        updatedAt: now,
      })

      setOpen(false)
      setJsonInput('')
      setParsedData(null)
      router.push(`/projects/${projectId}/editor`)
    } catch (error) {
      console.error('Failed to create project from BALO:', error)
      setErrors(['Failed to create project. Please try again.'])
    } finally {
      setIsCreating(false)
    }
  }

  const handleReset = () => {
    setJsonInput('')
    setParsedData(null)
    setErrors([])
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) handleReset() }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Import BALO
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import BALO Design System</DialogTitle>
          <DialogDescription>
            Paste the JSON export from BALO to create a project with an auto-configured Design System.
          </DialogDescription>
        </DialogHeader>

        {!parsedData ? (
          <div className="space-y-4">
            <Textarea
              placeholder={'Paste your BALO JSON export here...\n\n{\n  "project": { "name": "..." },\n  "brand": {\n    "colors": { ... },\n    "typography": { ... }\n  }\n}'}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="min-h-[200px] font-mono text-xs"
            />

            {errors.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-destructive text-sm font-medium mb-1">
                  <AlertCircle className="h-4 w-4" />
                  Validation Errors
                </div>
                <ul className="text-sm text-destructive/80 list-disc list-inside">
                  {errors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleParse} disabled={!jsonInput.trim()}>
                Parse & Preview
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Project Info */}
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium mb-1">{parsedData.project.name}</h4>
              {parsedData.project.description && (
                <p className="text-sm text-muted-foreground">{parsedData.project.description}</p>
              )}
            </div>

            {/* Color Preview */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Palette className="h-4 w-4" />
                <span className="text-sm font-medium">Colors</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(parsedData.brand.colors).map(([name, color]) => (
                  <div key={name} className="flex items-center gap-1.5">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Preview */}
            <div>
              <span className="text-sm font-medium">Typography</span>
              <div className="flex gap-4 mt-1">
                <div className="text-sm">
                  <span className="text-muted-foreground">Heading:</span>{' '}
                  <strong>{parsedData.brand.typography.headingFont}</strong>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Body:</span>{' '}
                  <strong>{parsedData.brand.typography.bodyFont}</strong>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleReset}>Back</Button>
              <Button onClick={handleCreate} disabled={isCreating}>
                {isCreating ? 'Creating...' : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Create Project
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
