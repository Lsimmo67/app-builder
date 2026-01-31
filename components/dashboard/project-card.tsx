'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  MoreHorizontal,
  Pencil,
  Copy,
  Trash2,
  ExternalLink,
  Loader2,
} from 'lucide-react'
import type { Project } from '@/types'
import { useProjectStore } from '@/lib/store'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDuplicating, setIsDuplicating] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const deleteProject = useProjectStore((state) => state.deleteProject)
  const duplicateProject = useProjectStore((state) => state.duplicateProject)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) return

    setIsDeleting(true)
    try {
      await deleteProject(project.id)
    } catch (error) {
      console.error('Failed to delete project:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDuplicate = async () => {
    setIsDuplicating(true)
    try {
      await duplicateProject(project.id)
    } catch (error) {
      console.error('Failed to duplicate project:', error)
    } finally {
      setIsDuplicating(false)
    }
  }

  return (
    <Card
      className="group relative overflow-hidden transition-all hover:shadow-lg hover:border-primary/50"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Thumbnail / Preview */}
      <div className="aspect-video bg-muted relative overflow-hidden">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/10">
            <span className="text-4xl font-bold text-muted-foreground/30">
              {project.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Overlay Actions */}
        <div
          className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity ${
            showActions ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="secondary" asChild>
                <Link href={`/projects/${project.id}/editor`}>
                  <Pencil className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleDuplicate}
                disabled={isDuplicating}
              >
                {isDuplicating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Duplicate</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold truncate">{project.name}</h3>
        {project.description && (
          <p className="text-sm text-muted-foreground truncate mt-1">
            {project.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
        Updated {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
      </CardFooter>
    </Card>
  )
}
