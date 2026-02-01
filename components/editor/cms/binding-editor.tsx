'use client'

import { useState } from 'react'
import { useCMSStore } from '@/lib/store/cms-store'
import { useCanvasStore, useEditorStore, useProjectStore } from '@/lib/store'
import { componentRegistry } from '@/lib/components-registry'
import type { CMSBinding } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Trash2, Link2, Unlink2 } from 'lucide-react'

export function BindingEditor() {
  const { currentProject } = useProjectStore()
  const { collections } = useCMSStore()
  const selectedId = useEditorStore((s) => s.selectedComponentId)
  const components = useCanvasStore((s) => s.components)
  const updateComponent = useCanvasStore((s) => s.updateComponent)

  const selectedComponent = components.find((c) => c.id === selectedId)
  const registryItem = selectedComponent
    ? componentRegistry.getById(selectedComponent.componentRegistryId)
    : null

  const [showAddBinding, setShowAddBinding] = useState(false)
  const [newCollectionId, setNewCollectionId] = useState('')
  const [newFieldSlug, setNewFieldSlug] = useState('')
  const [newTargetType, setNewTargetType] = useState<CMSBinding['targetType']>('prop')
  const [newTargetKey, setNewTargetKey] = useState('')

  if (!selectedComponent || !registryItem) return null

  const bindings = selectedComponent.cmsBindings || []
  const selectedCollection = collections.find((c) => c.id === newCollectionId)

  const handleAddBinding = () => {
    if (!newCollectionId || !newFieldSlug || !newTargetKey) return

    const newBinding: CMSBinding = {
      collectionId: newCollectionId,
      fieldSlug: newFieldSlug,
      targetType: newTargetType,
      targetKey: newTargetKey,
    }

    updateComponent(selectedComponent.id, {
      cmsBindings: [...bindings, newBinding],
    })

    // Reset form
    setNewCollectionId('')
    setNewFieldSlug('')
    setNewTargetType('prop')
    setNewTargetKey('')
    setShowAddBinding(false)
  }

  const handleRemoveBinding = (index: number) => {
    const newBindings = bindings.filter((_, i) => i !== index)
    updateComponent(selectedComponent.id, {
      cmsBindings: newBindings.length > 0 ? newBindings : undefined,
    })
  }

  // Available prop targets from registry
  const propTargets = registryItem.props
    .filter((p) => p.type === 'string' || p.type === 'number' || p.type === 'image')
    .map((p) => p.name)

  if (collections.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground">
          No CMS collections found. Create a collection first.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Existing bindings */}
      {bindings.length > 0 && (
        <div className="space-y-1.5">
          {bindings.map((binding, index) => {
            const col = collections.find((c) => c.id === binding.collectionId)
            return (
              <div
                key={index}
                className="flex items-center gap-1.5 p-1.5 rounded border bg-card text-xs"
              >
                <Link2 className="h-3 w-3 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-muted-foreground">{col?.name || '?'}</span>
                  <span className="mx-1">.</span>
                  <span className="font-medium">{binding.fieldSlug}</span>
                  <span className="mx-1 text-muted-foreground">&rarr;</span>
                  <Badge variant="secondary" className="text-[9px]">
                    {binding.targetType}
                  </Badge>
                  <span className="ml-1 font-mono">{binding.targetKey}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 text-destructive"
                  onClick={() => handleRemoveBinding(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )
          })}
        </div>
      )}

      {/* Add binding form */}
      {showAddBinding ? (
        <div className="space-y-2 p-2 border rounded-md bg-muted/20">
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">Collection</Label>
            <Select value={newCollectionId} onValueChange={setNewCollectionId}>
              <SelectTrigger className="h-7 text-xs">
                <SelectValue placeholder="Select collection" />
              </SelectTrigger>
              <SelectContent>
                {collections.map((col) => (
                  <SelectItem key={col.id} value={col.id} className="text-xs">
                    {col.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCollection && (
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Field</Label>
              <Select value={newFieldSlug} onValueChange={setNewFieldSlug}>
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCollection.fields.map((field) => (
                    <SelectItem key={field.id} value={field.slug} className="text-xs">
                      {field.name} ({field.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">Bind To</Label>
            <Select
              value={newTargetType}
              onValueChange={(v) => setNewTargetType(v as CMSBinding['targetType'])}
            >
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prop" className="text-xs">Component Prop</SelectItem>
                <SelectItem value="text" className="text-xs">Text Content</SelectItem>
                <SelectItem value="src" className="text-xs">Image Source</SelectItem>
                <SelectItem value="href" className="text-xs">Link URL</SelectItem>
                <SelectItem value="style" className="text-xs">Style Property</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {newTargetType === 'prop' && (
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Target Prop</Label>
              <Select value={newTargetKey} onValueChange={setNewTargetKey}>
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue placeholder="Select prop" />
                </SelectTrigger>
                <SelectContent>
                  {propTargets.map((prop) => (
                    <SelectItem key={prop} value={prop} className="text-xs">
                      {prop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {newTargetType !== 'prop' && (
            <div className="space-y-1">
              <Label className="text-[10px] text-muted-foreground">Target Key</Label>
              <Select value={newTargetKey} onValueChange={setNewTargetKey}>
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue placeholder="Select target" />
                </SelectTrigger>
                <SelectContent>
                  {newTargetType === 'text' && (
                    <SelectItem value="textContent" className="text-xs">Text Content</SelectItem>
                  )}
                  {newTargetType === 'src' && (
                    <SelectItem value="src" className="text-xs">Image Source</SelectItem>
                  )}
                  {newTargetType === 'href' && (
                    <SelectItem value="href" className="text-xs">Link URL</SelectItem>
                  )}
                  {newTargetType === 'style' && (
                    <>
                      <SelectItem value="color" className="text-xs">Color</SelectItem>
                      <SelectItem value="backgroundColor" className="text-xs">Background</SelectItem>
                      <SelectItem value="backgroundImage" className="text-xs">Background Image</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs flex-1"
              onClick={() => setShowAddBinding(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="h-7 text-xs flex-1"
              onClick={handleAddBinding}
              disabled={!newCollectionId || !newFieldSlug || !newTargetKey}
            >
              Add
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={() => setShowAddBinding(true)}
        >
          <Plus className="h-3 w-3 mr-1" />
          Bind CMS Field
        </Button>
      )}
    </div>
  )
}
