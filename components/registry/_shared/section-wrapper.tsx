import { cn } from '@/lib/utils/cn'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section id={id} className={cn('py-24 px-6', className)}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}

export default SectionWrapper
