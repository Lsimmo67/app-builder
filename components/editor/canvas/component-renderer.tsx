'use client'

import { Suspense, useMemo } from 'react'
import { getComponent, isComponentAvailable } from '@/lib/component-loader'
import { ComponentErrorBoundary } from './error-boundary'
import { Loader2 } from 'lucide-react'

interface ComponentRendererProps {
  registryId: string
  props: Record<string, unknown>
  componentName?: string
}

function ComponentSkeleton() {
  return (
    <div className="flex items-center justify-center py-16 bg-muted/30 rounded-lg animate-pulse">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  )
}

function ComponentPlaceholder({ registryId, componentName }: { registryId: string; componentName?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-muted/20 rounded-lg border border-dashed">
      <p className="text-sm font-medium text-muted-foreground">{componentName || registryId}</p>
      <p className="text-xs text-muted-foreground/60 mt-1">No implementation available</p>
    </div>
  )
}

export function ComponentRenderer({ registryId, props, componentName }: ComponentRendererProps) {
  const LazyComponent = useMemo(() => getComponent(registryId), [registryId])

  if (!LazyComponent || !isComponentAvailable(registryId)) {
    return <ComponentPlaceholder registryId={registryId} componentName={componentName} />
  }

  return (
    <ComponentErrorBoundary componentName={componentName || registryId}>
      <Suspense fallback={<ComponentSkeleton />}>
        <LazyComponent {...props} />
      </Suspense>
    </ComponentErrorBoundary>
  )
}
