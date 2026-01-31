'use client'

import { cn } from '@/lib/utils/cn'

interface TeamMember {
  name: string
  title: string
  initials?: string
}

interface Props {
  headline?: string
  subheadline?: string
  members?: TeamMember[]
  className?: string
}

const defaultMembers: TeamMember[] = [
  {
    name: 'Alex Johnson',
    title: 'CEO & Co-founder',
    initials: 'AJ',
  },
  {
    name: 'Priya Sharma',
    title: 'CTO & Co-founder',
    initials: 'PS',
  },
  {
    name: 'David Kim',
    title: 'Head of Design',
    initials: 'DK',
  },
  {
    name: 'Maria Santos',
    title: 'Head of Engineering',
    initials: 'MS',
  },
]

export default function TeamSection({
  headline = 'Meet the team',
  subheadline = 'We are a passionate group of people building tools that empower creators and developers worldwide.',
  members = defaultMembers,
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {subheadline}
          </p>
        </div>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">
                  {member.initials ||
                    member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {member.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
