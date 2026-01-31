'use client'

import { useCallback, useMemo } from 'react'
import { useEditorStore, useCanvasStore } from '@/lib/store'
import { componentRegistry } from '@/lib/components-registry'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PropField } from './prop-editors'
import {
  Copy,
  Trash2,
  EyeOff,
  Eye,
  Lock,
  Unlock,
  Code,
  Settings,
  Paintbrush,
  Type,
  ExternalLink,
} from 'lucide-react'
import { SOURCE_COLORS, SOURCE_LABELS, ComponentProp } from '@/types/component'
import { cn } from '@/lib/utils'

// Group props by category
function groupProps(props: ComponentProp[]): Record<string, ComponentProp[]> {
  const groups: Record<string, ComponentProp[]> = {
    content: [],
    style: [],
    behavior: [],
    advanced: [],
  }

  for (const prop of props) {
    if (['children', 'title', 'subtitle', 'text', 'description', 'label', 'placeholder'].some(k => 
      prop.name.toLowerCase().includes(k)
    ) || prop.type === 'richtext') {
      groups.content.push(prop)
    } else if (['color', 'background', 'border', 'size', 'variant', 'className'].some(k =>
      prop.name.toLowerCase().includes(k)
    ) || prop.type === 'color') {
      groups.style.push(prop)
    } else if (['onClick', 'onChange', 'onSubmit', 'disabled', 'loading', 'href', 'target'].some(k =>
      prop.name.toLowerCase().includes(k)
    ) || prop.type === 'boolean') {
      groups.behavior.push(prop)
    } else {
      groups.advanced.push(prop)
    }
  }

  return groups
}

export function PropertiesPanel() {
  const selectedComponentId = useEditorStore((state) => state.selectedComponentId)
  const components = useCanvasStore((state) => state.components)
  const { updateComponent, removeComponent, duplicateComponent } = useCanvasStore()
  const { selectComponent } = useEditorStore()

  const selectedComponent = components.find((c) => c.id === selectedComponentId)

  // Get registry item for selected component
  const registryItem = useMemo(() => {
    if (!selectedComponent) return null
    return componentRegistry.getById(selectedComponent.componentRegistryId)
  }, [selectedComponent])

  // Group props
  const groupedProps = useMemo(() => {
    if (!registryItem) return null
    return groupProps(registryItem.props)
  }, [registryItem])

  // Handle prop change
  const handlePropChange = useCallback(
    (propName: string, value: unknown) => {
      if (!selectedComponent) return
      updateComponent(selectedComponent.id, {
        props: {
          ...selectedComponent.props,
          [propName]: value,
        },
      })
    },
    [selectedComponent, updateComponent]
  )

  // Handle delete
  const handleDelete = useCallback(() => {
    if (!selectedComponent) return
    removeComponent(selectedComponent.id)
    selectComponent(null)
  }, [selectedComponent, removeComponent, selectComponent])

  // Empty state
  if (!selectedComponent || !registryItem) {
    return (
      <div className="w-80 border-l bg-card/50 backdrop-blur-sm">
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Settings className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium mb-1">No Component Selected</h3>
          <p className="text-muted-foreground text-sm">
            Select a component on the canvas to view and edit its properties
          </p>
        </div>
      </div>
    )
  }

  const sourceColor = SOURCE_COLORS[selectedComponent.source]
  const sourceLabel = SOURCE_LABELS[selectedComponent.source]

  return (
    <div className="w-80 border-l bg-card/50 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold truncate">{registryItem.displayName}</h3>
            <p className="text-xs text-muted-foreground truncate">{registryItem.name}</p>
          </div>
          <Badge
            className="shrink-0"
            style={{
              backgroundColor: `${sourceColor}20`,
              color: sourceColor === '#ffffff' ? '#000' : sourceColor,
              borderColor: sourceColor,
            }}
          >
            {sourceLabel}
          </Badge>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-1 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            onClick={() => duplicateComponent(selectedComponent.id)}
          >
            <Copy className="h-3 w-3 mr-1" />
            Duplicate
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn('h-7 text-xs', selectedComponent.isHidden && 'bg-muted')}
            onClick={() =>
              updateComponent(selectedComponent.id, {
                isHidden: !selectedComponent.isHidden,
              })
            }
          >
            {selectedComponent.isHidden ? (
              <>
                <EyeOff className="h-3 w-3 mr-1" />
                Hidden
              </>
            ) : (
              <>
                <Eye className="h-3 w-3 mr-1" />
                Visible
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn('h-7 text-xs', selectedComponent.isLocked && 'bg-muted')}
            onClick={() =>
              updateComponent(selectedComponent.id, {
                isLocked: !selectedComponent.isLocked,
              })
            }
          >
            {selectedComponent.isLocked ? (
              <>
                <Lock className="h-3 w-3 mr-1" />
                Locked
              </>
            ) : (
              <>
                <Unlock className="h-3 w-3 mr-1" />
                Unlocked
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs text-destructive hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>

        {/* Docs link */}
        {registryItem.docsUrl && (
          <a
            href={registryItem.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            View Documentation
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Properties Tabs */}
      <Tabs defaultValue="content" className="flex-1 flex flex-col min-h-0">
        <div className="border-b px-2">
          <TabsList className="w-full justify-start h-9 bg-transparent">
            <TabsTrigger value="content" className="text-xs data-[state=active]:bg-muted">
              <Type className="h-3 w-3 mr-1" />
              Content
            </TabsTrigger>
            <TabsTrigger value="style" className="text-xs data-[state=active]:bg-muted">
              <Paintbrush className="h-3 w-3 mr-1" />
              Style
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs data-[state=active]:bg-muted">
              <Code className="h-3 w-3 mr-1" />
              Advanced
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="content" className="p-4 space-y-4 m-0">
            {groupedProps?.content.length === 0 && groupedProps?.behavior.length === 0 ? (
              <p className="text-sm text-muted-foreground">No content properties</p>
            ) : (
              <>
                {groupedProps?.content.map((prop) => (
                  <PropField
                    key={prop.name}
                    prop={prop}
                    value={selectedComponent.props[prop.name]}
                    onChange={(value) => handlePropChange(prop.name, value)}
                    disabled={selectedComponent.isLocked}
                  />
                ))}
                {groupedProps?.behavior && groupedProps.behavior.length > 0 && (
                  <>
                    <div className="h-px bg-border my-4" />
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Behavior
                    </h4>
                    {groupedProps.behavior.map((prop) => (
                      <PropField
                        key={prop.name}
                        prop={prop}
                        value={selectedComponent.props[prop.name]}
                        onChange={(value) => handlePropChange(prop.name, value)}
                        disabled={selectedComponent.isLocked}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="style" className="p-4 space-y-4 m-0">
            {groupedProps?.style.length === 0 ? (
              <p className="text-sm text-muted-foreground">No style properties</p>
            ) : (
              groupedProps?.style.map((prop) => (
                <PropField
                  key={prop.name}
                  prop={prop}
                  value={selectedComponent.props[prop.name]}
                  onChange={(value) => handlePropChange(prop.name, value)}
                  disabled={selectedComponent.isLocked}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="advanced" className="p-4 space-y-4 m-0">
            {groupedProps?.advanced.length === 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">No advanced properties</p>
              </div>
            ) : (
              groupedProps?.advanced.map((prop) => (
                <PropField
                  key={prop.name}
                  prop={prop}
                  value={selectedComponent.props[prop.name]}
                  onChange={(value) => handlePropChange(prop.name, value)}
                  disabled={selectedComponent.isLocked}
                />
              ))
            )}

            <div className="h-px bg-border my-4" />

            {/* Custom Code Section */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Custom Code
              </h4>
              <p className="text-xs text-muted-foreground">
                Override the component with custom code
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Code className="h-4 w-4 mr-2" />
                Edit Code
              </Button>
            </div>

            {/* Component Info */}
            <div className="h-px bg-border my-4" />
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Component Info
              </h4>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID</span>
                  <code className="bg-muted px-1 rounded">{selectedComponent.id.slice(0, 8)}...</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order</span>
                  <span>{selectedComponent.order}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registry ID</span>
                  <code className="bg-muted px-1 rounded truncate max-w-[120px]">
                    {selectedComponent.componentRegistryId}
                  </code>
                </div>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
