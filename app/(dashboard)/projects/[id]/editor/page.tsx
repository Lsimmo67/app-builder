"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  pointerWithin,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type UniqueIdentifier,
  type CollisionDetection,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { nanoid } from "nanoid";
import { EditorToolbar } from "@/components/editor/toolbar/editor-toolbar";
import { ComponentBrowser } from "@/components/editor/sidebar/component-browser";
import { Canvas } from "@/components/editor/canvas/canvas-container";
import { PropertiesPanel } from "@/components/editor/properties/properties-panel";
import { LayerTree } from "@/components/editor/layers";
import { ElementBreadcrumb } from "@/components/editor/canvas/element-breadcrumb";
import {
  useProjectStore,
  useCanvasStore,
  useDesignSystemStore,
  useEditorStore,
} from "@/lib/store";
import { componentRegistry } from "@/lib/components-registry";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import type { ComponentInstance } from "@/types";

// Cascade collision detection: pointerWithin → closestCenter → rectIntersection
const cascadeCollisionDetection: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args);
  if (pointerCollisions.length > 0) return pointerCollisions;

  const centerCollisions = closestCenter(args);
  if (centerCollisions.length > 0) return centerCollisions;

  return rectIntersection(args);
};

// Dynamic imports for heavy components
const CodePanel = dynamic(
  () =>
    import("@/components/editor/code").then((m) => ({ default: m.CodePanel })),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center bg-[#1e1e1e]">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    ),
  },
);

const PreviewFrame = dynamic(
  () =>
    import("@/components/editor/preview").then((m) => ({
      default: m.PreviewFrame,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center bg-muted">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    ),
  },
);

export default function EditorPage() {
  const params = useParams();
  const projectId = params.id as string;

  const {
    currentProject,
    currentPage,
    loadProject,
    isLoading: projectLoading,
    error: projectError,
  } = useProjectStore();
  const { components, loadComponents, addComponent, reorderComponents, moveComponent } =
    useCanvasStore();
  const { loadDesignSystem } = useDesignSystemStore();
  const { viewMode, sidebarOpen, propertiesOpen, layerTreeOpen } =
    useEditorStore();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeData, setActiveData] = useState<{
    type: string;
    registryId?: string;
  } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
      loadDesignSystem(projectId);
    }
  }, [projectId, loadProject, loadDesignSystem]);

  useEffect(() => {
    if (currentPage) {
      loadComponents(currentPage.id);
    }
  }, [currentPage, loadComponents]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in inputs or textareas
      const tag = (e.target as HTMLElement).tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        (e.target as HTMLElement).isContentEditable
      )
        return;

      const editorState = useEditorStore.getState();
      const canvasState = useCanvasStore.getState();

      // Undo: Ctrl+Z (not Shift)
      if (e.key === "z" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
        e.preventDefault();
        editorState.undo();
        return;
      }

      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if (
        (e.key === "y" && (e.ctrlKey || e.metaKey)) ||
        (e.key === "z" && (e.ctrlKey || e.metaKey) && e.shiftKey)
      ) {
        e.preventDefault();
        editorState.redo();
        return;
      }

      // Delete selected component: Delete or Backspace
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        editorState.selectedComponentId
      ) {
        e.preventDefault();
        const comp = canvasState.components.find(
          (c) => c.id === editorState.selectedComponentId,
        );
        if (comp && !comp.isLocked) {
          canvasState.removeComponent(editorState.selectedComponentId);
          editorState.setSelectedComponentId(null);
        }
        return;
      }

      // Duplicate: Ctrl+D
      if (
        e.key === "d" &&
        (e.ctrlKey || e.metaKey) &&
        editorState.selectedComponentId
      ) {
        e.preventDefault();
        canvasState.duplicateComponent(editorState.selectedComponentId);
        return;
      }

      // Escape: deselect
      if (e.key === "Escape") {
        editorState.setSelectedComponentId(null);
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
    setActiveData(active.data.current as { type: string; registryId?: string });
  }, []);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);
      setActiveData(null);

      if (!over) return;
      if (!currentPage) return;

      const activeDataCurrent = active.data.current as {
        type: string;
        registryId?: string;
        instanceId?: string;
        parentId?: string;
      };

      const overData = over.data.current as {
        type?: string;
        parentId?: string;
        accepts?: string[];
      } | undefined;

      // Determine target parentId based on drop target
      let targetParentId: string | undefined;
      if (overData?.type === "container") {
        // Dropping INTO a container element
        targetParentId = overData.parentId;
      } else if (overData?.type === "canvas") {
        // Dropping at root level or between siblings
        targetParentId = overData.parentId;
      } else {
        // Dropping on canvas root or between existing components
        targetParentId = undefined;
      }

      // Dragging from registry to canvas
      if (activeDataCurrent?.type === "registry" && activeDataCurrent.registryId) {
        const registryItem = componentRegistry.getById(activeDataCurrent.registryId);
        if (!registryItem) return;

        // Calculate order within target siblings
        const siblings = components.filter((c) => c.parentId === targetParentId);
        const maxOrder = Math.max(...siblings.map((c) => c.order), -1);

        const newInstance: ComponentInstance = {
          id: nanoid(),
          pageId: currentPage.id,
          parentId: targetParentId,
          componentRegistryId: registryItem.id,
          source: registryItem.source,
          order: maxOrder + 1,
          props: registryItem.props.reduce(
            (acc, prop) => {
              if (prop.default !== undefined) {
                acc[prop.name] = prop.default;
              }
              return acc;
            },
            {} as Record<string, unknown>,
          ),
          customCode: undefined,
          customStyles: undefined,
          isLocked: false,
          isHidden: false,
        };

        await addComponent(newInstance);
      }
      // Reordering or reparenting within canvas
      else if (activeDataCurrent?.type === "canvas" && active.id !== over.id) {
        const movedComponent = components.find((c) => c.id === active.id);
        if (!movedComponent) return;

        // If target is a container and active is not already its child, reparent
        if (overData?.type === "container" && targetParentId !== movedComponent.parentId) {
          const siblings = components.filter((c) => c.parentId === targetParentId);
          const maxOrder = Math.max(...siblings.map((c) => c.order), -1);
          await moveComponent(String(active.id), maxOrder + 1, targetParentId);
        } else {
          // Reordering among siblings
          const siblingParent = movedComponent.parentId;
          const siblings = components
            .filter((c) => c.parentId === siblingParent)
            .sort((a, b) => a.order - b.order);
          const oldIndex = siblings.findIndex((c) => c.id === active.id);
          const newIndex = siblings.findIndex((c) => c.id === over.id);

          if (oldIndex !== -1 && newIndex !== -1) {
            await reorderComponents(oldIndex, newIndex);
          }
        }
      }
    },
    [currentPage, components, addComponent, reorderComponents, moveComponent],
  );

  if (projectLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (projectError || (!projectLoading && !currentProject)) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold">Project not found</p>
        <p className="text-muted-foreground text-sm">
          {projectError || "This project does not exist or has been deleted."}
        </p>
        <Link href="/" className="text-primary underline text-sm">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // Render based on view mode
  const renderMainContent = () => {
    switch (viewMode) {
      case "visual":
        return (
          <div className="flex-1 flex overflow-hidden">
            {sidebarOpen && <ComponentBrowser />}
            {layerTreeOpen && (
              <div className="w-64 min-w-[256px] border-r bg-card overflow-hidden">
                <LayerTree />
              </div>
            )}
            <div className="flex-1 min-w-0 flex flex-col">
              <Canvas />
              <ElementBreadcrumb />
            </div>
            {propertiesOpen && <PropertiesPanel />}
          </div>
        );

      case "split":
        return (
          <div className="flex-1 flex overflow-hidden">
            {/* Left side - Canvas with optional sidebar */}
            <div
              className="flex-1 flex overflow-hidden min-w-0"
              style={{ flex: "0 0 60%" }}
            >
              {sidebarOpen && <ComponentBrowser />}
              {layerTreeOpen && (
                <div className="w-64 border-r bg-card overflow-hidden">
                  <LayerTree />
                </div>
              )}
              <Canvas />
            </div>

            {/* Resize Handle */}
            <div className="w-1 bg-border hover:bg-primary/20 transition-colors cursor-col-resize" />

            {/* Right side - Code Panel */}
            <div className="flex-1 min-w-0" style={{ flex: "0 0 40%" }}>
              <CodePanel />
            </div>
          </div>
        );

      case "code":
        return <CodePanel />;

      case "preview":
        return <PreviewFrame />;

      default:
        return <Canvas />;
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={cascadeCollisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Toolbar */}
        <EditorToolbar />

        {/* Main Editor Area */}
        {renderMainContent()}
      </div>

      {/* Drag Overlay */}
      <DragOverlay dropAnimation={null}>
        {activeId &&
          activeData?.type === "registry" &&
          activeData.registryId && (
            <DragOverlayContent registryId={activeData.registryId} />
          )}
        {activeId && activeData?.type === "canvas" && (
          <div className="bg-card border rounded-lg p-4 shadow-2xl opacity-90">
            <span className="text-sm">Moving component...</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

function DragOverlayContent({ registryId }: { registryId: string }) {
  const registryItem = componentRegistry.getById(registryId);
  if (!registryItem) return null;

  return (
    <div className="bg-card border rounded-lg p-4 shadow-2xl opacity-95 w-64">
      <div className="flex items-center gap-2">
        <Badge
          variant={registryItem.source as BadgeProps["variant"]}
          className="text-xs"
        >
          {registryItem.source}
        </Badge>
        <span className="font-medium">{registryItem.displayName}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
        {registryItem.description}
      </p>
    </div>
  );
}
