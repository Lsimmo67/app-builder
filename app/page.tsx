'use client'

import { CreateProjectDialog } from '@/components/dashboard/create-project-dialog'
import { ProjectList } from '@/components/dashboard/project-list'
import { Layers } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Layers className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">App Builder</h1>
              <p className="text-xs text-muted-foreground">
                5 premium libraries, 1 interface
              </p>
            </div>
          </div>
          <CreateProjectDialog />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Your Projects</h2>
          <p className="text-muted-foreground">
            Build stunning pages with ShadCN UI, Aceternity UI, Osmo Supply, Skiper UI, and GSAP effects.
          </p>
        </div>

        {/* Source Libraries */}
        <div className="flex flex-wrap gap-2 mb-8">
          <div className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium">
            ShadCN UI
          </div>
          <div className="px-3 py-1.5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-medium">
            Aceternity UI
          </div>
          <div className="px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium">
            Osmo Supply
          </div>
          <div className="px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium">
            Skiper UI
          </div>
          <div className="px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
            GSAP Effects
          </div>
        </div>

        <ProjectList />
      </main>
    </div>
  )
}
