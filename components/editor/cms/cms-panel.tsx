'use client'

import { useState, useEffect } from 'react'
import { useCMSStore } from '@/lib/store/cms-store'
import { useProjectStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Plus,
  Database,
  Table2,
  Trash2,
  Settings,
  ChevronRight,
  FileText,
} from 'lucide-react'
import { CollectionEditor } from './collection-editor'
import { ItemsTable } from './items-table'
import { cn } from '@/lib/utils'

export function CMSPanel() {
  const { currentProject } = useProjectStore()
  const {
    collections,
    activeCollectionId,
    isLoading,
    loadCollections,
    createCollection,
    deleteCollection,
    setActiveCollectionId,
  } = useCMSStore()

  const [showNewDialog, setShowNewDialog] = useState(false)
  const [newName, setNewName] = useState('')
  const [newSlug, setNewSlug] = useState('')
  const [editingCollection, setEditingCollection] = useState<string | null>(null)

  useEffect(() => {
    if (currentProject) {
      loadCollections(currentProject.id)
    }
  }, [currentProject, loadCollections])

  const activeCollection = collections.find((c) => c.id === activeCollectionId)

  const handleCreate = async () => {
    if (!currentProject || !newName.trim()) return
    const slug = newSlug.trim() || newName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    await createCollection(currentProject.id, newName.trim(), slug)
    setNewName('')
    setNewSlug('')
    setShowNewDialog(false)
  }

  const handleNameChange = (name: string) => {
    setNewName(name)
    if (!newSlug || newSlug === newName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')) {
      setNewSlug(name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
    }
  }

  // If editing a collection's schema
  if (editingCollection) {
    const col = collections.find((c) => c.id === editingCollection)
    if (col) {
      return (
        <CollectionEditor
          collection={col}
          onBack={() => setEditingCollection(null)}
        />
      )
    }
  }

  // If viewing items in a collection
  if (activeCollection) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-3 border-b flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={() => setActiveCollectionId(null)}
          >
            Collections
          </Button>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm font-medium">{activeCollection.name}</span>
          <Badge variant="secondary" className="text-[10px] ml-auto">
            {activeCollection.fields.length} fields
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => setEditingCollection(activeCollection.id)}
            title="Edit schema"
          >
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex-1 overflow-hidden">
          <ItemsTable collection={activeCollection} />
        </div>
      </div>
    )
  }

  // Collections list view
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">CMS Collections</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={() => setShowNewDialog(true)}
        >
          <Plus className="h-3 w-3 mr-1" />
          New
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {collections.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <Database className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium mb-1">No collections yet</p>
            <p className="text-xs text-muted-foreground mb-4">
              Create a CMS collection to manage dynamic content
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNewDialog(true)}
            >
              <Plus className="h-3 w-3 mr-1" />
              Create Collection
            </Button>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="group flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => setActiveCollectionId(collection.id)}
              >
                <Table2 className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{collection.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {collection.fields.length} fields &bull; /{collection.slug}
                  </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      setEditingCollection(collection.id)
                    }}
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteCollection(collection.id)
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* New Collection Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New CMS Collection</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm">Name</Label>
              <Input
                value={newName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Blog Posts"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Slug</Label>
              <Input
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="blog-posts"
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Used for API endpoints and export paths
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!newName.trim()}>
              Create Collection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
