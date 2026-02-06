"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

interface TreeNode {
  label: string
  icon?: string
  children?: TreeNode[]
}

export interface AceternityTreeViewProps {
  data?: TreeNode[]
  className?: string
}

const defaultData: TreeNode[] = [
  {
    label: "src",
    icon: "folder",
    children: [
      {
        label: "components",
        icon: "folder",
        children: [
          { label: "Button.tsx", icon: "file" },
          { label: "Card.tsx", icon: "file" },
          { label: "Modal.tsx", icon: "file" },
        ],
      },
      {
        label: "hooks",
        icon: "folder",
        children: [
          { label: "useAuth.ts", icon: "file" },
          { label: "useTheme.ts", icon: "file" },
        ],
      },
      {
        label: "utils",
        icon: "folder",
        children: [
          { label: "cn.ts", icon: "file" },
          { label: "api.ts", icon: "file" },
        ],
      },
      { label: "App.tsx", icon: "file" },
      { label: "index.ts", icon: "file" },
    ],
  },
  {
    label: "public",
    icon: "folder",
    children: [
      { label: "favicon.ico", icon: "file" },
      { label: "robots.txt", icon: "file" },
    ],
  },
  { label: "package.json", icon: "file" },
  { label: "tsconfig.json", icon: "file" },
]

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [isOpen, setIsOpen] = useState(depth < 1)
  const hasChildren = node.children && node.children.length > 0
  const isFolder = node.icon === "folder" || hasChildren

  return (
    <div>
      <motion.button
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: depth * 0.05 }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-sm transition-colors text-left group",
          hasChildren
            ? "hover:bg-neutral-800/50 cursor-pointer"
            : "hover:bg-neutral-800/30 cursor-default"
        )}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        {/* Expand/collapse chevron */}
        {hasChildren ? (
          <motion.svg
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-3.5 h-3.5 text-neutral-500 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </motion.svg>
        ) : (
          <span className="w-3.5 shrink-0" />
        )}

        {/* Icon */}
        {isFolder ? (
          <motion.svg
            animate={{ scale: isOpen ? 1.05 : 1 }}
            className={cn(
              "w-4 h-4 shrink-0 transition-colors",
              isOpen ? "text-purple-400" : "text-neutral-500"
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {isOpen ? (
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            ) : (
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            )}
          </motion.svg>
        ) : (
          <svg
            className="w-4 h-4 text-neutral-600 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )}

        {/* Label */}
        <span
          className={cn(
            "truncate transition-colors",
            isFolder
              ? isOpen
                ? "text-white font-medium"
                : "text-neutral-300"
              : "text-neutral-400 group-hover:text-neutral-200"
          )}
        >
          {node.label}
        </span>
      </motion.button>

      {/* Children */}
      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="relative">
              {/* Indent guide line */}
              <div
                className="absolute top-0 bottom-0 w-px bg-neutral-800"
                style={{ left: `${depth * 20 + 20}px` }}
              />
              {node.children!.map((child, idx) => (
                <TreeItem key={`${child.label}-${idx}`} node={child} depth={depth + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function AceternityTreeView({
  data = defaultData,
  className,
}: AceternityTreeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "w-full max-w-sm mx-auto rounded-2xl border border-neutral-800 bg-neutral-950 p-3 overflow-hidden",
        className
      )}
    >
      <div className="mb-2 px-2 py-1.5">
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Explorer
        </p>
      </div>
      {data.map((node, idx) => (
        <TreeItem key={`${node.label}-${idx}`} node={node} />
      ))}
    </motion.div>
  )
}
