"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils/cn"

export interface ShadcnTableProps {
  headers?: string[]
  rows?: string[][]
  caption?: string
  striped?: boolean
  className?: string
}

export default function ShadcnTable({
  headers = ["Invoice", "Status", "Method", "Amount"],
  rows = [
    ["INV001", "Paid", "Credit Card", "$250.00"],
    ["INV002", "Pending", "PayPal", "$150.00"],
    ["INV003", "Unpaid", "Bank Transfer", "$350.00"],
  ],
  caption,
  striped = false,
  className,
}: ShadcnTableProps) {
  return (
    <Table className={cn(className)}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {headers.map((header, i) => (
            <TableHead key={i} className={i === headers.length - 1 ? "text-right" : ""}>
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className={cn(striped && rowIndex % 2 === 1 && "bg-muted/50")}
          >
            {row.map((cell, cellIndex) => (
              <TableCell
                key={cellIndex}
                className={cn(
                  cellIndex === 0 && "font-medium",
                  cellIndex === row.length - 1 && "text-right"
                )}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
