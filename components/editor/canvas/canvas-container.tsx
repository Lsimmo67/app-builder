"use client";

import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCanvasStore, useEditorStore } from "@/lib/store";
import { componentRegistry } from "@/lib/components-registry";
import { DEVICE_WIDTHS } from "@/types";
import type { ComponentInstance } from "@/types";
import {
  Plus,
  GripVertical,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Copy,
} from "lucide-react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import { ComponentRenderer } from "./component-renderer";
import { isComponentAvailable } from "@/lib/component-loader";
import { mergeStyles } from "@/lib/styles/styles-to-css";
import type { ElementStyles } from "@/types";
import React, { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { useCMSStore } from "@/lib/store/cms-store";
import { resolveAllBindings } from "@/lib/cms/resolve-bindings";

// Text-based builtin registry IDs that support inline editing
const INLINE_EDITABLE_IDS = new Set([
  'builtin-heading',
  'builtin-paragraph',
  'builtin-text-block',
  'builtin-button',
  'builtin-link',
])

// Get the text prop key for a given component
function getTextPropKey(registryId: string): string | null {
  if (registryId === 'builtin-heading') return 'text'
  if (registryId === 'builtin-paragraph') return 'text'
  if (registryId === 'builtin-text-block') return 'text'
  if (registryId === 'builtin-button') return 'text'
  if (registryId === 'builtin-link') return 'text'
  return null
}

// ============================================
// INLINE TEXT EDITOR
// ============================================

function InlineTextEditor({
  value,
  onChange,
  onBlur,
  styles,
}: {
  value: string
  onChange: (val: string) => void
  onBlur: () => void
  styles?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
      // Place cursor at end
      const range = document.createRange()
      range.selectNodeContents(ref.current)
      range.collapse(false)
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)
    }
  }, [])

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className="outline-none ring-2 ring-primary/30 rounded min-h-[1.2em] px-0.5"
      style={styles}
      onBlur={(e) => {
        onChange(e.currentTarget.textContent || '')
        onBlur()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onBlur()
        }
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          onChange(e.currentTarget.textContent || '')
          onBlur()
        }
        e.stopPropagation()
      }}
      onClick={(e) => e.stopPropagation()}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  )
}

// ============================================
// CANVAS NODE - Recursive nested rendering
// ============================================

interface CanvasNodeProps {
  instance: ComponentInstance;
  depth: number;
}

function CanvasNode({ instance, depth }: CanvasNodeProps) {
  const { selectedComponentId, selectComponent, hoverComponent, previewDevice } =
    useEditorStore();
  const { components, updateComponent, removeComponent, duplicateComponent } =
    useCanvasStore();
  const registryItem = componentRegistry.getById(instance.componentRegistryId);
  const canNest = registryItem?.acceptsChildren ?? false;

  const { collections, items } = useCMSStore();
  const resolved = useMemo(
    () => resolveAllBindings(instance, collections, items),
    [instance, collections, items],
  );

  // Get child components sorted by order
  const children = useMemo(
    () =>
      components
        .filter((c) => c.parentId === instance.id)
        .sort((a, b) => a.order - b.order),
    [components, instance.id],
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: instance.id,
    data: {
      type: "canvas",
      instanceId: instance.id,
      parentId: instance.parentId,
    },
    disabled: instance.isLocked,
  });

  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isSelected = selectedComponentId === instance.id;

  // Inline text editing state
  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const textPropKey = getTextPropKey(instance.componentRegistryId);
  const isInlineEditable = INLINE_EDITABLE_IDS.has(instance.componentRegistryId) && textPropKey !== null;

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isInlineEditable && !instance.isLocked) {
        setIsInlineEditing(true);
      }
    },
    [isInlineEditable, instance.isLocked]
  );

  const handleInlineTextChange = useCallback(
    (newText: string) => {
      if (!textPropKey) return;
      updateComponent(instance.id, {
        props: { ...instance.props, [textPropKey]: newText },
      });
    },
    [instance.id, instance.props, textPropKey, updateComponent]
  );

  // Compute merged styles (structured + responsive overrides + legacy)
  const computedStyles = useMemo(() => {
    let baseStyles = resolved.styles ?? instance.styles ?? {};
    // Apply responsive overrides based on current preview device
    if (previewDevice !== 'desktop' && instance.responsiveStyles) {
      const deviceKey = previewDevice as 'tablet' | 'mobile';
      const overrides = instance.responsiveStyles[deviceKey];
      if (overrides && Object.keys(overrides).length > 0) {
        baseStyles = { ...baseStyles, ...overrides } as ElementStyles;
      }
      // For mobile, also apply tablet overrides first (cascade)
      if (deviceKey === 'mobile' && instance.responsiveStyles.tablet) {
        const tabletOverrides = instance.responsiveStyles.tablet;
        if (Object.keys(tabletOverrides).length > 0) {
          baseStyles = { ...instance.styles, ...tabletOverrides, ...overrides } as ElementStyles;
        }
      }
    }
    return mergeStyles(baseStyles, instance.customStyles);
  }, [resolved.styles, instance.styles, instance.responsiveStyles, instance.customStyles, previewDevice]);

  return (
    <div
      ref={setNodeRef}
      style={sortableStyle}
      className={cn(
        "group/node relative",
        isDragging && "opacity-50 z-50",
        instance.isHidden && "opacity-40",
      )}
      onClick={(e) => {
        e.stopPropagation();
        if (!instance.isLocked) selectComponent(instance.id);
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
        hoverComponent(instance.id);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        hoverComponent(null);
      }}
    >
      {/* Component Toolbar */}
      <div
        className={cn(
          "flex items-center justify-between px-2 py-1 bg-card border rounded-t-md opacity-0 group-hover/node:opacity-100 transition-opacity z-20 text-xs",
          isSelected && "opacity-100 border-primary bg-primary/5",
        )}
      >
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              "p-0.5 cursor-grab active:cursor-grabbing",
              instance.isLocked && "cursor-not-allowed opacity-50",
            )}
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <span className="font-medium truncate max-w-[120px]">
            {instance.displayName || registryItem?.displayName || "Component"}
          </span>
          <Badge
            variant={instance.source as BadgeProps["variant"]}
            className="text-[9px] px-1 py-0 leading-tight"
          >
            {instance.source}
          </Badge>
        </div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateComponent(instance.id, { isHidden: !instance.isHidden });
            }}
            className="p-0.5 hover:bg-muted rounded"
            title={instance.isHidden ? "Show" : "Hide"}
          >
            {instance.isHidden ? (
              <EyeOff className="w-3 h-3 text-muted-foreground" />
            ) : (
              <Eye className="w-3 h-3 text-muted-foreground" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              updateComponent(instance.id, { isLocked: !instance.isLocked });
            }}
            className={cn(
              "p-0.5 hover:bg-muted rounded",
              instance.isLocked && "text-amber-500",
            )}
            title={instance.isLocked ? "Unlock" : "Lock"}
          >
            <Lock className="w-3 h-3" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              duplicateComponent(instance.id);
            }}
            className="p-0.5 hover:bg-muted rounded"
            title="Duplicate"
          >
            <Copy className="w-3 h-3 text-muted-foreground" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!instance.isLocked) {
                removeComponent(instance.id);
                if (isSelected) selectComponent(null);
              }
            }}
            disabled={instance.isLocked}
            className={cn(
              "p-0.5 hover:bg-destructive/10 rounded",
              instance.isLocked && "opacity-50 cursor-not-allowed",
            )}
            title="Delete"
          >
            <Trash2 className="w-3 h-3 text-destructive" />
          </button>
        </div>
      </div>

      {/* Component Content */}
      <div
        className={cn(
          "relative border rounded-b-lg cursor-pointer transition-all",
          isSelected
            ? "ring-2 ring-primary border-primary"
            : "hover:border-primary/50",
          instance.isHidden && "pointer-events-none",
          canNest && "min-h-[40px]",
          isInlineEditing && "ring-2 ring-blue-400",
        )}
        style={computedStyles}
        onDoubleClick={handleDoubleClick}
      >
        {isInlineEditing && isInlineEditable && textPropKey ? (
          // Inline text editing mode
          <InlineTextEditor
            value={String(instance.props[textPropKey] || '')}
            onChange={handleInlineTextChange}
            onBlur={() => setIsInlineEditing(false)}
            styles={computedStyles}
          />
        ) : canNest ? (
          // Container element: render children recursively
          <ContainerDropZone instance={instance} depth={depth}>
            {children.length > 0 ? (
              children.map((child) => (
                <CanvasNode key={child.id} instance={child} depth={depth + 1} />
              ))
            ) : (
              <EmptyContainerPlaceholder instanceId={instance.id} />
            )}
          </ContainerDropZone>
        ) : (
          // Leaf element: render the actual component
          <>
            {isComponentAvailable(instance.componentRegistryId) ? (
              <>
                <div className={cn("pointer-events-none", isInlineEditable && isSelected && "cursor-text")}>
                  <ComponentRenderer
                    registryId={instance.componentRegistryId}
                    props={resolved.props}
                    componentName={registryItem?.displayName}
                  />
                </div>
                <div className="absolute inset-0" />
                {isInlineEditable && isSelected && (
                  <div className="absolute bottom-1 right-1 text-[9px] text-muted-foreground bg-background/80 rounded px-1 py-0.5 pointer-events-none">
                    Double-click to edit
                  </div>
                )}
              </>
            ) : (
              <div className="h-20 bg-muted/50 rounded flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm font-medium">
                    {registryItem?.displayName || "Unknown"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {registryItem?.description?.slice(0, 50) ||
                      "Component preview"}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// CONTAINER DROP ZONE
// ============================================

function ContainerDropZone({
  instance,
  depth,
  children,
}: {
  instance: ComponentInstance;
  depth: number;
  children: React.ReactNode;
}) {
  const components = useCanvasStore((state) => state.components);
  const childComponents = useMemo(
    () =>
      components
        .filter((c) => c.parentId === instance.id)
        .sort((a, b) => a.order - b.order),
    [components, instance.id],
  );

  const { setNodeRef, isOver } = useDroppable({
    id: `container-${instance.id}`,
    data: {
      type: "container",
      parentId: instance.id,
      accepts: ["registry", "canvas"],
    },
  });

  return (
    <SortableContext
      items={childComponents.map((c) => c.id)}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className={cn(
          "min-h-[40px] p-2 transition-colors",
          isOver && "bg-primary/5 ring-1 ring-dashed ring-primary/40",
          depth > 0 && "ml-0",
        )}
      >
        <div className="space-y-2">{children}</div>
      </div>
    </SortableContext>
  );
}

// ============================================
// EMPTY CONTAINER PLACEHOLDER
// ============================================

function EmptyContainerPlaceholder({ instanceId }: { instanceId: string }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `empty-${instanceId}`,
    data: {
      type: "container",
      parentId: instanceId,
      accepts: ["registry", "canvas"],
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col items-center justify-center py-6 border-2 border-dashed rounded-lg transition-colors",
        isOver
          ? "border-primary bg-primary/5 text-primary"
          : "border-muted-foreground/20 text-muted-foreground/50",
      )}
    >
      <Plus className="h-4 w-4 mb-1" />
      <span className="text-xs">Drop elements here</span>
    </div>
  );
}

// ============================================
// MAIN CANVAS
// ============================================

export function Canvas() {
  const components = useCanvasStore((state) => state.components);
  const { previewDevice, selectComponent } = useEditorStore();

  // Only root-level components (no parentId)
  const rootComponents = useMemo(
    () =>
      components.filter((c) => !c.parentId).sort((a, b) => a.order - b.order),
    [components],
  );

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop-zone",
    data: {
      type: "canvas",
      accepts: ["registry"],
    },
  });

  const canvasWidth = DEVICE_WIDTHS[previewDevice];

  return (
    <div className="h-full bg-muted/30 overflow-auto p-8">
      <div
        className="mx-auto bg-background border rounded-lg shadow-sm min-h-[600px] transition-all duration-300"
        style={{ width: canvasWidth, maxWidth: "100%" }}
        onClick={() => selectComponent(null)}
      >
        <SortableContext
          items={rootComponents.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div
            ref={setNodeRef}
            className={cn(
              "min-h-[600px] p-4 transition-colors",
              isOver && "bg-primary/5 ring-2 ring-dashed ring-primary",
            )}
          >
            {rootComponents.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors",
                    isOver ? "bg-primary/20" : "bg-muted",
                  )}
                >
                  <Plus
                    className={cn(
                      "h-8 w-8",
                      isOver ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {isOver ? "Drop to add" : "Start building"}
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  {isOver
                    ? "Release to add the component to your page"
                    : "Drag components from the sidebar to start building your page."}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {rootComponents.map((instance) => (
                  <CanvasNode key={instance.id} instance={instance} depth={0} />
                ))}
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
