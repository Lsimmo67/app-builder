export type ViewMode = 'visual' | 'split' | 'code' | 'preview'
export type PreviewDevice = 'desktop' | 'tablet' | 'mobile'

export interface CanvasState {
  viewMode: ViewMode
  previewDevice: PreviewDevice
  zoom: number
  selectedComponentId: string | null
  hoveredComponentId: string | null
  isDragging: boolean
  dragSource: 'library' | 'canvas' | null
  dragComponentId: string | null
}

export interface HistoryEntry {
  id: string
  pageId: string
  timestamp: Date
  action: 'add' | 'remove' | 'update' | 'move' | 'batch'
  payload: string
  previousState?: string
}

export interface DropZone {
  id: string
  parentId?: string
  index: number
  rect: DOMRect
}

export const DEVICE_WIDTHS: Record<PreviewDevice, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 375,
}

export const VIEW_MODE_SHORTCUTS: Record<ViewMode, string> = {
  visual: '1',
  split: '2',
  code: '3',
  preview: '4',
}
