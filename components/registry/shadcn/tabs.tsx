"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils/cn"

export interface TabItem {
  label: string
  value: string
  content: string
}

export interface ShadcnTabsProps {
  tabs?: TabItem[]
  defaultValue?: string
  className?: string
}

export default function ShadcnTabs({
  tabs = [
    { label: "Account", value: "account", content: "Make changes to your account here." },
    { label: "Password", value: "password", content: "Change your password here." },
    { label: "Settings", value: "settings", content: "Manage your settings here." },
  ],
  defaultValue,
  className,
}: ShadcnTabsProps) {
  const activeDefault = defaultValue || (tabs.length > 0 ? tabs[0].value : "")

  return (
    <Tabs defaultValue={activeDefault} className={cn("w-full", className)}>
      <TabsList
        className="grid w-full"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4">
          <p className="text-sm text-muted-foreground">{tab.content}</p>
        </TabsContent>
      ))}
    </Tabs>
  )
}
