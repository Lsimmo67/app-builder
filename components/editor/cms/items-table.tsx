'use client'

import { useState, useEffect, useMemo } from 'react'
import { useCMSStore } from '@/lib/store/cms-store'
import type { CMSCollection, CMSItem } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, Trash2, FileText, Eye, EyeOff } from 'lucide-react'
import { ItemEditor } from './item-editor'
import { cn } from '@/lib/utils'

interface ItemsTableProps {
  collection: CMSCollection
}

export function ItemsTable({ collection }: ItemsTableProps) {
  const { items, loadItems, createItem, deleteItem, updateItemStatus } = useCMSStore()
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadItems(collection.id)
  }, [collection.id, loadItems])

  const collectionItems = useMemo(
    () => items
      .filter((i) => i.collectionId === collection.id)
      .filter((i) => {
        if (!search) return true
        return Object.values(i.data).some(
          (v) => String(v).toLowerCase().includes(search.toLowerCase())
        )
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [items, collection.id, search]
  )

  const editingItem = editingItemId
    ? items.find((i) => i.id === editingItemId)
    : null

  const handleCreateItem = async () => {
    const defaultData: Record<string, unknown> = {}
    collection.fields.forEach((field) => {
      if (field.defaultValue !== undefined) {
        defaultData[field.slug] = field.defaultValue
      } else if (field.type === 'text' || field.type === 'richtext') {
        defaultData[field.slug] = ''
      } else if (field.type === 'number') {
        defaultData[field.slug] = 0
      } else if (field.type === 'boolean') {
        defaultData[field.slug] = false
      }
    })
    const item = await createItem(collection.id, defaultData)
    setEditingItemId(item.id)
  }

  // If editing an item, show the item editor
  if (editingItem) {
    return (
      <ItemEditor
        collection={collection}
        item={editingItem}
        onBack={() => setEditingItemId(null)}
      />
    )
  }

  // Get first text field for display
  const titleField = collection.fields.find((f) => f.type === 'text') || collection.fields[0]

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="p-2 border-b flex items-center gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search items..."
          className="h-7 text-xs flex-1"
        />
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs shrink-0"
          onClick={handleCreateItem}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Item
        </Button>
      </div>

      {/* Items List */}
      <ScrollArea className="flex-1">
        {collectionItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <FileText className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-1">
              {search ? 'No matching items' : 'No items yet'}
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              {search
                ? 'Try a different search term'
                : `Add items to your ${collection.name} collection`
              }
            </p>
            {!search && (
              <Button variant="outline" size="sm" onClick={handleCreateItem}>
                <Plus className="h-3 w-3 mr-1" />
                Add First Item
              </Button>
            )}
          </div>
        ) : (
          <div className="divide-y">
            {collectionItems.map((item) => {
              const title = titleField
                ? String(item.data[titleField.slug] || 'Untitled')
                : `Item ${item.id.slice(0, 6)}`

              return (
                <div
                  key={item.id}
                  className="group flex items-center gap-2 px-3 py-2 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => setEditingItemId(item.id)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{title}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    variant={item.status === 'published' ? 'default' : 'secondary'}
                    className={cn(
                      'text-[9px]',
                      item.status === 'published' && 'bg-green-500/20 text-green-700 border-green-300'
                    )}
                  >
                    {item.status}
                  </Badge>
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        updateItemStatus(
                          item.id,
                          item.status === 'published' ? 'draft' : 'published'
                        )
                      }}
                      title={item.status === 'published' ? 'Unpublish' : 'Publish'}
                    >
                      {item.status === 'published' ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteItem(item.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
