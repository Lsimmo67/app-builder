'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Sparkles,
  Send,
  Loader2,
  Check,
  X,
  Undo2,
  Wand2,
  AlertCircle,
  ChevronRight,
} from 'lucide-react'
import { useEditorStore, useCanvasStore } from '@/lib/store'
import { componentRegistry } from '@/lib/components-registry'
import { cn } from '@/lib/utils'
import type { AIEditResponse, AIEditSuggestion } from '@/app/api/ai/edit/route'

interface ConversationEntry {
  id: string
  role: 'user' | 'assistant'
  content: string
  suggestions?: AIEditSuggestion[]
  appliedSuggestions?: Set<number>
  timestamp: Date
}

export function AIAssistantPanel() {
  const [open, setOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversation, setConversation] = useState<ConversationEntry[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { selectedComponentId } = useEditorStore()
  const { components, updateComponent } = useCanvasStore()

  const selectedComponent = components.find((c) => c.id === selectedComponentId)
  const registryItem = selectedComponent
    ? componentRegistry.getById(selectedComponent.componentRegistryId)
    : null

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [conversation])

  // Focus input when panel opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim() || !selectedComponent) return

    const userEntry: ConversationEntry = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    }

    setConversation((prev) => [...prev, userEntry])
    setPrompt('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          componentName:
            selectedComponent.displayName ||
            registryItem?.displayName ||
            selectedComponent.componentRegistryId,
          componentProps: selectedComponent.props,
          componentStyles: selectedComponent.styles || {},
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data: AIEditResponse = await response.json()

      const assistantEntry: ConversationEntry = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.message,
        suggestions: data.suggestions,
        appliedSuggestions: new Set(),
        timestamp: new Date(),
      }

      setConversation((prev) => [...prev, assistantEntry])
    } catch {
      const errorEntry: ConversationEntry = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Failed to process your request. Please try again.',
        timestamp: new Date(),
      }
      setConversation((prev) => [...prev, errorEntry])
    } finally {
      setIsLoading(false)
    }
  }, [prompt, selectedComponent, registryItem])

  const handleApplySuggestion = useCallback(
    (entryId: string, suggestionIndex: number, suggestion: AIEditSuggestion) => {
      if (!selectedComponent) return

      if (suggestion.type === 'styles') {
        updateComponent(selectedComponent.id, {
          styles: {
            ...selectedComponent.styles,
            ...suggestion.changes,
          },
        })
      } else if (suggestion.type === 'props') {
        updateComponent(selectedComponent.id, {
          props: {
            ...selectedComponent.props,
            ...suggestion.changes,
          },
        })
      }

      // Mark as applied
      setConversation((prev) =>
        prev.map((entry) => {
          if (entry.id === entryId) {
            const applied = new Set(entry.appliedSuggestions)
            applied.add(suggestionIndex)
            return { ...entry, appliedSuggestions: applied }
          }
          return entry
        })
      )
    },
    [selectedComponent, updateComponent]
  )

  const quickActions = [
    'Make it bigger',
    'Center content',
    'Add shadow',
    'Add padding',
    'Make bold',
    'Full width',
    'Add rounded corners',
    'Stack vertically',
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Sparkles className="h-4 w-4" />
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>AI Assistant</TooltipContent>
      </Tooltip>

      <SheetContent className="w-[380px] sm:max-w-[380px] p-0 flex flex-col">
        <SheetHeader className="p-4 pb-2">
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Edit with AI
          </SheetTitle>
          <SheetDescription>
            Describe what changes you want to make to the selected component.
          </SheetDescription>
        </SheetHeader>

        {/* Selected component info */}
        {selectedComponent ? (
          <div className="mx-4 mb-2 px-3 py-2 bg-muted rounded-lg flex items-center gap-2">
            <Wand2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">
                {selectedComponent.displayName ||
                  registryItem?.displayName ||
                  'Component'}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {selectedComponent.source} &middot; {selectedComponent.componentRegistryId}
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-4 mb-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-400">
              Select a component on the canvas first
            </p>
          </div>
        )}

        {/* Conversation */}
        <ScrollArea className="flex-1 min-h-0" ref={scrollRef}>
          <div className="px-4 space-y-3 pb-4">
            {conversation.length === 0 && (
              <div className="text-center py-6">
                <Sparkles className="h-8 w-8 mx-auto mb-3 text-muted-foreground/30" />
                <p className="text-sm font-medium mb-1">How can I help?</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Tell me what to change. Try a quick action:
                </p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {quickActions.map((action) => (
                    <Button
                      key={action}
                      variant="outline"
                      size="sm"
                      className="h-7 text-[10px] px-2"
                      disabled={!selectedComponent}
                      onClick={() => {
                        setPrompt(action)
                        setTimeout(() => inputRef.current?.focus(), 0)
                      }}
                    >
                      <ChevronRight className="h-3 w-3 mr-0.5" />
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {conversation.map((entry) => (
              <div
                key={entry.id}
                className={cn(
                  'rounded-lg p-3',
                  entry.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-8'
                    : 'bg-muted mr-4'
                )}
              >
                <p className="text-xs">{entry.content}</p>

                {/* Suggestions */}
                {entry.suggestions && entry.suggestions.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    {entry.suggestions.map((suggestion, idx) => {
                      const isApplied = entry.appliedSuggestions?.has(idx)
                      return (
                        <div
                          key={idx}
                          className={cn(
                            'flex items-start gap-2 p-2 rounded border bg-background',
                            isApplied && 'bg-green-500/10 border-green-500/30'
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <Badge
                                variant={
                                  suggestion.type === 'styles'
                                    ? 'default'
                                    : suggestion.type === 'props'
                                    ? 'secondary'
                                    : 'outline'
                                }
                                className="text-[8px] px-1 py-0"
                              >
                                {suggestion.type}
                              </Badge>
                            </div>
                            <p className="text-[10px] text-muted-foreground">
                              {suggestion.description}
                            </p>
                            {suggestion.type !== 'info' &&
                              Object.keys(suggestion.changes).length > 0 && (
                                <div className="mt-1 text-[9px] font-mono text-muted-foreground/70">
                                  {Object.entries(suggestion.changes)
                                    .slice(0, 3)
                                    .map(([k, v]) => (
                                      <div key={k}>
                                        {k}: {String(v)}
                                      </div>
                                    ))}
                                  {Object.keys(suggestion.changes).length > 3 && (
                                    <div>
                                      +{Object.keys(suggestion.changes).length - 3} more
                                    </div>
                                  )}
                                </div>
                              )}
                          </div>
                          {suggestion.type !== 'info' && (
                            <Button
                              variant={isApplied ? 'ghost' : 'outline'}
                              size="sm"
                              className="h-6 text-[9px] px-2 shrink-0"
                              disabled={isApplied}
                              onClick={() =>
                                handleApplySuggestion(entry.id, idx, suggestion)
                              }
                            >
                              {isApplied ? (
                                <>
                                  <Check className="h-3 w-3 mr-0.5" />
                                  Applied
                                </>
                              ) : (
                                'Apply'
                              )}
                            </Button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="bg-muted rounded-lg p-3 mr-4 flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span className="text-xs text-muted-foreground">Thinking...</span>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 pt-2 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className="flex gap-2"
          >
            <Input
              ref={inputRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                selectedComponent
                  ? 'Describe the change...'
                  : 'Select a component first'
              }
              disabled={!selectedComponent || isLoading}
              className="h-9 text-sm"
            />
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 shrink-0"
              disabled={!prompt.trim() || !selectedComponent || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
          {conversation.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-1.5 h-7 text-xs text-muted-foreground"
              onClick={() => setConversation([])}
            >
              <X className="h-3 w-3 mr-1" />
              Clear conversation
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
