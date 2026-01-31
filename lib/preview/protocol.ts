import type { ComponentInstance } from '@/types/component'
import type { DesignSystem } from '@/types/project'

// Messages from Editor -> Preview iframe
export type EditorToPreviewMessage =
  | { type: 'UPDATE_COMPONENTS'; payload: ComponentInstance[] }
  | { type: 'UPDATE_DESIGN_SYSTEM'; payload: DesignSystem | null }
  | { type: 'SET_SELECTED'; payload: string | null }
  | { type: 'SET_DARK_MODE'; payload: boolean }

// Messages from Preview iframe -> Editor
export type PreviewToEditorMessage =
  | { type: 'PREVIEW_READY' }
  | { type: 'COMPONENT_CLICKED'; payload: string }
  | { type: 'COMPONENT_HOVERED'; payload: string | null }
  | { type: 'CONTENT_HEIGHT'; payload: number }

export type PreviewMessage = EditorToPreviewMessage | PreviewToEditorMessage
