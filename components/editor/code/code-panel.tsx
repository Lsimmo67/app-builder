'use client'

import { useCallback, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { useEditorStore, useCanvasStore, useDesignSystemStore, useProjectStore } from '@/lib/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { generatePageCode, generateSingleComponentCode, generateStylesCode } from './code-generator'
import { componentRegistry } from '@/lib/components-registry'
import {
  Copy,
  Check,
  Download,
  Code,
  FileCode,
  Palette,
  RefreshCw,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Dynamic import Monaco to avoid SSR issues
const Editor = dynamic(
  () => import('@monaco-editor/react').then((mod) => mod.Editor),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
        <div className="animate-pulse text-white/50">Loading editor...</div>
      </div>
    ),
  }
)

interface CodePanelProps {
  className?: string
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
}

export function CodePanel({ className, isFullscreen, onToggleFullscreen }: CodePanelProps) {
  const [activeTab, setActiveTab] = useState<'page' | 'component' | 'styles'>('page')
  const [copied, setCopied] = useState(false)

  const components = useCanvasStore((state) => state.components)
  const selectedComponentId = useEditorStore((state) => state.selectedComponentId)
  const designSystem = useDesignSystemStore((state) => state.designSystem)
  const currentPage = useProjectStore((state) => state.currentPage)

  // Selected component
  const selectedComponent = useMemo(() => {
    if (!selectedComponentId) return null
    return components.find((c) => c.id === selectedComponentId)
  }, [selectedComponentId, components])

  // Generate code based on active tab
  const code = useMemo(() => {
    switch (activeTab) {
      case 'page':
        const pageName = currentPage?.name 
          ? currentPage.name.replace(/[^a-zA-Z0-9]/g, '') + 'Page'
          : 'Page'
        return generatePageCode(components, pageName)
      case 'component':
        if (!selectedComponent) {
          return '// Select a component to view its code'
        }
        return generateSingleComponentCode(selectedComponent)
      case 'styles':
        return generateStylesCode(designSystem as Record<string, unknown> | null)
      default:
        return ''
    }
  }, [activeTab, components, selectedComponent, designSystem, currentPage])

  // Get language for Monaco
  const language = useMemo(() => {
    switch (activeTab) {
      case 'styles':
        return 'css'
      default:
        return 'typescript'
    }
  }, [activeTab])

  // Copy to clipboard
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  // Download as file
  const handleDownload = useCallback(() => {
    const extension = activeTab === 'styles' ? '.css' : '.tsx'
    const filename = activeTab === 'styles' 
      ? 'globals.css' 
      : activeTab === 'component' && selectedComponent
        ? `${componentRegistry.getById(selectedComponent.componentRegistryId)?.name || 'Component'}${extension}`
        : `${currentPage?.name || 'page'}${extension}`

    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }, [code, activeTab, selectedComponent, currentPage])

  return (
    <div className={cn('flex flex-col h-full bg-[#1e1e1e]', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-white/70" />
          <span className="text-sm font-medium text-white/90">Code View</span>
          <Badge variant="outline" className="text-[10px] border-white/20 text-white/60">
            Read-only
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-white/60 hover:text-white hover:bg-white/10"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-white/60 hover:text-white hover:bg-white/10"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
          </Button>
          {onToggleFullscreen && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white/60 hover:text-white hover:bg-white/10"
              onClick={onToggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/10">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="bg-transparent h-9 p-0 gap-0">
            <TabsTrigger
              value="page"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-white/60 data-[state=active]:text-white text-xs px-4"
            >
              <FileCode className="h-3 w-3 mr-1.5" />
              Page
            </TabsTrigger>
            <TabsTrigger
              value="component"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-white/60 data-[state=active]:text-white text-xs px-4"
              disabled={!selectedComponent}
            >
              <Code className="h-3 w-3 mr-1.5" />
              Component
              {selectedComponent && (
                <Badge variant="secondary" className="ml-1.5 h-4 text-[10px]">
                  {componentRegistry.getById(selectedComponent.componentRegistryId)?.displayName || 'Selected'}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="styles"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-white/60 data-[state=active]:text-white text-xs px-4"
            >
              <Palette className="h-3 w-3 mr-1.5" />
              Styles
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: true },
            fontSize: 13,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            padding: { top: 16 },
            renderLineHighlight: 'line',
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />
      </div>

      {/* Footer */}
      <div className="px-3 py-1.5 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40">
        <span>
          {language === 'typescript' ? 'TypeScript React' : 'CSS'} • {code.split('\n').length} lines
        </span>
        <span>
          {components.length} components on page
        </span>
      </div>
    </div>
  )
}
