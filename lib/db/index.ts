import Dexie, { type Table } from 'dexie'
import type {
  Project,
  DesignSystem,
  Page,
  ComponentInstance,
  HistoryEntry,
  CMSCollection,
  CMSItem,
} from '@/types'

export interface RelumeImport {
  id: string
  pageId: string
  originalUrl?: string
  rawData: string
  mappings: Record<string, string>
  importedAt: Date
}

export class AppBuilderDB extends Dexie {
  projects!: Table<Project>
  designSystems!: Table<DesignSystem>
  pages!: Table<Page>
  componentInstances!: Table<ComponentInstance>
  relumeImports!: Table<RelumeImport>
  history!: Table<HistoryEntry>
  cmsCollections!: Table<CMSCollection>
  cmsItems!: Table<CMSItem>

  constructor() {
    super('AppBuilderDB')

    this.version(1).stores({
      projects: 'id, name, createdAt, updatedAt',
      designSystems: 'id, projectId',
      pages: 'id, projectId, order',
      componentInstances: 'id, pageId, parentId, order',
      relumeImports: 'id, pageId',
      history: 'id, pageId, timestamp',
    })

    this.version(2).stores({
      projects: 'id, name, createdAt, updatedAt',
      designSystems: 'id, projectId',
      pages: 'id, projectId, order',
      componentInstances: 'id, pageId, parentId, order, componentRegistryId',
      relumeImports: 'id, pageId',
      history: 'id, pageId, timestamp',
      cmsCollections: 'id, projectId',
      cmsItems: 'id, collectionId',
    })
  }
}

export const db = new AppBuilderDB()

// Helper functions
export async function getProjectWithDetails(projectId: string) {
  const project = await db.projects.get(projectId)
  if (!project) return null

  const designSystem = await db.designSystems
    .where('projectId')
    .equals(projectId)
    .first()

  const pages = await db.pages
    .where('projectId')
    .equals(projectId)
    .sortBy('order')

  return {
    ...project,
    designSystem,
    pages,
  }
}

export async function getPageWithComponents(pageId: string) {
  const page = await db.pages.get(pageId)
  if (!page) return null

  const components = await db.componentInstances
    .where('pageId')
    .equals(pageId)
    .sortBy('order')

  return {
    ...page,
    components,
  }
}

export async function deleteProject(projectId: string) {
  await db.transaction('rw', [
    db.projects,
    db.designSystems,
    db.pages,
    db.componentInstances,
    db.relumeImports,
    db.history,
  ], async () => {
    // Get all pages for the project
    const pages = await db.pages.where('projectId').equals(projectId).toArray()
    const pageIds = pages.map(p => p.id)

    // Delete all related data
    await db.componentInstances.where('pageId').anyOf(pageIds).delete()
    await db.relumeImports.where('pageId').anyOf(pageIds).delete()
    await db.history.where('pageId').anyOf(pageIds).delete()
    await db.pages.where('projectId').equals(projectId).delete()
    await db.designSystems.where('projectId').equals(projectId).delete()
    await db.projects.delete(projectId)
  })
}
