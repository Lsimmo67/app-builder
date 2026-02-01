import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type {
  Project,
  DesignSystem,
  Page,
  ComponentInstance,
  ViewMode,
  PreviewDevice,
} from '@/types'
import { db } from '@/lib/db'
import { nanoid } from 'nanoid'
import { getDefaultPreset } from '@/lib/design-tokens/presets'

// ============================================
// EDITOR STATE (with undo/redo)
// ============================================

const MAX_HISTORY = 50

interface EditorState {
  // View settings
  viewMode: ViewMode
  previewDevice: PreviewDevice
  sidebarOpen: boolean
  propertiesOpen: boolean
  layerTreeOpen: boolean

  // Selection
  selectedComponentId: string | null
  hoveredComponentId: string | null

  // History
  historyIndex: number
  historyStack: string[]

  // Actions
  setViewMode: (mode: ViewMode) => void
  setPreviewDevice: (device: PreviewDevice) => void
  setSidebarOpen: (open: boolean) => void
  setPropertiesOpen: (open: boolean) => void
  setLayerTreeOpen: (open: boolean) => void
  toggleSidebar: () => void
  toggleProperties: () => void
  toggleLayerTree: () => void
  selectComponent: (id: string | null) => void
  setSelectedComponentId: (id: string | null) => void
  hoverComponent: (id: string | null) => void
  setHoveredComponentId: (id: string | null) => void

  // Undo/Redo
  pushHistory: (snapshot: string) => void
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
}

export const useEditorStore = create<EditorState>()(
  persist(
    immer((set, get) => ({
      // Initial state
      viewMode: 'visual',
      previewDevice: 'desktop',
      sidebarOpen: true,
      propertiesOpen: true,
      layerTreeOpen: true,
      selectedComponentId: null,
      hoveredComponentId: null,
      historyIndex: -1,
      historyStack: [],

      // Actions
      setViewMode: (mode) =>
        set((state) => {
          state.viewMode = mode
        }),

      setPreviewDevice: (device) =>
        set((state) => {
          state.previewDevice = device
        }),

      setSidebarOpen: (open) =>
        set((state) => {
          state.sidebarOpen = open
        }),

      setPropertiesOpen: (open) =>
        set((state) => {
          state.propertiesOpen = open
        }),

      setLayerTreeOpen: (open) =>
        set((state) => {
          state.layerTreeOpen = open
        }),

      toggleSidebar: () =>
        set((state) => {
          state.sidebarOpen = !state.sidebarOpen
        }),

      toggleProperties: () =>
        set((state) => {
          state.propertiesOpen = !state.propertiesOpen
        }),

      toggleLayerTree: () =>
        set((state) => {
          state.layerTreeOpen = !state.layerTreeOpen
        }),

      selectComponent: (id) =>
        set((state) => {
          state.selectedComponentId = id
        }),

      setSelectedComponentId: (id) =>
        set((state) => {
          state.selectedComponentId = id
        }),

      hoverComponent: (id) =>
        set((state) => {
          state.hoveredComponentId = id
        }),

      setHoveredComponentId: (id) =>
        set((state) => {
          state.hoveredComponentId = id
        }),

      // Undo/Redo
      pushHistory: (snapshot) =>
        set((state) => {
          // Truncate any redo history beyond current index
          const newStack = state.historyStack.slice(0, state.historyIndex + 1)
          newStack.push(snapshot)
          // Keep max history size
          if (newStack.length > MAX_HISTORY) {
            newStack.shift()
          }
          state.historyStack = newStack
          state.historyIndex = newStack.length - 1
        }),

      undo: () => {
        const { historyIndex, historyStack } = get()
        if (historyIndex <= 0) return

        const newIndex = historyIndex - 1
        const snapshot = historyStack[newIndex]
        if (!snapshot) return

        set((state) => {
          state.historyIndex = newIndex
        })

        // Restore canvas state
        try {
          const components = JSON.parse(snapshot) as ComponentInstance[]
          useCanvasStore.setState({ components })
        } catch {
          // Ignore invalid snapshots
        }
      },

      redo: () => {
        const { historyIndex, historyStack } = get()
        if (historyIndex >= historyStack.length - 1) return

        const newIndex = historyIndex + 1
        const snapshot = historyStack[newIndex]
        if (!snapshot) return

        set((state) => {
          state.historyIndex = newIndex
        })

        // Restore canvas state
        try {
          const components = JSON.parse(snapshot) as ComponentInstance[]
          useCanvasStore.setState({ components })
        } catch {
          // Ignore invalid snapshots
        }
      },

      canUndo: () => {
        const { historyIndex } = get()
        return historyIndex > 0
      },

      canRedo: () => {
        const { historyIndex, historyStack } = get()
        return historyIndex < historyStack.length - 1
      },
    })),
    {
      name: 'app-builder-editor',
      partialize: (state) => ({
        viewMode: state.viewMode,
        sidebarOpen: state.sidebarOpen,
        propertiesOpen: state.propertiesOpen,
        layerTreeOpen: state.layerTreeOpen,
      }),
    }
  )
)

/**
 * Push current canvas state to history.
 * Call this after every canvas mutation.
 */
function pushToHistory() {
  const components = useCanvasStore.getState().components
  const snapshot = JSON.stringify(components)
  useEditorStore.getState().pushHistory(snapshot)
}

// ============================================
// PROJECT STATE (with page CRUD)
// ============================================

interface ProjectState {
  // Current project
  currentProject: Project | null
  currentPage: Page | null
  projects: Project[]
  isLoading: boolean
  error: string | null

  // Actions
  loadProjects: () => Promise<void>
  createProject: (name: string, description?: string) => Promise<Project>
  loadProject: (id: string) => Promise<void>
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  duplicateProject: (id: string) => Promise<Project>
  setCurrentPage: (page: Page | null) => void

  // Page CRUD
  addPage: (name: string, slug: string) => Promise<Page>
  renamePage: (pageId: string, name: string, slug: string) => Promise<void>
  deletePage: (pageId: string) => Promise<void>
}

export const useProjectStore = create<ProjectState>()(
  immer((set, get) => ({
    currentProject: null,
    currentPage: null,
    projects: [],
    isLoading: false,
    error: null,

    loadProjects: async () => {
      set((state) => {
        state.isLoading = true
        state.error = null
      })

      try {
        const projects = await db.projects.orderBy('updatedAt').reverse().toArray()
        set((state) => {
          state.projects = projects
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.error = (error as Error).message
          state.isLoading = false
        })
      }
    },

    createProject: async (name, description) => {
      const projectId = nanoid()
      const designSystemId = nanoid()
      const pageId = nanoid()
      const now = new Date()
      const preset = getDefaultPreset()

      const project: Project = {
        id: projectId,
        name,
        description,
        createdAt: now,
        updatedAt: now,
        designSystemId,
      }

      const designSystem: DesignSystem = {
        id: designSystemId,
        projectId,
        presetId: preset.id,
        ...preset.tokens,
      }

      const page: Page = {
        id: pageId,
        projectId,
        name: 'Home',
        slug: 'home',
        order: 0,
        createdAt: now,
        updatedAt: now,
      }

      await db.transaction('rw', [db.projects, db.designSystems, db.pages], async () => {
        await db.projects.add(project)
        await db.designSystems.add(designSystem)
        await db.pages.add(page)
      })

      set((state) => {
        state.projects.unshift(project)
        state.currentProject = project
        state.currentPage = page
      })

      return project
    },

    loadProject: async (id) => {
      set((state) => {
        state.isLoading = true
        state.error = null
      })

      try {
        const project = await db.projects.get(id)
        if (!project) {
          throw new Error('Project not found')
        }

        const pages = await db.pages
          .where('projectId')
          .equals(id)
          .sortBy('order')

        set((state) => {
          state.currentProject = project
          state.currentPage = pages[0] || null
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.error = (error as Error).message
          state.isLoading = false
        })
      }
    },

    updateProject: async (id, updates) => {
      const updatedProject = {
        ...updates,
        updatedAt: new Date(),
      }

      await db.projects.update(id, updatedProject)

      set((state) => {
        const index = state.projects.findIndex((p) => p.id === id)
        if (index !== -1) {
          state.projects[index] = { ...state.projects[index], ...updatedProject }
        }
        if (state.currentProject?.id === id) {
          state.currentProject = { ...state.currentProject, ...updatedProject }
        }
      })
    },

    deleteProject: async (id) => {
      await db.transaction('rw', [
        db.projects,
        db.designSystems,
        db.pages,
        db.componentInstances,
        db.relumeImports,
        db.history,
      ], async () => {
        const pages = await db.pages.where('projectId').equals(id).toArray()
        const pageIds = pages.map((p) => p.id)

        await db.componentInstances.where('pageId').anyOf(pageIds).delete()
        await db.relumeImports.where('pageId').anyOf(pageIds).delete()
        await db.history.where('pageId').anyOf(pageIds).delete()
        await db.pages.where('projectId').equals(id).delete()
        await db.designSystems.where('projectId').equals(id).delete()
        await db.projects.delete(id)
      })

      set((state) => {
        state.projects = state.projects.filter((p) => p.id !== id)
        if (state.currentProject?.id === id) {
          state.currentProject = null
          state.currentPage = null
        }
      })
    },

    duplicateProject: async (id) => {
      const original = await db.projects.get(id)
      if (!original) {
        throw new Error('Project not found')
      }

      const newProjectId = nanoid()
      const newDesignSystemId = nanoid()
      const now = new Date()

      const originalDS = await db.designSystems
        .where('projectId')
        .equals(id)
        .first()

      const originalPages = await db.pages
        .where('projectId')
        .equals(id)
        .toArray()

      const newProject: Project = {
        ...original,
        id: newProjectId,
        name: `${original.name} (copy)`,
        designSystemId: newDesignSystemId,
        createdAt: now,
        updatedAt: now,
      }

      await db.transaction('rw', [
        db.projects,
        db.designSystems,
        db.pages,
        db.componentInstances,
      ], async () => {
        await db.projects.add(newProject)

        if (originalDS) {
          await db.designSystems.add({
            ...originalDS,
            id: newDesignSystemId,
            projectId: newProjectId,
          })
        }

        for (const page of originalPages) {
          const newPageId = nanoid()

          await db.pages.add({
            ...page,
            id: newPageId,
            projectId: newProjectId,
            createdAt: now,
            updatedAt: now,
          })

          const components = await db.componentInstances
            .where('pageId')
            .equals(page.id)
            .toArray()

          for (const comp of components) {
            await db.componentInstances.add({
              ...comp,
              id: nanoid(),
              pageId: newPageId,
            })
          }
        }
      })

      set((state) => {
        state.projects.unshift(newProject)
      })

      return newProject
    },

    setCurrentPage: (page) =>
      set((state) => {
        state.currentPage = page
      }),

    // Page CRUD
    addPage: async (name, slug) => {
      const { currentProject } = get()
      if (!currentProject) throw new Error('No project loaded')

      const existingPages = await db.pages
        .where('projectId')
        .equals(currentProject.id)
        .toArray()

      const pageId = nanoid()
      const now = new Date()
      const page: Page = {
        id: pageId,
        projectId: currentProject.id,
        name,
        slug,
        order: existingPages.length,
        createdAt: now,
        updatedAt: now,
      }

      await db.pages.add(page)
      set((state) => {
        state.currentPage = page
      })
      return page
    },

    renamePage: async (pageId, name, slug) => {
      await db.pages.update(pageId, { name, slug, updatedAt: new Date() })
      set((state) => {
        if (state.currentPage?.id === pageId) {
          state.currentPage = { ...state.currentPage, name, slug }
        }
      })
    },

    deletePage: async (pageId) => {
      await db.transaction('rw', [db.pages, db.componentInstances, db.history], async () => {
        await db.componentInstances.where('pageId').equals(pageId).delete()
        await db.history.where('pageId').equals(pageId).delete()
        await db.pages.delete(pageId)
      })
      set((state) => {
        if (state.currentPage?.id === pageId) {
          state.currentPage = null
        }
      })
    },
  }))
)

// ============================================
// CANVAS STATE (with error handling + history)
// ============================================

interface CanvasState {
  components: ComponentInstance[]
  isDragging: boolean
  dragSource: 'library' | 'canvas' | null
  dragComponentId: string | null
  error: string | null

  loadComponents: (pageId: string) => Promise<void>
  addComponent: (component: ComponentInstance | Omit<ComponentInstance, 'id' | 'order'>) => Promise<void>
  updateComponent: (id: string, updates: Partial<ComponentInstance>) => Promise<void>
  removeComponent: (id: string) => Promise<void>
  moveComponent: (id: string, newOrder: number, newParentId?: string) => Promise<void>
  duplicateComponent: (id: string) => Promise<void>
  reorderComponents: (oldIndex: number, newIndex: number) => Promise<void>
  setDragState: (isDragging: boolean, source?: 'library' | 'canvas', componentId?: string) => void
  clearComponents: () => void
}

export const useCanvasStore = create<CanvasState>()(
  immer((set, get) => ({
    components: [],
    isDragging: false,
    dragSource: null,
    dragComponentId: null,
    error: null,

    loadComponents: async (pageId) => {
      try {
        set((state) => { state.error = null })
        const components = await db.componentInstances
          .where('pageId')
          .equals(pageId)
          .sortBy('order')

        set((state) => {
          state.components = components
        })
        pushToHistory()
      } catch (error) {
        set((state) => { state.error = (error as Error).message })
      }
    },

    addComponent: async (componentData) => {
      try {
        set((state) => { state.error = null })
        const { components } = get()

        // Calculate order relative to siblings (same parentId)
        const parentId = ('parentId' in componentData) ? componentData.parentId : undefined
        const siblings = components.filter((c) => c.parentId === parentId)
        const maxOrder = Math.max(...siblings.map((c) => c.order), -1)

        const component: ComponentInstance = 'id' in componentData && componentData.id
          ? { ...componentData, order: componentData.order ?? maxOrder + 1 } as ComponentInstance
          : {
              ...componentData,
              id: nanoid(),
              order: maxOrder + 1,
            } as ComponentInstance

        await db.componentInstances.add(component)

        set((state) => {
          state.components.push(component)
        })
        pushToHistory()
      } catch (error) {
        set((state) => { state.error = (error as Error).message })
      }
    },

    updateComponent: async (id, updates) => {
      try {
        set((state) => { state.error = null })
        await db.componentInstances.update(id, updates)

        set((state) => {
          const index = state.components.findIndex((c) => c.id === id)
          if (index !== -1) {
            state.components[index] = { ...state.components[index], ...updates }
          }
        })
        pushToHistory()
      } catch (error) {
        set((state) => { state.error = (error as Error).message })
      }
    },

    removeComponent: async (id) => {
      try {
        set((state) => { state.error = null })

        // Collect all descendant IDs (cascade delete)
        const { components } = get()
        const idsToDelete = new Set<string>()
        const collectDescendants = (parentId: string) => {
          idsToDelete.add(parentId)
          components
            .filter((c) => c.parentId === parentId)
            .forEach((c) => collectDescendants(c.id))
        }
        collectDescendants(id)

        // Delete all from DB
        await db.transaction('rw', db.componentInstances, async () => {
          for (const delId of idsToDelete) {
            await db.componentInstances.delete(delId)
          }
        })

        set((state) => {
          state.components = state.components.filter((c) => !idsToDelete.has(c.id))
        })
        pushToHistory()
      } catch (error) {
        set((state) => { state.error = (error as Error).message })
      }
    },

    moveComponent: async (id, newOrder, newParentId) => {
      try {
        set((state) => { state.error = null })
        await db.componentInstances.update(id, {
          order: newOrder,
          parentId: newParentId,
        })

        set((state) => {
          const component = state.components.find((c) => c.id === id)
          if (component) {
            component.order = newOrder
            component.parentId = newParentId
          }
          state.components.sort((a, b) => a.order - b.order)
        })
        pushToHistory()
      } catch (error) {
        set((state) => { state.error = (error as Error).message })
      }
    },

    duplicateComponent: async (id) => {
      try {
        set((state) => { state.error = null })
        const { components } = get()
        const original = components.find((c) => c.id === id)
        if (!original) return

        // Deep clone: duplicate component and all descendants
        const newComponents: ComponentInstance[] = []
        const idMapping = new Map<string, string>() // old ID -> new ID

        const cloneTree = (compId: string, newParentId?: string) => {
          const comp = components.find((c) => c.id === compId)
          if (!comp) return

          const newId = nanoid()
          idMapping.set(compId, newId)

          // Calculate sibling order for this clone
          const siblings = newParentId
            ? [...components, ...newComponents].filter((c) => c.parentId === newParentId)
            : [...components, ...newComponents].filter((c) => c.parentId === comp.parentId)
          const maxOrder = Math.max(...siblings.map((c) => c.order), -1)

          newComponents.push({
            ...comp,
            id: newId,
            parentId: newParentId !== undefined ? newParentId : comp.parentId,
            order: maxOrder + 1,
          })

          // Clone all children
          components
            .filter((c) => c.parentId === compId)
            .sort((a, b) => a.order - b.order)
            .forEach((child) => cloneTree(child.id, newId))
        }

        cloneTree(id)

        // Persist to DB
        await db.transaction('rw', db.componentInstances, async () => {
          for (const comp of newComponents) {
            await db.componentInstances.add(comp)
          }
        })

        set((state) => {
          state.components.push(...newComponents)
        })
        pushToHistory()
      } catch (error) {
        set((state) => { state.error = (error as Error).message })
      }
    },

    reorderComponents: async (oldIndex, newIndex) => {
      try {
        set((state) => { state.error = null })
        const { components } = get()
        if (oldIndex === newIndex) return
        if (oldIndex < 0 || oldIndex >= components.length) return
        if (newIndex < 0 || newIndex >= components.length) return

        const newComponents = [...components]
        const [movedItem] = newComponents.splice(oldIndex, 1)
        newComponents.splice(newIndex, 0, movedItem)

        const updates: Promise<void>[] = newComponents.map((comp, index) => {
          if (comp.order !== index) {
            return db.componentInstances.update(comp.id, { order: index }).then(() => {})
          }
          return Promise.resolve()
        })

        await Promise.all(updates)

        set((state) => {
          state.components = newComponents.map((comp, index) => ({
            ...comp,
            order: index,
          }))
        })
        pushToHistory()
      } catch (error) {
        set((state) => { state.error = (error as Error).message })
      }
    },

    setDragState: (isDragging, source, componentId) =>
      set((state) => {
        state.isDragging = isDragging
        state.dragSource = source || null
        state.dragComponentId = componentId || null
      }),

    clearComponents: () =>
      set((state) => {
        state.components = []
      }),
  }))
)

// ============================================
// DESIGN SYSTEM STATE (with error handling)
// ============================================

interface DesignSystemState {
  designSystem: DesignSystem | null
  isLoading: boolean
  error: string | null

  loadDesignSystem: (projectId: string) => Promise<void>
  updateDesignSystem: (updates: Partial<DesignSystem>) => Promise<void>
  applyPreset: (presetId: string) => Promise<void>
}

export const useDesignSystemStore = create<DesignSystemState>()(
  immer((set, get) => ({
    designSystem: null,
    isLoading: false,
    error: null,

    loadDesignSystem: async (projectId) => {
      try {
        set((state) => {
          state.isLoading = true
          state.error = null
        })

        const designSystem = await db.designSystems
          .where('projectId')
          .equals(projectId)
          .first()

        set((state) => {
          state.designSystem = designSystem || null
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.error = (error as Error).message
          state.isLoading = false
        })
      }
    },

    updateDesignSystem: async (updates) => {
      try {
        set((state) => { state.error = null })
        const { designSystem } = get()
        if (!designSystem) return

        await db.designSystems.update(designSystem.id, updates)

        set((state) => {
          if (state.designSystem) {
            state.designSystem = { ...state.designSystem, ...updates }
          }
        })
      } catch (error) {
        set((state) => { state.error = (error as Error).message })
      }
    },

    applyPreset: async (presetId) => {
      try {
        set((state) => { state.error = null })
        const { designSystem } = get()
        if (!designSystem) return

        const { presets } = await import('@/lib/design-tokens/presets')
        const preset = presets.find((p) => p.id === presetId)
        if (!preset) return

        const updates = {
          presetId,
          ...preset.tokens,
        }

        await db.designSystems.update(designSystem.id, updates)

        set((state) => {
          if (state.designSystem) {
            state.designSystem = { ...state.designSystem, ...updates }
          }
        })
      } catch (error) {
        set((state) => { state.error = (error as Error).message })
      }
    },
  }))
)
