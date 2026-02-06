'use client'

import { useState } from 'react'
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
import { parseContentJson, mapContentToComponents } from '@/lib/content-pipeline'
import type { ContentJson } from '@/lib/content-pipeline'
import { useCanvasStore } from '@/lib/store'
import { FileText, AlertCircle, Check } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function ImportContentDialog() {
  const [open, setOpen] = useState(false)
  const [jsonInput, setJsonInput] = useState('')
  const [parsedContent, setParsedContent] = useState<ContentJson | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [applied, setApplied] = useState(false)

  const components = useCanvasStore((state) => state.components)
  const updateComponent = useCanvasStore((state) => state.updateComponent)

  const handleParse = () => {
    const result = parseContentJson(jsonInput)
    if (result.data) {
      setParsedContent(result.data)
      setErrors([])
    } else {
      setParsedContent(null)
      setErrors(result.errors)
    }
  }

  const handleApply = async () => {
    if (!parsedContent) return

    const updated = mapContentToComponents(parsedContent, components)
    // Update each component's props individually
    for (const comp of updated) {
      const original = components.find(c => c.id === comp.id)
      if (original && JSON.stringify(original.props) !== JSON.stringify(comp.props)) {
        await updateComponent(comp.id, { props: comp.props })
      }
    }
    setApplied(true)
    setTimeout(() => {
      setOpen(false)
      setApplied(false)
      setJsonInput('')
      setParsedContent(null)
    }, 1500)
  }

  const handleReset = () => {
    setJsonInput('')
    setParsedContent(null)
    setErrors([])
    setApplied(false)
  }

  const sectionCount = parsedContent
    ? Object.keys(parsedContent).filter(k => k !== 'meta' && parsedContent[k]).length
    : 0

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) handleReset() }}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FileText className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Import Content</TooltipContent>
      </Tooltip>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import Content</DialogTitle>
          <DialogDescription>
            Paste a content.json to fill all sections with your text, pricing, testimonials, and FAQ.
          </DialogDescription>
        </DialogHeader>

        {!parsedContent ? (
          <div className="space-y-4">
            <Textarea
              placeholder={'Paste your content.json here...\n\n{\n  "hero": { "headline": "..." },\n  "features": { ... },\n  "pricing": { ... }\n}'}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="min-h-[200px] font-mono text-xs"
            />

            {errors.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-destructive text-sm font-medium mb-1">
                  <AlertCircle className="h-4 w-4" />
                  Errors
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
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium mb-2">Content detected:</h4>
              <div className="flex flex-wrap gap-2">
                {parsedContent.hero && <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Hero</span>}
                {parsedContent.features && <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Features</span>}
                {parsedContent.testimonials && <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Testimonials</span>}
                {parsedContent.pricing && <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Pricing</span>}
                {parsedContent.faq && <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">FAQ</span>}
                {parsedContent.cta && <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">CTA</span>}
                {parsedContent.footer && <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Footer</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {sectionCount} sections will be mapped to {components.length} components
              </p>
            </div>

            {parsedContent.hero && (
              <div className="text-sm">
                <span className="text-muted-foreground">Hero:</span>{' '}
                <strong>{parsedContent.hero.headline}</strong>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={handleReset}>Back</Button>
              <Button onClick={handleApply} disabled={applied}>
                {applied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Applied!
                  </>
                ) : (
                  'Apply Content'
                )}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
