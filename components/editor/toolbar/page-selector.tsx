'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  FileText,
  Plus,
  ChevronDown,
  Pencil,
  Trash2,
  Copy,
} from 'lucide-react'
import { useProjectStore, useCanvasStore } from '@/lib/store'
import { db } from '@/lib/db'
import type { Page } from '@/types'

export function PageSelector() {
  const { currentProject, currentPage, setCurrentPage, addPage, renamePage, deletePage } =
    useProjectStore()
  const { loadComponents, clearComponents } = useCanvasStore()
  const [pages, setPages] = useState<Page[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showRenameDialog, setShowRenameDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [newPageName, setNewPageName] = useState('')
  const [editingPage, setEditingPage] = useState<Page | null>(null)

  // Load pages when project changes
  useEffect(() => {
    if (!currentProject) return
    const loadPages = async () => {
      const pageList = await db.pages
        .where('projectId')
        .equals(currentProject.id)
        .sortBy('order')
      setPages(pageList)
    }
    loadPages()
  }, [currentProject, currentPage])

  const handleSwitchPage = useCallback(
    async (page: Page) => {
      if (page.id === currentPage?.id) return
      setCurrentPage(page)
      await loadComponents(page.id)
    },
    [currentPage, setCurrentPage, loadComponents]
  )

  const handleAddPage = useCallback(async () => {
    if (!newPageName.trim()) return
    const slug = newPageName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    const page = await addPage(newPageName.trim(), slug)
    clearComponents()
    setShowAddDialog(false)
    setNewPageName('')
    // Reload pages list
    if (currentProject) {
      const pageList = await db.pages
        .where('projectId')
        .equals(currentProject.id)
        .sortBy('order')
      setPages(pageList)
    }
  }, [newPageName, addPage, clearComponents, currentProject])

  const handleRenamePage = useCallback(async () => {
    if (!editingPage || !newPageName.trim()) return
    const slug = newPageName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    await renamePage(editingPage.id, newPageName.trim(), slug)
    setShowRenameDialog(false)
    setEditingPage(null)
    setNewPageName('')
    if (currentProject) {
      const pageList = await db.pages
        .where('projectId')
        .equals(currentProject.id)
        .sortBy('order')
      setPages(pageList)
    }
  }, [editingPage, newPageName, renamePage, currentProject])

  const handleDeletePage = useCallback(async () => {
    if (!editingPage) return
    if (pages.length <= 1) return // Don't delete last page
    await deletePage(editingPage.id)
    // Switch to first available page
    const remaining = pages.filter((p) => p.id !== editingPage.id)
    if (remaining[0]) {
      setCurrentPage(remaining[0])
      await loadComponents(remaining[0].id)
    }
    setShowDeleteDialog(false)
    setEditingPage(null)
    if (currentProject) {
      const pageList = await db.pages
        .where('projectId')
        .equals(currentProject.id)
        .sortBy('order')
      setPages(pageList)
    }
  }, [editingPage, pages, deletePage, setCurrentPage, loadComponents, currentProject])

  const openRename = useCallback((page: Page) => {
    setEditingPage(page)
    setNewPageName(page.name)
    setShowRenameDialog(true)
  }, [])

  const openDelete = useCallback((page: Page) => {
    setEditingPage(page)
    setShowDeleteDialog(true)
  }, [])

  if (!currentProject) return null

  return (
    <>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 max-w-[140px]">
                <FileText className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate text-xs">{currentPage?.name || 'No page'}</span>
                <ChevronDown className="h-3 w-3 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Switch Page</TooltipContent>
        </Tooltip>

        <DropdownMenuContent align="start" className="w-56">
          <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            Pages ({pages.length})
          </div>
          {pages.map((page) => (
            <DropdownMenuItem
              key={page.id}
              className="flex items-center justify-between group/item"
              onSelect={(e) => {
                e.preventDefault()
                handleSwitchPage(page)
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{page.name}</span>
                {page.id === currentPage?.id && (
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 rounded">
                    active
                  </span>
                )}
              </div>
              <div className="flex items-center gap-0.5 opacity-0 group-hover/item:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    openRename(page)
                  }}
                  className="p-1 hover:bg-muted rounded"
                >
                  <Pencil className="h-3 w-3" />
                </button>
                {pages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      openDelete(page)
                    }}
                    className="p-1 hover:bg-destructive/10 rounded"
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </button>
                )}
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setShowAddDialog(true)}>
            <Plus className="h-3.5 w-3.5 mr-2" />
            Add new page
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Add Page Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Page</DialogTitle>
            <DialogDescription>Create a new page in your project.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Page Name</label>
              <Input
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                placeholder="About, Services, Contact..."
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddPage()
                }}
              />
            </div>
            {newPageName && (
              <p className="text-xs text-muted-foreground">
                Slug: /{newPageName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPage} disabled={!newPageName.trim()}>
              <Plus className="h-4 w-4 mr-1" />
              Create Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Page Dialog */}
      <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Page</DialogTitle>
            <DialogDescription>Change the name of &quot;{editingPage?.name}&quot;.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Page Name</label>
              <Input
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRenamePage()
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRenameDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenamePage} disabled={!newPageName.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Page Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{editingPage?.name}&quot;? This will remove all
              components on this page. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePage}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
