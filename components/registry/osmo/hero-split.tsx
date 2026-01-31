'use client'

import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  subheadline?: string
  buttonText?: string
  imagePosition?: 'left' | 'right'
  className?: string
}

export default function HeroSplit({
  headline = 'Design. Build. Ship. All in one place.',
  subheadline = 'Empower your team with the tools they need to create world-class digital products. From concept to deployment, streamline every step of your workflow.',
  buttonText = 'Start Building',
  imagePosition = 'right',
  className,
}: Props) {
  const textContent = (
    <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:py-0">
      <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
        {headline}
      </h1>
      <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
        {subheadline}
      </p>
      <div className="mt-8">
        <button className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {buttonText}
        </button>
      </div>
    </div>
  )

  const imageContent = (
    <div className="flex items-center justify-center px-6 py-12 md:px-12 lg:py-0">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
        <div className="flex h-full w-full items-center justify-center">
          <svg
            className="h-16 w-16 text-muted-foreground/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
            />
          </svg>
        </div>
      </div>
    </div>
  )

  return (
    <section
      className={cn(
        'min-h-[80vh] bg-background',
        className,
      )}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
        {imagePosition === 'left' ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </section>
  )
}
