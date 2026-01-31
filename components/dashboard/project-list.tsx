'use client'

import { useEffect } from 'react'
import { ProjectCard } from './project-card'
import { useProjectStore } from '@/lib/store'
import { Loader2, FolderOpen } from 'lucide-react'

export function ProjectList() {
  const { projects, isLoading, error, loadProjects } = useProjectStore()

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Error loading projects: {error}</p>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
        <p className="text-muted-foreground">
          Create your first project to get started building beautiful pages.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
