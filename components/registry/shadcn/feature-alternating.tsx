'use client'

import { cn } from '@/lib/utils/cn'

interface ShadcnFeatureAlternatingProps {
  headline?: string
  features?: { title: string; description: string; imageSrc?: string }[]
  className?: string
}

export default function ShadcnFeatureAlternating({
  headline = 'How it works',
  features = [
    { title: 'Design with ease', description: 'Use our intuitive drag-and-drop editor to create stunning layouts without any code. Choose from hundreds of templates or start from scratch.', imageSrc: '' },
    { title: 'Collaborate in real-time', description: 'Work together with your team seamlessly. See changes instantly, leave comments, and ship faster with built-in collaboration tools.', imageSrc: '' },
    { title: 'Launch with confidence', description: 'Deploy to production with one click. Our infrastructure handles scaling, security, and performance so you can focus on your product.', imageSrc: '' },
  ],
  className,
}: ShadcnFeatureAlternatingProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-6xl">
        {headline && (
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-16">
            {headline}
          </h2>
        )}
        <div className="space-y-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                'grid grid-cols-1 items-center gap-12 lg:grid-cols-2',
                index % 2 === 1 && 'lg:[&>*:first-child]:order-2'
              )}
            >
              <div>
                <h3 className="text-2xl font-bold text-foreground sm:text-3xl">{feature.title}</h3>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
              <div className="aspect-video rounded-xl bg-muted border flex items-center justify-center">
                {feature.imageSrc ? (
                  <img src={feature.imageSrc} alt={feature.title} className="h-full w-full object-cover rounded-xl" />
                ) : (
                  <span className="text-muted-foreground text-sm">Image Placeholder</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
