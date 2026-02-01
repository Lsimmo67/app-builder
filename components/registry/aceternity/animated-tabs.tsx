"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityAnimatedTabsProps {
  tabs?: { title: string; value: string; content?: string; image?: string }[]
  className?: string
  containerClassName?: string
}

function FadeInDiv({ children, className, key: tabKey }: { children: React.ReactNode; className?: string; key?: string }) {
  return (
    <motion.div
      key={tabKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AceternityAnimatedTabs({
  tabs = [
    {
      title: "Product",
      value: "product",
      content: "Build amazing products with our cutting-edge tools and frameworks. Ship faster, iterate quickly.",
      image: "https://placehold.co/800x400/1a1a2e/ffffff?text=Product",
    },
    {
      title: "Services",
      value: "services",
      content: "Professional services to help you scale your business. From consulting to implementation.",
      image: "https://placehold.co/800x400/16213e/ffffff?text=Services",
    },
    {
      title: "Playground",
      value: "playground",
      content: "Try out our components in a live playground. Experiment with props and see results instantly.",
      image: "https://placehold.co/800x400/0f3460/ffffff?text=Playground",
    },
    {
      title: "Content",
      value: "content",
      content: "Rich content management with flexible layouts. Write once, publish everywhere.",
      image: "https://placehold.co/800x400/533483/ffffff?text=Content",
    },
    {
      title: "Random",
      value: "random",
      content: "Explore random possibilities with generative content and unexpected combinations.",
      image: "https://placehold.co/800x400/e94560/ffffff?text=Random",
    },
  ],
  className,
  containerClassName,
}: AceternityAnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value || "")

  const activeTabData = tabs.find((t) => t.value === activeTab)

  return (
    <div className={cn("flex flex-col items-center w-full max-w-5xl mx-auto", containerClassName)}>
      {/* Tab bar */}
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          className
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
              activeTab === tab.value
                ? "text-white"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
          >
            {activeTab === tab.value && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 bg-black dark:bg-white/20 rounded-full z-0"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.title}</span>
          </button>
        ))}
      </div>
      {/* Tab content */}
      <div className="mt-8 w-full">
        {activeTabData && (
          <FadeInDiv key={activeTabData.value}>
            <div className="w-full overflow-hidden relative rounded-2xl p-10 bg-gradient-to-br from-purple-700 to-violet-900 text-white">
              {activeTabData.image && (
                <img
                  src={activeTabData.image}
                  alt={activeTabData.title}
                  className="w-full h-60 object-cover rounded-xl mb-6"
                />
              )}
              <h3 className="text-2xl font-bold mb-3">{activeTabData.title}</h3>
              {activeTabData.content && (
                <p className="text-white/80 text-sm leading-relaxed">
                  {activeTabData.content}
                </p>
              )}
            </div>
          </FadeInDiv>
        )}
      </div>
    </div>
  )
}
