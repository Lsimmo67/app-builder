'use client'

import { cn } from '@/lib/utils/cn'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ShadcnFeatureWithTabsProps {
  headline?: string
  description?: string
  tabs?: { label: string; value: string; title: string; content: string }[]
  className?: string
}

export default function ShadcnFeatureWithTabs({
  headline = 'One platform, endless possibilities',
  description = 'Explore the different ways our platform can help your team succeed.',
  tabs = [
    { label: 'Design', value: 'design', title: 'Powerful Design Tools', content: 'Create beautiful interfaces with our intuitive design system. Drag and drop components, customize themes, and build responsive layouts without writing a single line of CSS.' },
    { label: 'Develop', value: 'develop', title: 'Developer Experience', content: 'Write clean, maintainable code with TypeScript support, hot module replacement, and integrated debugging tools. Our SDK makes it easy to build complex features quickly.' },
    { label: 'Deploy', value: 'deploy', title: 'One-Click Deployment', content: 'Ship to production in seconds with our CI/CD pipeline. Automatic scaling, SSL certificates, and global CDN ensure your app is fast and secure everywhere.' },
  ],
  className,
}: ShadcnFeatureWithTabsProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {description}
          </p>
        </div>
        <Tabs defaultValue={tabs[0]?.value} className="w-full">
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-8">
              <div className="rounded-xl border bg-background p-8">
                <h3 className="text-2xl font-semibold text-foreground">{tab.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{tab.content}</p>
                <div className="mt-6 aspect-video rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Feature Preview</span>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
