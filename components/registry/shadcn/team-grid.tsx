'use client'

import { cn } from '@/lib/utils/cn'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ShadcnTeamGridProps {
  headline?: string
  description?: string
  members?: { name: string; role: string; avatar: string; initials: string }[]
  className?: string
}

export default function ShadcnTeamGrid({
  headline = 'Meet our team',
  description = 'The talented people behind our product.',
  members = [
    { name: 'Sarah Chen', role: 'CEO & Co-Founder', avatar: '', initials: 'SC' },
    { name: 'Marcus Johnson', role: 'CTO & Co-Founder', avatar: '', initials: 'MJ' },
    { name: 'Emily Rodriguez', role: 'Head of Design', avatar: '', initials: 'ER' },
    { name: 'David Kim', role: 'Lead Engineer', avatar: '', initials: 'DK' },
    { name: 'Lisa Thompson', role: 'Product Manager', avatar: '', initials: 'LT' },
    { name: 'Alex Rivera', role: 'Marketing Lead', avatar: '', initials: 'AR' },
  ],
  className,
}: ShadcnTeamGridProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <Card key={index} className="bg-background text-center">
              <CardContent className="pt-6">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-lg">{member.initials}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
