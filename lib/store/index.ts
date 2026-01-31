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
// EDITOR STATE
// ============================================

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
}

export const useEditorStore = create<EditorState>()(
  persist(
    immer((set) => ({
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

// ============================================
// PROJECT STATE
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

      // Get original design system
      const originalDS = await db.designSystems
        .where('projectId')
        .equals(id)
        .first()

      // Get original pages and components
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
        // Create new project
        await db.projects.add(newProject)

        // Duplicate design system
        if (originalDS) {
          await db.designSystems.add({
            ...originalDS,
            id: newDesignSystemId,
            projectId: newProjectId,
          })
        }

        // Duplicate pages and components
        for (const page of originalPages) {
          const newPageId = nanoid()

          await db.pages.add({
            ...page,
            id: newPageId,
            projectId: newProjectId,
            createdAt: now,
            updatedAt: now,
          })

          // Duplicate components
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
  }))
)

// ============================================
// CANVAS STATE
// ============================================

interface CanvasState {
  // Components on canvas
  components: ComponentInstance[]
  
  // Drag state
  isDragging: boolean
  dragSource: 'library' | 'canvas' | null
  dragComponentId: string | null

  // Actions
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

    loadComponents: async (pageId) => {
      const components = await db.componentInstances
        .where('pageId')
        .equals(pageId)
        .sortBy('order')

      set((state) => {
        state.components = components
      })
    },

    addComponent: async (componentData) => {
      const { components } = get()
      const maxOrder = Math.max(...components.map((c) => c.order), -1)

      // Check if it's already a full ComponentInstance (with id)
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
    },

    updateComponent: async (id, updates) => {
      await db.componentInstances.update(id, updates)

      set((state) => {
        const index = state.components.findIndex((c) => c.id === id)
        if (index !== -1) {
          state.components[index] = { ...state.components[index], ...updates }
        }
      })
    },

    removeComponent: async (id) => {
      await db.componentInstances.delete(id)

      set((state) => {
        state.components = state.components.filter((c) => c.id !== id)
      })
    },

    moveComponent: async (id, newOrder, newParentId) => {
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
        // Re-sort components
        state.components.sort((a, b) => a.order - b.order)
      })
    },

    duplicateComponent: async (id) => {
      const original = get().components.find((c) => c.id === id)
      if (!original) return

      const maxOrder = Math.max(...get().components.map((c) => c.order), -1)

      const duplicate: ComponentInstance = {
        ...original,
        id: nanoid(),
        order: maxOrder + 1,
      }

      await db.componentInstances.add(duplicate)

      set((state) => {
        state.components.push(duplicate)
      })
    },

    reorderComponents: async (oldIndex, newIndex) => {
      const { components } = get()
      if (oldIndex === newIndex) return
      if (oldIndex < 0 || oldIndex >= components.length) return
      if (newIndex < 0 || newIndex >= components.length) return

      // Create new array with reordered items
      const newComponents = [...components]
      const [movedItem] = newComponents.splice(oldIndex, 1)
      newComponents.splice(newIndex, 0, movedItem)

      // Update order values
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
// DESIGN SYSTEM STATE
// ============================================

interface DesignSystemState {
  designSystem: DesignSystem | null
  isLoading: boolean

  // Actions
  loadDesignSystem: (projectId: string) => Promise<void>
  updateDesignSystem: (updates: Partial<DesignSystem>) => Promise<void>
  applyPreset: (presetId: string) => Promise<void>
}

export const useDesignSystemStore = create<DesignSystemState>()(
  immer((set, get) => ({
    designSystem: null,
    isLoading: false,

    loadDesignSystem: async (projectId) => {
      set((state) => {
        state.isLoading = true
      })

      const designSystem = await db.designSystems
        .where('projectId')
        .equals(projectId)
        .first()

      set((state) => {
        state.designSystem = designSystem || null
        state.isLoading = false
      })
    },

    updateDesignSystem: async (updates) => {
      const { designSystem } = get()
      if (!designSystem) return

      await db.designSystems.update(designSystem.id, updates)

      set((state) => {
        if (state.designSystem) {
          state.designSystem = { ...state.designSystem, ...updates }
        }
      })
    },

    applyPreset: async (presetId) => {
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
    },
  }))
)
