import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { db } from '@/lib/db'
import { nanoid } from 'nanoid'
import type { MediaAsset } from '@/types'

interface MediaState {
  assets: MediaAsset[]
  isLoading: boolean
  error: string | null

  loadAssets: (projectId: string) => Promise<void>
  addAsset: (asset: Omit<MediaAsset, 'id' | 'createdAt'>) => Promise<MediaAsset>
  removeAsset: (id: string) => Promise<void>
  updateAsset: (id: string, updates: Partial<MediaAsset>) => Promise<void>
  clearAssets: () => void
}

export const useMediaStore = create<MediaState>()(
  immer((set, get) => ({
    assets: [],
    isLoading: false,
    error: null,

    loadAssets: async (projectId) => {
      try {
        set((state) => {
          state.isLoading = true
          state.error = null
        })

        const assets = await db.mediaAssets
          .where('projectId')
          .equals(projectId)
          .reverse()
          .sortBy('createdAt')

        set((state) => {
          state.assets = assets
          state.isLoading = false
        })
      } catch (error) {
        set((state) => {
          state.error = (error as Error).message
          state.isLoading = false
        })
      }
    },

    addAsset: async (assetData) => {
      try {
        set((state) => { state.error = null })

        const asset: MediaAsset = {
          ...assetData,
          id: nanoid(),
          createdAt: new Date(),
        }

        await db.mediaAssets.add(asset)

        set((state) => {
          state.assets.unshift(asset)
        })

        return asset
      } catch (error) {
        set((state) => { state.error = (error as Error).message })
        throw error
      }
    },

    removeAsset: async (id) => {
      try {
        set((state) => { state.error = null })
        await db.mediaAssets.delete(id)
        set((state) => {
          state.assets = state.assets.filter((a) => a.id !== id)
        })
      } catch (error) {
        set((state) => { state.error = (error as Error).message })
      }
    },

    updateAsset: async (id, updates) => {
      try {
        set((state) => { state.error = null })
        await db.mediaAssets.update(id, updates)
        set((state) => {
          const index = state.assets.findIndex((a) => a.id === id)
          if (index !== -1) {
            state.assets[index] = { ...state.assets[index], ...updates }
          }
        })
      } catch (error) {
        set((state) => { state.error = (error as Error).message })
      }
    },

    clearAssets: () =>
      set((state) => {
        state.assets = []
      }),
  }))
)
