'use client'

import { cn } from '@/lib/utils/cn'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ShadcnBlogGridProps {
  headline?: string
  description?: string
  posts?: { title: string; excerpt: string; category: string; date: string; imageSrc?: string }[]
  className?: string
}

export default function ShadcnBlogGrid({
  headline = 'Latest from the blog',
  description = 'Insights, tutorials, and updates from our team.',
  posts = [
    { title: 'Getting Started with Our Platform', excerpt: 'Learn how to set up your first project and start building in minutes.', category: 'Tutorial', date: 'Jan 15, 2024', imageSrc: '' },
    { title: 'Best Practices for Component Design', excerpt: 'Discover the patterns and principles that make components reusable and maintainable.', category: 'Engineering', date: 'Jan 10, 2024', imageSrc: '' },
    { title: 'Announcing Our New Pricing Plans', excerpt: 'We are introducing more flexible pricing to better serve teams of all sizes.', category: 'News', date: 'Jan 5, 2024', imageSrc: '' },
  ],
  className,
}: ShadcnBlogGridProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post, index) => (
            <Card key={index} className="overflow-hidden bg-background hover:shadow-md transition-shadow cursor-pointer">
              <div className="aspect-video bg-muted flex items-center justify-center">
                {post.imageSrc ? (
                  <img src={post.imageSrc} alt={post.title} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-muted-foreground text-sm">Image</span>
                )}
              </div>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
