'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Check, X, Code } from 'lucide-react'

interface CodeEditorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customCode: string | undefined
  customStyles: string | undefined
  onSave: (code: string | undefined, styles: string | undefined) => void
  componentName: string
}

export function CodeEditorDialog({
  open,
  onOpenChange,
  customCode,
  customStyles,
  onSave,
  componentName,
}: CodeEditorDialogProps) {
  const [code, setCode] = useState(customCode || '')
  const [styles, setStyles] = useState(customStyles || '')
  const [activeTab, setActiveTab] = useState('styles')

  useEffect(() => {
    if (open) {
      setCode(customCode || '')
      setStyles(customStyles || '')
    }
  }, [open, customCode, customStyles])

  const handleSave = useCallback(() => {
    onSave(code || undefined, styles || undefined)
    onOpenChange(false)
  }, [code, styles, onSave, onOpenChange])

  const handleCancel = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Edit Custom Code - {componentName}
          </DialogTitle>
          <DialogDescription>
            Override component styles with custom CSS, or add custom wrapper code (className overrides).
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="w-full">
            <TabsTrigger value="styles" className="flex-1">
              Custom CSS
            </TabsTrigger>
            <TabsTrigger value="code" className="flex-1">
              Custom className
            </TabsTrigger>
          </TabsList>

          <TabsContent value="styles" className="mt-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                CSS styles applied as inline styles on the component wrapper
              </Label>
              <Textarea
                value={styles}
                onChange={(e) => setStyles(e.target.value)}
                placeholder={`/* Example CSS properties */
padding-top: 2rem;
padding-bottom: 2rem;
background-color: #f8fafc;
border-radius: 1rem;
max-width: 1200px;
margin: 0 auto;`}
                className="min-h-[250px] font-mono text-sm resize-y"
              />
              <p className="text-[10px] text-muted-foreground">
                Write CSS property-value pairs separated by semicolons. These will be applied as inline styles.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="code" className="mt-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                Additional Tailwind/CSS classes to add to the component wrapper
              </Label>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`/* Example class overrides */
bg-gradient-to-b from-blue-50 to-white
py-20 px-8
rounded-2xl shadow-lg
max-w-screen-xl mx-auto`}
                className="min-h-[250px] font-mono text-sm resize-y"
              />
              <p className="text-[10px] text-muted-foreground">
                Add Tailwind CSS classes that will be applied to the component wrapper div.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Check className="h-4 w-4 mr-1" />
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
