'use client'

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  ImageIcon,
  Upload,
  Search,
  Trash2,
  Check,
  X,
  FileImage,
  Loader2,
  Grid,
  List,
} from 'lucide-react'
import { useMediaStore } from '@/lib/store/media-store'
import { useProjectStore } from '@/lib/store'
import type { MediaAsset } from '@/types'
import { cn } from '@/lib/utils'

interface MediaLibraryDialogProps {
  onSelect?: (asset: MediaAsset) => void
  trigger?: React.ReactNode
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function MediaLibraryDialog({ onSelect, trigger }: MediaLibraryDialogProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentProject = useProjectStore((state) => state.currentProject)
  const { assets, isLoading, loadAssets, addAsset, removeAsset } = useMediaStore()

  useEffect(() => {
    if (open && currentProject) {
      loadAssets(currentProject.id)
    }
  }, [open, currentProject, loadAssets])

  const filteredAssets = useMemo(() => {
    if (!searchQuery) return assets
    const q = searchQuery.toLowerCase()
    return assets.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.fileName.toLowerCase().includes(q) ||
        a.mimeType.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q))
    )
  }, [assets, searchQuery])

  const selectedAsset = useMemo(
    () => assets.find((a) => a.id === selectedAssetId) || null,
    [assets, selectedAssetId]
  )

  const handleFileUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || !currentProject) return
      setIsUploading(true)

      try {
        for (const file of Array.from(files)) {
          if (!file.type.startsWith('image/') && !file.type.startsWith('video/') && !file.type.match(/svg|pdf/)) {
            continue
          }
          if (file.size > 10 * 1024 * 1024) continue // 10MB limit

          const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(file)
          })

          // Get image dimensions if applicable
          let width: number | undefined
          let height: number | undefined
          if (file.type.startsWith('image/')) {
            const dims = await getImageDimensions(dataUrl)
            width = dims.width
            height = dims.height
          }

          await addAsset({
            projectId: currentProject.id,
            name: file.name.replace(/\.[^.]+$/, ''),
            fileName: file.name,
            mimeType: file.type,
            size: file.size,
            dataUrl,
            width,
            height,
          })
        }
      } finally {
        setIsUploading(false)
        if (fileInputRef.current) fileInputRef.current.value = ''
      }
    },
    [currentProject, addAsset]
  )

  const handleSelect = useCallback(() => {
    if (selectedAsset && onSelect) {
      onSelect(selectedAsset)
      setOpen(false)
    }
  }, [selectedAsset, onSelect])

  const handleDelete = useCallback(
    async (id: string) => {
      await removeAsset(id)
      if (selectedAssetId === id) setSelectedAssetId(null)
    },
    [removeAsset, selectedAssetId]
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            {trigger || (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ImageIcon className="h-4 w-4" />
              </Button>
            )}
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Media Library</TooltipContent>
      </Tooltip>

      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileImage className="h-5 w-5" />
            Media Library
          </DialogTitle>
          <DialogDescription>
            Upload and manage images for your project. Click an image to select it.
          </DialogDescription>
        </DialogHeader>

        {/* Toolbar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets..."
              className="h-8 pl-8 text-sm"
            />
          </div>

          <div className="flex items-center gap-0.5 bg-muted rounded-md p-0.5">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode('list')}
            >
              <List className="h-3.5 w-3.5" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-8"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? (
              <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5 mr-1" />
            )}
            Upload
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 flex gap-3">
          {/* Asset grid/list */}
          <ScrollArea className="flex-1 min-h-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredAssets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileImage className="h-12 w-12 text-muted-foreground/30 mb-3" />
                {assets.length === 0 ? (
                  <>
                    <p className="text-sm font-medium">No media assets</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload images to get started
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-3.5 w-3.5 mr-1" />
                      Upload Files
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium">No matching assets</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Try a different search term
                    </p>
                  </>
                )}
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pb-2">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className={cn(
                      'group relative border rounded-lg overflow-hidden cursor-pointer transition-all hover:border-primary/50',
                      selectedAssetId === asset.id && 'ring-2 ring-primary border-primary'
                    )}
                    onClick={() => setSelectedAssetId(asset.id)}
                    onDoubleClick={() => {
                      setSelectedAssetId(asset.id)
                      if (onSelect) {
                        onSelect(asset)
                        setOpen(false)
                      }
                    }}
                  >
                    <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                      {asset.mimeType.startsWith('image/') ? (
                        <img
                          src={asset.dataUrl}
                          alt={asset.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <FileImage className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="p-1.5">
                      <p className="text-[10px] font-medium truncate">{asset.name}</p>
                      <p className="text-[9px] text-muted-foreground">
                        {formatFileSize(asset.size)}
                      </p>
                    </div>
                    {selectedAssetId === asset.id && (
                      <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                    <button
                      className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 bg-destructive/90 text-destructive-foreground rounded p-0.5 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(asset.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1 pb-2">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className={cn(
                      'flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors hover:bg-muted/50',
                      selectedAssetId === asset.id && 'bg-primary/10 border border-primary/30'
                    )}
                    onClick={() => setSelectedAssetId(asset.id)}
                    onDoubleClick={() => {
                      setSelectedAssetId(asset.id)
                      if (onSelect) {
                        onSelect(asset)
                        setOpen(false)
                      }
                    }}
                  >
                    <div className="h-10 w-10 rounded border bg-muted flex items-center justify-center overflow-hidden shrink-0">
                      {asset.mimeType.startsWith('image/') ? (
                        <img
                          src={asset.dataUrl}
                          alt={asset.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <FileImage className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{asset.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {asset.fileName} &middot; {formatFileSize(asset.size)}
                        {asset.width && asset.height && ` &middot; ${asset.width}x${asset.height}`}
                      </p>
                    </div>
                    <button
                      className="p-1 hover:bg-destructive/10 rounded"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(asset.id)
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Details panel */}
          {selectedAsset && (
            <div className="w-52 border-l pl-3 flex flex-col gap-3">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden border">
                {selectedAsset.mimeType.startsWith('image/') ? (
                  <img
                    src={selectedAsset.dataUrl}
                    alt={selectedAsset.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FileImage className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <div>
                  <Label className="text-[10px] text-muted-foreground">Name</Label>
                  <p className="text-xs font-medium truncate">{selectedAsset.name}</p>
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground">File</Label>
                  <p className="text-[10px] truncate">{selectedAsset.fileName}</p>
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground">Type</Label>
                  <p className="text-[10px]">{selectedAsset.mimeType}</p>
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground">Size</Label>
                  <p className="text-[10px]">{formatFileSize(selectedAsset.size)}</p>
                </div>
                {selectedAsset.width && selectedAsset.height && (
                  <div>
                    <Label className="text-[10px] text-muted-foreground">Dimensions</Label>
                    <p className="text-[10px]">
                      {selectedAsset.width} x {selectedAsset.height}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            {filteredAssets.length} asset{filteredAssets.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {onSelect && (
              <Button
                size="sm"
                disabled={!selectedAsset}
                onClick={handleSelect}
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                Use Selected
              </Button>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,.svg,.pdf"
          multiple
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </DialogContent>
    </Dialog>
  )
}

function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = () => resolve({ width: 0, height: 0 })
    img.src = dataUrl
  })
}
