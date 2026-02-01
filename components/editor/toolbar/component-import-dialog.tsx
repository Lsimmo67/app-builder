'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Upload,
  Check,
  AlertCircle,
  Code,
  FileCode,
  Loader2,
} from 'lucide-react'
import { nanoid } from 'nanoid'
import { useProjectStore, useCanvasStore } from '@/lib/store'
import type { ComponentInstance, ComponentSource } from '@/types'

interface ImportState {
  step: 'input' | 'preview' | 'done'
  name: string
  source: ComponentSource
  html: string
  css: string
  js: string
  error: string | null
}

const initialState: ImportState = {
  step: 'input',
  name: '',
  source: 'shadcn',
  html: '',
  css: '',
  js: '',
  error: null,
}

function generateComponentId(name: string, source: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${source}-custom-${slug}`
}

export function ComponentImportDialog() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<ImportState>({ ...initialState })
  const [isImporting, setIsImporting] = useState(false)
  const { currentPage } = useProjectStore()
  const { addComponent } = useCanvasStore()

  const handleReset = useCallback(() => {
    setState({ ...initialState })
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setTimeout(handleReset, 300)
  }, [handleReset])

  const handlePreview = useCallback(() => {
    if (!state.name.trim()) {
      setState((s) => ({ ...s, error: 'Component name is required' }))
      return
    }
    if (!state.html.trim() && !state.css.trim() && !state.js.trim()) {
      setState((s) => ({ ...s, error: 'At least one code section (HTML, CSS, or JS) is required' }))
      return
    }
    setState((s) => ({ ...s, step: 'preview', error: null }))
  }, [state.name, state.html, state.css, state.js])

  const handleImport = useCallback(async () => {
    if (!currentPage) {
      setState((s) => ({ ...s, error: 'No page selected' }))
      return
    }

    setIsImporting(true)
    try {
      // Build the custom component HTML that will be rendered via dangerouslySetInnerHTML
      const componentHtml = buildComponentHtml(state.html, state.css, state.js)
      const componentId = generateComponentId(state.name, state.source)

      const newInstance: ComponentInstance = {
        id: nanoid(),
        pageId: currentPage.id,
        parentId: undefined,
        componentRegistryId: 'custom-html-block',
        source: state.source,
        order: 0,
        props: {
          componentName: state.name,
          htmlContent: componentHtml,
          rawHtml: state.html,
          rawCss: state.css,
          rawJs: state.js,
          sourceLibrary: state.source,
        },
        customCode: undefined,
        customStyles: undefined,
        isLocked: false,
        isHidden: false,
      }

      await addComponent(newInstance)

      setState((s) => ({ ...s, step: 'done' }))
      setTimeout(handleClose, 1500)
    } catch (error) {
      setState((s) => ({
        ...s,
        error: `Import failed: ${(error as Error).message}`,
      }))
    } finally {
      setIsImporting(false)
    }
  }, [currentPage, state, addComponent, handleClose])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1.5">
              <Upload className="h-3.5 w-3.5" />
              <span className="text-xs hidden sm:inline">Import</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Import Component</TooltipContent>
      </Tooltip>

      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCode className="h-5 w-5" />
            Import Component
          </DialogTitle>
          <DialogDescription>
            Paste HTML, CSS, and JavaScript code to add a custom component to your page.
          </DialogDescription>
        </DialogHeader>

        {state.step === 'done' ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold">Component Imported!</h3>
            <p className="text-muted-foreground text-sm mt-1">
              &quot;{state.name}&quot; has been added to your page.
            </p>
          </div>
        ) : state.step === 'preview' ? (
          <div className="flex-1 min-h-0 space-y-4">
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{state.name}</h4>
                <Badge variant={state.source as any}>{state.source}</Badge>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                {state.html && <span>HTML: {state.html.length} chars</span>}
                {state.css && <span>CSS: {state.css.length} chars</span>}
                {state.js && <span>JS: {state.js.length} chars</span>}
              </div>
            </div>

            {/* Live preview */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-3 py-1.5 text-xs text-muted-foreground border-b">
                Preview
              </div>
              <div className="p-4 bg-background min-h-[200px]">
                <iframe
                  srcDoc={buildPreviewHtml(state.html, state.css, state.js)}
                  className="w-full min-h-[200px] border-0"
                  sandbox="allow-scripts"
                  title="Component Preview"
                />
              </div>
            </div>

            {state.error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                {state.error}
              </div>
            )}
          </div>
        ) : (
          <ScrollArea className="flex-1 min-h-0">
            <div className="space-y-4 pr-4">
              {/* Component metadata */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Component Name *</Label>
                  <Input
                    value={state.name}
                    onChange={(e) =>
                      setState((s) => ({ ...s, name: e.target.value, error: null }))
                    }
                    placeholder="My Custom Hero"
                    className="h-8"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Source Library</Label>
                  <Select
                    value={state.source}
                    onValueChange={(val) =>
                      setState((s) => ({ ...s, source: val as ComponentSource }))
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shadcn">ShadCN UI</SelectItem>
                      <SelectItem value="aceternity">Aceternity UI</SelectItem>
                      <SelectItem value="osmo">Osmo Supply</SelectItem>
                      <SelectItem value="skiper">Skiper UI</SelectItem>
                      <SelectItem value="gsap">GSAP Effects</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Code input tabs */}
              <Tabs defaultValue="html">
                <TabsList className="w-full">
                  <TabsTrigger value="html" className="flex-1 text-xs">
                    <Code className="h-3 w-3 mr-1" />
                    HTML
                    {state.html && <Badge variant="secondary" className="ml-1 text-[9px] px-1 h-4">1</Badge>}
                  </TabsTrigger>
                  <TabsTrigger value="css" className="flex-1 text-xs">
                    CSS
                    {state.css && <Badge variant="secondary" className="ml-1 text-[9px] px-1 h-4">1</Badge>}
                  </TabsTrigger>
                  <TabsTrigger value="js" className="flex-1 text-xs">
                    JavaScript
                    {state.js && <Badge variant="secondary" className="ml-1 text-[9px] px-1 h-4">1</Badge>}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="html">
                  <Textarea
                    value={state.html}
                    onChange={(e) =>
                      setState((s) => ({ ...s, html: e.target.value, error: null }))
                    }
                    placeholder={`<div class="hero-section">
  <h1>Welcome</h1>
  <p>Your hero content here</p>
</div>`}
                    className="min-h-[250px] font-mono text-sm resize-y"
                  />
                </TabsContent>

                <TabsContent value="css">
                  <Textarea
                    value={state.css}
                    onChange={(e) =>
                      setState((s) => ({ ...s, css: e.target.value, error: null }))
                    }
                    placeholder={`.hero-section {
  padding: 4rem 2rem;
  text-align: center;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: bold;
}`}
                    className="min-h-[250px] font-mono text-sm resize-y"
                  />
                </TabsContent>

                <TabsContent value="js">
                  <Textarea
                    value={state.js}
                    onChange={(e) =>
                      setState((s) => ({ ...s, js: e.target.value, error: null }))
                    }
                    placeholder={`// Optional JavaScript
document.querySelector('.hero-section').addEventListener('click', () => {
  console.log('clicked')
})`}
                    className="min-h-[250px] font-mono text-sm resize-y"
                  />
                </TabsContent>
              </Tabs>

              {state.error && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {state.error}
                </div>
              )}
            </div>
          </ScrollArea>
        )}

        {state.step !== 'done' && (
          <DialogFooter>
            {state.step === 'preview' ? (
              <>
                <Button variant="outline" onClick={() => setState((s) => ({ ...s, step: 'input' }))}>
                  Back
                </Button>
                <Button onClick={handleImport} disabled={isImporting}>
                  {isImporting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Add to Page
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handlePreview}>
                  Preview & Import
                </Button>
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

function buildComponentHtml(html: string, css: string, js: string): string {
  let result = ''
  if (css) {
    result += `<style>${css}</style>`
  }
  if (html) {
    result += html
  }
  if (js) {
    result += `<script>${js}</script>`
  }
  return result
}

function buildPreviewHtml(html: string, css: string, js: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; }
    ${css}
  </style>
</head>
<body>
  ${html}
  ${js ? `<script>${js}</script>` : ''}
</body>
</html>`
}
