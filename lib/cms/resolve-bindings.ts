import type { ComponentInstance, ElementStyles } from '@/types'
import type { CMSCollection, CMSItem } from '@/types'

export interface ResolvedBindings {
  resolvedProps: Record<string, unknown>
  resolvedStyles: Record<string, string>
}

export function resolveBindings(
  instance: ComponentInstance,
  collections: CMSCollection[],
  items: CMSItem[]
): ResolvedBindings {
  const resolvedProps: Record<string, unknown> = {}
  const resolvedStyles: Record<string, string> = {}

  if (!instance.cmsBindings || instance.cmsBindings.length === 0) {
    return { resolvedProps, resolvedStyles }
  }

  for (const binding of instance.cmsBindings) {
    const collection = collections.find(c => c.id === binding.collectionId)
    if (!collection) continue

    const collectionItems = items.filter(
      item => item.collectionId === binding.collectionId && item.status === 'published'
    )
    if (collectionItems.length === 0) continue

    const firstItem = collectionItems[0]
    const fieldValue = firstItem.data[binding.fieldSlug]
    if (fieldValue === undefined) continue

    switch (binding.targetType) {
      case 'prop':
        resolvedProps[binding.targetKey] = fieldValue
        break
      case 'text':
        resolvedProps['children'] = String(fieldValue)
        break
      case 'src':
        resolvedProps['src'] = String(fieldValue)
        break
      case 'href':
        resolvedProps['href'] = String(fieldValue)
        break
      case 'style':
        resolvedStyles[binding.targetKey] = String(fieldValue)
        break
    }
  }

  return { resolvedProps, resolvedStyles }
}

export function resolveAllBindings(
  instance: ComponentInstance,
  collections: CMSCollection[],
  items: CMSItem[]
): { props: Record<string, unknown>; styles: ElementStyles | undefined } {
  const { resolvedProps, resolvedStyles } = resolveBindings(instance, collections, items)

  const mergedProps = { ...instance.props, ...resolvedProps }
  const mergedStyles = instance.styles
    ? { ...instance.styles, ...resolvedStyles } as ElementStyles
    : Object.keys(resolvedStyles).length > 0
      ? resolvedStyles as unknown as ElementStyles
      : undefined

  return { props: mergedProps, styles: mergedStyles }
}
