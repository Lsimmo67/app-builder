"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils/cn"

export interface ShadcnPaginationProps {
  totalPages?: number
  currentPage?: number
  siblingCount?: number
  className?: string
}

function generatePages(
  totalPages: number,
  currentPage: number,
  siblingCount: number
): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = []

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const showLeftEllipsis = leftSiblingIndex > 2
  const showRightEllipsis = rightSiblingIndex < totalPages - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = 3 + 2 * siblingCount
    for (let i = 1; i <= Math.min(leftRange, totalPages); i++) {
      pages.push(i)
    }
    pages.push("ellipsis")
    pages.push(totalPages)
  } else if (showLeftEllipsis && !showRightEllipsis) {
    pages.push(1)
    pages.push("ellipsis")
    const rightRange = 3 + 2 * siblingCount
    for (let i = totalPages - rightRange + 1; i <= totalPages; i++) {
      if (i > 1) pages.push(i)
    }
  } else if (showLeftEllipsis && showRightEllipsis) {
    pages.push(1)
    pages.push("ellipsis")
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i)
    }
    pages.push("ellipsis")
    pages.push(totalPages)
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  }

  return pages
}

export default function ShadcnPagination({
  totalPages = 10,
  currentPage = 1,
  siblingCount = 1,
  className,
}: ShadcnPaginationProps) {
  const pages = generatePages(totalPages, currentPage, siblingCount)

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink href="#" isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
