'use client'

import React, { Suspense, useMemo } from 'react'
import { getComponent, isComponentAvailable } from '@/lib/component-loader'

function PreviewErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    setHasError(false)
  }, [children])

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
        Preview unavailable
      </div>
    )
  }

  return (
    <ErrorBoundaryInner onError={() => setHasError(true)}>
      {children}
    </ErrorBoundaryInner>
  )
}

class ErrorBoundaryInner extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    this.props.onError()
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

interface ComponentPreviewProps {
  registryId: string
  defaultProps?: Record<string, unknown>
}

export function ComponentPreview({ registryId, defaultProps = {} }: ComponentPreviewProps) {
  const available = isComponentAvailable(registryId)

  const Component = useMemo(() => {
    if (!available) return null
    try {
      return getComponent(registryId)
    } catch {
      return null
    }
  }, [registryId, available])

  if (!Component) {
    return (
      <div className="flex items-center justify-center h-full text-xs text-muted-foreground bg-muted/30">
        No preview
      </div>
    )
  }

  return (
    <PreviewErrorBoundary>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <div
          className="origin-top-left pointer-events-none select-none"
          style={{
            transform: 'scale(0.25)',
            width: '400%',
            height: '400%',
          }}
        >
          <Component {...defaultProps} />
        </div>
      </Suspense>
    </PreviewErrorBoundary>
  )
}
