import type { ComponentRegistryItem } from '../types'

export const shadcnComponents: ComponentRegistryItem[] = [
  {
    id: 'shadcn-button',
    name: 'Button',
    displayName: 'Button',
    source: 'shadcn',
    categories: ['button'],
    tags: ['cta', 'action', 'click', 'submit'],
    description: 'A versatile button component with multiple variants and sizes',
    previewImage: '/components/shadcn/button.png',
    props: [
      { name: 'children', type: 'string', required: true, description: 'Button text' },
      { name: 'variant', type: 'select', required: false, default: 'default', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
      { name: 'size', type: 'select', required: false, default: 'default', options: ['default', 'sm', 'lg', 'icon'] },
      { name: 'disabled', type: 'boolean', required: false, default: false },
    ],
    dependencies: ['@radix-ui/react-slot', 'class-variance-authority'],
    code: `import { Button } from "@/components/ui/button"

<Button variant="default" size="default">
  Click me
</Button>`,
    suggestedWith: ['shadcn-card', 'aceternity-sparkles'],
    docsUrl: 'https://ui.shadcn.com/docs/components/button',
    version: '1.0.0',
  },
  {
    id: 'shadcn-card',
    name: 'Card',
    displayName: 'Card',
    source: 'shadcn',
    categories: ['card', 'layout'],
    tags: ['container', 'content', 'box'],
    description: 'A card component with header, content, and footer sections',
    previewImage: '/components/shadcn/card.png',
    props: [
      { name: 'title', type: 'string', required: false, description: 'Card title' },
      { name: 'description', type: 'string', required: false, description: 'Card description' },
      { name: 'children', type: 'children', required: true, description: 'Card content' },
    ],
    dependencies: [],
    code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`,
    suggestedWith: ['shadcn-button', 'shadcn-input'],
    docsUrl: 'https://ui.shadcn.com/docs/components/card',
    version: '1.0.0',
  },
  {
    id: 'shadcn-input',
    name: 'Input',
    displayName: 'Input',
    source: 'shadcn',
    categories: ['form', 'input'],
    tags: ['text', 'field', 'form'],
    description: 'A styled input component for forms',
    previewImage: '/components/shadcn/input.png',
    props: [
      { name: 'placeholder', type: 'string', required: false, description: 'Placeholder text' },
      { name: 'type', type: 'select', required: false, default: 'text', options: ['text', 'email', 'password', 'number', 'tel', 'url'] },
      { name: 'disabled', type: 'boolean', required: false, default: false },
    ],
    dependencies: [],
    code: `import { Input } from "@/components/ui/input"

<Input type="email" placeholder="Email" />`,
    suggestedWith: ['shadcn-label', 'shadcn-button'],
    docsUrl: 'https://ui.shadcn.com/docs/components/input',
    version: '1.0.0',
  },
  {
    id: 'shadcn-label',
    name: 'Label',
    displayName: 'Label',
    source: 'shadcn',
    categories: ['form'],
    tags: ['text', 'form', 'accessibility'],
    description: 'An accessible label component for form inputs',
    previewImage: '/components/shadcn/label.png',
    props: [
      { name: 'children', type: 'string', required: true, description: 'Label text' },
      { name: 'htmlFor', type: 'string', required: false, description: 'ID of the input to label' },
    ],
    dependencies: ['@radix-ui/react-label'],
    code: `import { Label } from "@/components/ui/label"

<Label htmlFor="email">Email</Label>`,
    suggestedWith: ['shadcn-input'],
    docsUrl: 'https://ui.shadcn.com/docs/components/label',
    version: '1.0.0',
  },
  {
    id: 'shadcn-dialog',
    name: 'Dialog',
    displayName: 'Dialog / Modal',
    source: 'shadcn',
    categories: ['modal', 'overlay'],
    tags: ['popup', 'modal', 'overlay', 'dialog'],
    description: 'A modal dialog component with customizable content',
    previewImage: '/components/shadcn/dialog.png',
    props: [
      { name: 'title', type: 'string', required: true, description: 'Dialog title' },
      { name: 'description', type: 'string', required: false, description: 'Dialog description' },
      { name: 'children', type: 'children', required: true, description: 'Dialog content' },
    ],
    dependencies: ['@radix-ui/react-dialog'],
    code: `import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <p>Dialog content goes here</p>
  </DialogContent>
</Dialog>`,
    suggestedWith: ['shadcn-button'],
    docsUrl: 'https://ui.shadcn.com/docs/components/dialog',
    version: '1.0.0',
  },
  {
    id: 'shadcn-tabs',
    name: 'Tabs',
    displayName: 'Tabs',
    source: 'shadcn',
    categories: ['navigation', 'layout'],
    tags: ['tabs', 'navigation', 'sections'],
    description: 'A tabbed interface component for organizing content',
    previewImage: '/components/shadcn/tabs.png',
    props: [
      { name: 'defaultValue', type: 'string', required: true, description: 'Default active tab' },
      { name: 'tabs', type: 'array', required: true, description: 'Array of tab items' },
    ],
    dependencies: ['@radix-ui/react-tabs'],
    code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="password">Password settings</TabsContent>
</Tabs>`,
    suggestedWith: ['shadcn-card'],
    docsUrl: 'https://ui.shadcn.com/docs/components/tabs',
    version: '1.0.0',
  },
  {
    id: 'shadcn-accordion',
    name: 'Accordion',
    displayName: 'Accordion',
    source: 'shadcn',
    categories: ['layout', 'faq'],
    tags: ['collapse', 'expandable', 'faq'],
    description: 'A collapsible accordion component for FAQ sections',
    previewImage: '/components/shadcn/accordion.png',
    props: [
      { name: 'type', type: 'select', required: false, default: 'single', options: ['single', 'multiple'] },
      { name: 'items', type: 'array', required: true, description: 'Array of accordion items' },
    ],
    dependencies: ['@radix-ui/react-accordion'],
    code: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    suggestedWith: [],
    docsUrl: 'https://ui.shadcn.com/docs/components/accordion',
    version: '1.0.0',
  },
  {
    id: 'shadcn-avatar',
    name: 'Avatar',
    displayName: 'Avatar',
    source: 'shadcn',
    categories: ['media'],
    tags: ['image', 'user', 'profile'],
    description: 'An avatar component for user images with fallback',
    previewImage: '/components/shadcn/avatar.png',
    props: [
      { name: 'src', type: 'image', required: false, description: 'Image URL' },
      { name: 'alt', type: 'string', required: true, description: 'Alt text' },
      { name: 'fallback', type: 'string', required: true, description: 'Fallback initials' },
    ],
    dependencies: ['@radix-ui/react-avatar'],
    code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
    suggestedWith: ['shadcn-card'],
    docsUrl: 'https://ui.shadcn.com/docs/components/avatar',
    version: '1.0.0',
  },
  {
    id: 'shadcn-badge',
    name: 'Badge',
    displayName: 'Badge',
    source: 'shadcn',
    categories: ['text'],
    tags: ['label', 'tag', 'status'],
    description: 'A badge component for status indicators and labels',
    previewImage: '/components/shadcn/badge.png',
    props: [
      { name: 'children', type: 'string', required: true, description: 'Badge text' },
      { name: 'variant', type: 'select', required: false, default: 'default', options: ['default', 'secondary', 'destructive', 'outline'] },
    ],
    dependencies: ['class-variance-authority'],
    code: `import { Badge } from "@/components/ui/badge"

<Badge variant="default">Badge</Badge>`,
    suggestedWith: ['shadcn-card'],
    docsUrl: 'https://ui.shadcn.com/docs/components/badge',
    version: '1.0.0',
  },
  {
    id: 'shadcn-separator',
    name: 'Separator',
    displayName: 'Separator',
    source: 'shadcn',
    categories: ['layout'],
    tags: ['divider', 'line', 'hr'],
    description: 'A visual separator for content sections',
    previewImage: '/components/shadcn/separator.png',
    props: [
      { name: 'orientation', type: 'select', required: false, default: 'horizontal', options: ['horizontal', 'vertical'] },
    ],
    dependencies: ['@radix-ui/react-separator'],
    code: `import { Separator } from "@/components/ui/separator"

<Separator />`,
    suggestedWith: [],
    docsUrl: 'https://ui.shadcn.com/docs/components/separator',
    version: '1.0.0',
  },
]
