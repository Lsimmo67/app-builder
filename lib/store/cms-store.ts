import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { CMSCollection, CMSField, CMSItem } from '@/types'
import { db } from '@/lib/db'
import { nanoid } from 'nanoid'

interface CMSState {
  collections: CMSCollection[]
  items: CMSItem[]
  activeCollectionId: string | null
  isLoading: boolean

  // Collection CRUD
  loadCollections: (projectId: string) => Promise<void>
  createCollection: (projectId: string, name: string, slug: string) => Promise<CMSCollection>
  updateCollection: (id: string, updates: Partial<CMSCollection>) => Promise<void>
  deleteCollection: (id: string) => Promise<void>

  // Field management
  addField: (collectionId: string, field: Omit<CMSField, 'id'>) => Promise<void>
  updateField: (collectionId: string, fieldId: string, updates: Partial<CMSField>) => Promise<void>
  removeField: (collectionId: string, fieldId: string) => Promise<void>
  reorderFields: (collectionId: string, fromIndex: number, toIndex: number) => Promise<void>

  // Item CRUD
  loadItems: (collectionId: string) => Promise<void>
  createItem: (collectionId: string, data: Record<string, unknown>) => Promise<CMSItem>
  updateItem: (id: string, data: Record<string, unknown>) => Promise<void>
  updateItemStatus: (id: string, status: 'draft' | 'published') => Promise<void>
  deleteItem: (id: string) => Promise<void>

  // UI state
  setActiveCollectionId: (id: string | null) => void
}

export const useCMSStore = create<CMSState>()(
  immer((set, get) => ({
    collections: [],
    items: [],
    activeCollectionId: null,
    isLoading: false,

    loadCollections: async (projectId) => {
      set((state) => { state.isLoading = true })
      try {
        const collections = await db.cmsCollections
          .where('projectId')
          .equals(projectId)
          .toArray()
        set((state) => {
          state.collections = collections
          state.isLoading = false
        })
      } catch {
        set((state) => { state.isLoading = false })
      }
    },

    createCollection: async (projectId, name, slug) => {
      const collection: CMSCollection = {
        id: nanoid(),
        projectId,
        name,
        slug,
        fields: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      await db.cmsCollections.add(collection)
      set((state) => {
        state.collections.push(collection)
      })
      return collection
    },

    updateCollection: async (id, updates) => {
      const updatedFields = { ...updates, updatedAt: new Date() }
      await db.cmsCollections.update(id, updatedFields)
      set((state) => {
        const idx = state.collections.findIndex((c) => c.id === id)
        if (idx !== -1) {
          Object.assign(state.collections[idx], updatedFields)
        }
      })
    },

    deleteCollection: async (id) => {
      await db.transaction('rw', [db.cmsCollections, db.cmsItems], async () => {
        await db.cmsItems.where('collectionId').equals(id).delete()
        await db.cmsCollections.delete(id)
      })
      set((state) => {
        state.collections = state.collections.filter((c) => c.id !== id)
        state.items = state.items.filter((i) => i.collectionId !== id)
        if (state.activeCollectionId === id) {
          state.activeCollectionId = null
        }
      })
    },

    addField: async (collectionId, field) => {
      const newField: CMSField = { ...field, id: nanoid() }
      const collection = get().collections.find((c) => c.id === collectionId)
      if (!collection) return

      const updatedFields = [...collection.fields, newField]
      await db.cmsCollections.update(collectionId, {
        fields: updatedFields,
        updatedAt: new Date(),
      })
      set((state) => {
        const col = state.collections.find((c) => c.id === collectionId)
        if (col) {
          col.fields = updatedFields
          col.updatedAt = new Date()
        }
      })
    },

    updateField: async (collectionId, fieldId, updates) => {
      const collection = get().collections.find((c) => c.id === collectionId)
      if (!collection) return

      const updatedFields = collection.fields.map((f) =>
        f.id === fieldId ? { ...f, ...updates } : f
      )
      await db.cmsCollections.update(collectionId, {
        fields: updatedFields,
        updatedAt: new Date(),
      })
      set((state) => {
        const col = state.collections.find((c) => c.id === collectionId)
        if (col) {
          col.fields = updatedFields
          col.updatedAt = new Date()
        }
      })
    },

    removeField: async (collectionId, fieldId) => {
      const collection = get().collections.find((c) => c.id === collectionId)
      if (!collection) return

      const updatedFields = collection.fields.filter((f) => f.id !== fieldId)
      await db.cmsCollections.update(collectionId, {
        fields: updatedFields,
        updatedAt: new Date(),
      })
      set((state) => {
        const col = state.collections.find((c) => c.id === collectionId)
        if (col) {
          col.fields = updatedFields
          col.updatedAt = new Date()
        }
      })
    },

    reorderFields: async (collectionId, fromIndex, toIndex) => {
      const collection = get().collections.find((c) => c.id === collectionId)
      if (!collection) return

      const fields = [...collection.fields]
      const [moved] = fields.splice(fromIndex, 1)
      fields.splice(toIndex, 0, moved)

      await db.cmsCollections.update(collectionId, {
        fields,
        updatedAt: new Date(),
      })
      set((state) => {
        const col = state.collections.find((c) => c.id === collectionId)
        if (col) {
          col.fields = fields
          col.updatedAt = new Date()
        }
      })
    },

    loadItems: async (collectionId) => {
      const items = await db.cmsItems
        .where('collectionId')
        .equals(collectionId)
        .toArray()
      set((state) => {
        // Replace only items for this collection
        state.items = [
          ...state.items.filter((i) => i.collectionId !== collectionId),
          ...items,
        ]
      })
    },

    createItem: async (collectionId, data) => {
      const item: CMSItem = {
        id: nanoid(),
        collectionId,
        data,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      await db.cmsItems.add(item)
      set((state) => {
        state.items.push(item)
      })
      return item
    },

    updateItem: async (id, data) => {
      await db.cmsItems.update(id, { data, updatedAt: new Date() })
      set((state) => {
        const item = state.items.find((i) => i.id === id)
        if (item) {
          item.data = data
          item.updatedAt = new Date()
        }
      })
    },

    updateItemStatus: async (id, status) => {
      await db.cmsItems.update(id, { status, updatedAt: new Date() })
      set((state) => {
        const item = state.items.find((i) => i.id === id)
        if (item) {
          item.status = status
          item.updatedAt = new Date()
        }
      })
    },

    deleteItem: async (id) => {
      await db.cmsItems.delete(id)
      set((state) => {
        state.items = state.items.filter((i) => i.id !== id)
      })
    },

    setActiveCollectionId: (id) => {
      set((state) => {
        state.activeCollectionId = id
      })
      if (id) {
        get().loadItems(id)
      }
    },
  }))
)
