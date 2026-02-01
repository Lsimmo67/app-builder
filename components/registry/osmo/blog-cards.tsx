'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface BlogPost {
  category?: string
  date?: string
  title: string
  excerpt: string
  imageAlt?: string
}

interface Props {
  headline?: string
  subheadline?: string
  posts?: BlogPost[]
  className?: string
}

const defaultPosts: BlogPost[] = [
  {
    category: 'Engineering',
    date: 'Jan 15, 2025',
    title: 'Building Scalable APIs with Modern Architecture',
    excerpt:
      'Learn how we redesigned our API layer to handle 10x more traffic while reducing latency by 40%. A deep dive into our engineering decisions.',
    imageAlt: 'API architecture diagram',
  },
  {
    category: 'Product',
    date: 'Jan 8, 2025',
    title: 'Introducing Our New Dashboard Experience',
    excerpt:
      'We rebuilt the dashboard from the ground up with a focus on speed, clarity, and actionable insights. Here is what changed and why.',
    imageAlt: 'New dashboard screenshot',
  },
  {
    category: 'Company',
    date: 'Dec 20, 2024',
    title: 'Our Journey to 10,000 Customers',
    excerpt:
      'Reflecting on the milestones, challenges, and lessons learned as we grew from a small startup to serving thousands of teams worldwide.',
    imageAlt: 'Team celebration photo',
  },
]

const categoryColors: Record<string, string> = {
  Engineering: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  Product: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  Company: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export default function BlogCards({
  headline = 'Latest from our blog',
  subheadline = 'Insights, updates, and stories from our team.',
  posts = defaultPosts,
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            variants={itemVariants}
          >
            {headline}
          </motion.h2>
          <motion.p
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
            variants={itemVariants}
          >
            {subheadline}
          </motion.p>
        </motion.div>
        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {posts.map((post, index) => (
            <motion.article
              key={index}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                transition: { duration: 0.25, ease: 'easeOut' as const },
              }}
            >
              <div className="flex h-48 items-center justify-center bg-muted">
                <svg
                  className="h-12 w-12 text-muted-foreground/40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                  />
                </svg>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  {post.category && (
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-xs font-medium',
                        categoryColors[post.category] || 'bg-muted text-muted-foreground',
                      )}
                    >
                      {post.category}
                    </span>
                  )}
                  {post.date && (
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read more
                    <motion.svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      whileHover={{ x: 3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </motion.svg>
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
