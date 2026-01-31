'use client'

import { useState, useCallback, useMemo } from 'react'
import { nanoid } from 'nanoid'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  parseRelumeInput,
  generateSampleTextFormat,
  generateSampleJsonFormat,
  ParsedSection,
  findAlternatives,
} from '@/lib/relume'
import { componentRegistry } from '@/lib/components-registry'
import { useCanvasStore, useProjectStore } from '@/lib/store'
import { ComponentInstance, SOURCE_COLORS, SOURCE_LABELS } from '@/types/component'
import {
  Upload,
  FileJson,
  FileText,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Loader2,
  Info,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface RelumeImportDialogProps {
  trigger?: React.ReactNode
}

export function RelumeImportDialog({ trigger }: RelumeImportDialogProps) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [activeTab, setActiveTab] = useState<'paste' | 'upload'>('paste')
  const [parsedSections, setParsedSections] = useState<ParsedSection[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [warnings, setWarnings] = useState<string[]>([])
  const [isParsing, setIsParsing] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [step, setStep] = useState<'input' | 'preview'>('input')

  const currentPage = useProjectStore((state) => state.currentPage)
  const { addComponent } = useCanvasStore()

  // Parse input
  const handleParse = useCallback(() => {
    setIsParsing(true)
    setErrors([])
    setWarnings([])

    // Small delay to show loading state
    setTimeout(() => {
      const result = parseRelumeInput(input)
      setParsedSections(result.sections)
      setErrors(result.errors)
      setWarnings(result.warnings)
      setIsParsing(false)

      if (result.success && result.sections.length > 0) {
        setStep('preview')
      }
    }, 300)
  }, [input])

  // Change component mapping for a section
  const handleChangeMapping = useCallback(
    (sectionId: string, newRegistryId: string) => {
      setParsedSections((prev) =>
        prev.map((section) => {
          if (section.id !== sectionId) return section

          const registryItem = componentRegistry.getById(newRegistryId)
          if (!registryItem) return section

          return {
            ...section,
            suggestedComponent: {
              registryId: newRegistryId,
              source: registryItem.source,
              displayName: registryItem.displayName,
            },
          }
        })
      )
    },
    []
  )

  // Import sections to canvas
  const handleImport = useCallback(async () => {
    if (!currentPage) return

    setIsImporting(true)

    try {
      for (const section of parsedSections) {
        const registryItem = componentRegistry.getById(
          section.suggestedComponent.registryId
        )
        if (!registryItem) continue

        const component: Omit<ComponentInstance, 'id' | 'order'> = {
          pageId: currentPage.id,
          componentRegistryId: section.suggestedComponent.registryId,
          source: section.suggestedComponent.source,
          props: section.mappedProps,
          isLocked: false,
          isHidden: false,
        }

        await addComponent(component)
      }

      // Reset and close
      setOpen(false)
      setInput('')
      setParsedSections([])
      setStep('input')
    } catch (error) {
      setErrors([(error as Error).message])
    } finally {
      setIsImporting(false)
    }
  }, [parsedSections, currentPage, addComponent])

  // Load sample
  const handleLoadSample = useCallback((format: 'text' | 'json') => {
    setInput(format === 'text' ? generateSampleTextFormat() : generateSampleJsonFormat())
  }, [])

  // Handle file upload
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        setInput(content)
        setActiveTab('paste')
      }
      reader.readAsText(file)
    },
    []
  )

  // Reset dialog
  const handleReset = useCallback(() => {
    setInput('')
    setParsedSections([])
    setErrors([])
    setWarnings([])
    setStep('input')
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Relume
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Import from Relume</DialogTitle>
          <DialogDescription>
            Import wireframes from Relume and convert them to components
          </DialogDescription>
        </DialogHeader>

        {step === 'input' ? (
          <>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="paste">
                  <FileText className="h-4 w-4 mr-2" />
                  Paste Content
                </TabsTrigger>
                <TabsTrigger value="upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </TabsTrigger>
              </TabsList>

              <TabsContent value="paste" className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Load sample:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLoadSample('text')}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Text Format
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLoadSample('json')}
                  >
                    <FileJson className="h-3 w-3 mr-1" />
                    JSON Format
                  </Button>
                </div>

                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your Relume export here (JSON or text format)..."
                  className="min-h-[300px] font-mono text-sm"
                />
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept=".json,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="relume-file-upload"
                  />
                  <label
                    htmlFor="relume-file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-sm font-medium">Click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports .json and .txt files
                    </p>
                  </label>
                </div>
              </TabsContent>
            </Tabs>

            {/* Errors */}
            {errors.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                <div className="flex items-center gap-2 text-destructive text-sm font-medium">
                  <AlertCircle className="h-4 w-4" />
                  Errors
                </div>
                <ul className="mt-2 text-sm text-destructive/80 list-disc list-inside">
                  {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Format info */}
            <div className="bg-muted/50 rounded-md p-3 text-sm">
              <div className="flex items-center gap-2 font-medium mb-2">
                <Info className="h-4 w-4" />
                Supported Formats
              </div>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>
                  <strong>Text:</strong> [Section Type - Variant] followed by Property: Value
                </li>
                <li>
                  <strong>JSON:</strong> {`{ sections: [{ type, variant, content }] }`}
                </li>
              </ul>
            </div>
          </>
        ) : (
          // Preview step
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">
                  {parsedSections.length} sections detected
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Start Over
              </Button>
            </div>

            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-3 mb-4">
                <div className="flex items-center gap-2 text-yellow-600 text-sm font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  Warnings
                </div>
                <ul className="mt-2 text-sm text-yellow-600/80 list-disc list-inside">
                  {warnings.map((warning, i) => (
                    <li key={i}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sections preview */}
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-3">
                {parsedSections.map((section, index) => (
                  <SectionPreviewCard
                    key={section.id}
                    section={section}
                    index={index}
                    onChangeMapping={handleChangeMapping}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        <DialogFooter>
          {step === 'input' ? (
            <Button
              onClick={handleParse}
              disabled={!input.trim() || isParsing}
            >
              {isParsing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Parsing...
                </>
              ) : (
                <>
                  Parse & Preview
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => setStep('input')}>
                Back
              </Button>
              <Button
                onClick={handleImport}
                disabled={isImporting || parsedSections.length === 0}
              >
                {isImporting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    Import {parsedSections.length} Sections
                  </>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Section preview card component
interface SectionPreviewCardProps {
  section: ParsedSection
  index: number
  onChangeMapping: (sectionId: string, newRegistryId: string) => void
}

function SectionPreviewCard({ section, index, onChangeMapping }: SectionPreviewCardProps) {
  const sourceColor = SOURCE_COLORS[section.suggestedComponent.source]

  // Get all possible components for this type
  const allOptions = useMemo(() => {
    const alternatives = findAlternatives(section.relumeType)
    const allComponents = [
      section.suggestedComponent,
      ...section.alternativeComponents,
      ...alternatives.map((alt) => {
        const item = componentRegistry.getById(alt.registryId)
        return {
          registryId: alt.registryId,
          source: alt.source,
          displayName: item?.displayName || alt.registryId,
        }
      }),
    ]

    // Remove duplicates
    const seen = new Set<string>()
    return allComponents.filter((c) => {
      if (seen.has(c.registryId)) return false
      seen.add(c.registryId)
      return true
    })
  }, [section])

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {index + 1}
          </Badge>
          <span className="font-medium capitalize">{section.relumeType}</span>
          {section.relumeVariant && (
            <Badge variant="secondary" className="text-xs">
              {section.relumeVariant}
            </Badge>
          )}
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Maps to:</span>
        <Select
          value={section.suggestedComponent.registryId}
          onValueChange={(value) => onChangeMapping(section.id, value)}
        >
          <SelectTrigger className="w-[280px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {allOptions.map((option) => (
              <SelectItem key={option.registryId} value={option.registryId}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: SOURCE_COLORS[option.source] }}
                  />
                  <span>{option.displayName}</span>
                  <Badge variant="outline" className="text-[10px] ml-1">
                    {SOURCE_LABELS[option.source]}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Props preview */}
      {Object.keys(section.mappedProps).length > 0 && (
        <div className="text-xs text-muted-foreground bg-muted/50 rounded p-2">
          <span className="font-medium">Mapped props: </span>
          {Object.keys(section.mappedProps).slice(0, 4).join(', ')}
          {Object.keys(section.mappedProps).length > 4 && (
            <span> +{Object.keys(section.mappedProps).length - 4} more</span>
          )}
        </div>
      )}
    </div>
  )
}
