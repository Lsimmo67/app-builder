'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Columns,
  Code,
  Layout,
  Undo2,
  Redo2,
  Download,
  Settings,
  Loader2,
  Check,
  Layers,
  Eye,
  Upload,
  PanelLeft,
  PanelRight,
} from 'lucide-react'
import { useEditorStore, useProjectStore } from '@/lib/store'
import { exportProject } from '@/lib/export'
import { RelumeImportDialog } from '@/components/relume'
import type { ViewMode, PreviewDevice } from '@/types'

const viewModeIcons: Record<ViewMode, typeof Layout> = {
  visual: Layout,
  split: Columns,
  code: Code,
  preview: Eye,
}

const deviceIcons: Record<PreviewDevice, typeof Monitor> = {
  desktop: Monitor,
  tablet: Tablet,
  mobile: Smartphone,
}

export function EditorToolbar() {
  const router = useRouter()
  const currentProject = useProjectStore((state) => state.currentProject)
  const { 
    viewMode, 
    setViewMode, 
    previewDevice, 
    setPreviewDevice,
    layerTreeOpen,
    setLayerTreeOpen,
    sidebarOpen,
    setSidebarOpen,
    propertiesOpen,
    setPropertiesOpen,
  } = useEditorStore()
  
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)

  const handleExport = async () => {
    if (!currentProject) return
    
    setIsExporting(true)
    setExportSuccess(false)
    
    try {
      await exportProject(currentProject.id)
      setExportSuccess(true)
      setTimeout(() => {
        setShowExportDialog(false)
        setExportSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
      <div className="h-12 border-b bg-card flex items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Back to projects</TooltipContent>
          </Tooltip>

          <div className="h-6 w-px bg-border" />

          <span className="font-medium truncate max-w-[150px]">
            {currentProject?.name || 'Untitled Project'}
          </span>

          <div className="h-6 w-px bg-border" />

          {/* Panel toggles */}
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={sidebarOpen ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <PanelLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Components Panel</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={layerTreeOpen ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setLayerTreeOpen(!layerTreeOpen)}
                >
                  <Layers className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Layer Tree</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={propertiesOpen ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPropertiesOpen(!propertiesOpen)}
                >
                  <PanelRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Properties Panel</TooltipContent>
            </Tooltip>
          </div>

          <div className="h-6 w-px bg-border" />

          {/* Relume Import */}
          <RelumeImportDialog />
        </div>

        {/* Center section - Device toggles */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {(Object.keys(deviceIcons) as PreviewDevice[]).map((device) => {
            const Icon = deviceIcons[device]
            return (
              <Tooltip key={device}>
                <TooltipTrigger asChild>
                  <Button
                    variant={previewDevice === device ? 'secondary' : 'ghost'}
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => setPreviewDevice(device)}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="capitalize">{device}</TooltipContent>
              </Tooltip>
            )
          })}
        </div>

        {/* Right section - View mode & actions */}
        <div className="flex items-center gap-2">
          {/* View mode toggles */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {(Object.keys(viewModeIcons) as ViewMode[]).map((mode) => {
              const Icon = viewModeIcons[mode]
              return (
                <Tooltip key={mode}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === mode ? 'secondary' : 'ghost'}
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => setViewMode(mode)}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="capitalize">{mode}</TooltipContent>
                </Tooltip>
              )
            })}
          </div>

          <div className="h-6 w-px bg-border" />

          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={!useEditorStore.getState().canUndo()}
                  onClick={() => useEditorStore.getState().undo()}
                >
                  <Undo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={!useEditorStore.getState().canRedo()}
                  onClick={() => useEditorStore.getState().redo()}
                >
                  <Redo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
            </Tooltip>
          </div>

          <div className="h-6 w-px bg-border" />

          {/* Export */}
          <Button size="sm" onClick={() => setShowExportDialog(true)}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Project</DialogTitle>
            <DialogDescription>
              Download your project as a complete Next.js application.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium mb-2">What's included:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Next.js 14 with App Router</li>
                <li>✓ TypeScript configuration</li>
                <li>✓ Tailwind CSS with your design system</li>
                <li>✓ All page components</li>
                <li>✓ UI components from your selection</li>
                <li>✓ Ready to deploy to Vercel</li>
              </ul>
            </div>

            {currentProject && (
              <div className="text-sm text-muted-foreground">
                Project: <strong>{currentProject.name}</strong>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport} disabled={isExporting || !currentProject}>
              {isExporting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : exportSuccess ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Downloaded!
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download ZIP
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
