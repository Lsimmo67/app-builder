import { ComponentInstance, ComponentSource } from '@/types/component'

export interface TreeNode {
  id: string
  component: ComponentInstance
  children: TreeNode[]
  depth: number
  isExpanded: boolean
}

export interface LayerTreeState {
  expandedNodes: Set<string>
  draggedNodeId: string | null
  dropTargetId: string | null
  dropPosition: 'before' | 'after' | 'inside' | null
}
