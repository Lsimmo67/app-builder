'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface BentoItem {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
  header?: React.ReactNode
}

interface BentoGridProps {
  className?: string
  items?: BentoItem[]
}

const SkeletonHeader = ({ color = 'from-violet-500/20 to-purple-500/20' }: { color?: string }) => (
  <div
    className={cn(
      'flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br',
      color,
      'border border-white/[0.1] bg-neutral-900'
    )}
  />
)

const defaultItems: BentoItem[] = [
  {
    title: 'The Dawn of Innovation',
    description: 'Explore the birth of groundbreaking ideas and inventions.',
    className: 'md:col-span-2',
    header: <SkeletonHeader color="from-cyan-500/20 to-blue-500/20" />,
  },
  {
    title: 'The Digital Revolution',
    description: 'Dive into the transformative power of technology.',
    header: <SkeletonHeader color="from-pink-500/20 to-rose-500/20" />,
  },
  {
    title: 'The Art of Design',
    description: 'Discover the beauty of thoughtful and functional design.',
    header: <SkeletonHeader color="from-amber-500/20 to-orange-500/20" />,
  },
  {
    title: 'The Power of Communication',
    description: 'Understand the impact of effective communication.',
    className: 'md:col-span-2',
    header: <SkeletonHeader color="from-green-500/20 to-emerald-500/20" />,
  },
  {
    title: 'The Pursuit of Knowledge',
    description: 'Join the quest for understanding and enlightenment.',
    className: 'md:col-span-1',
    header: <SkeletonHeader color="from-violet-500/20 to-purple-500/20" />,
  },
  {
    title: 'The Joy of Creation',
    description: 'Experience the thrill of bringing ideas to life.',
    className: 'md:col-span-1',
    header: <SkeletonHeader color="from-teal-500/20 to-cyan-500/20" />,
  },
  {
    title: 'The Spirit of Adventure',
    description: 'Embark on exciting journeys and thrilling discoveries.',
    className: 'md:col-span-1',
    header: <SkeletonHeader color="from-red-500/20 to-rose-500/20" />,
  },
]

export default function BentoGrid({
  className,
  items = defaultItems,
}: BentoGridProps) {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 p-8 md:auto-rows-[18rem] md:grid-cols-3',
        className
      )}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className={cn(
            'group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-white/[0.1] bg-black p-4 shadow-lg transition duration-200 hover:shadow-xl',
            item.className
          )}
        >
          {item.header}
          <div className="transition duration-200 group-hover/bento:translate-x-2">
            <div className="mb-1 mt-2 flex items-center gap-2">
              {item.icon}
              <span className="font-sans text-lg font-bold text-neutral-200">
                {item.title}
              </span>
            </div>
            <p className="font-sans text-sm text-neutral-400">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
