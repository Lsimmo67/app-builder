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
    dependencyManifest: [
      { package: '@radix-ui/react-slot', version: '^1.2.0' },
      { package: 'class-variance-authority', version: '^0.7.0' },
    ],
    modulePath: 'shadcn-button',
    level: 'primitive',
    code: `import { Button } from "@/components/ui/button"

<Button variant="default" size="default">
  Click me
</Button>`,
    suggestedWith: ['shadcn-card', 'aceternity-sparkles'],
    docsUrl: 'https://ui.shadcn.com/docs/components/button',
    version: '1.0.0',
  },
  {
    id: 'shadcn-button-section',
    name: 'ButtonSection',
    displayName: 'Button Section',
    source: 'shadcn',
    categories: ['button', 'section'],
    tags: ['buttons', 'showcase', 'variants', 'demo'],
    description: 'A section showcasing all button variants, sizes, and states',
    previewImage: '/components/shadcn/button-section.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['@radix-ui/react-slot', 'class-variance-authority'],
    dependencyManifest: [
      { package: '@radix-ui/react-slot', version: '^1.2.0' },
      { package: 'class-variance-authority', version: '^0.7.0' },
    ],
    modulePath: 'shadcn-button-section',
    level: 'section',
    code: `import { Button } from "@/components/ui/button"

<section className="py-24 px-6">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">Buttons</h2>
    <div className="flex flex-wrap gap-4 justify-center">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  </div>
</section>`,
    suggestedWith: ['shadcn-card-section', 'shadcn-button'],
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
    dependencyManifest: [],
    modulePath: 'shadcn-card',
    level: 'primitive',
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
    id: 'shadcn-card-section',
    name: 'CardSection',
    displayName: 'Card Section',
    source: 'shadcn',
    categories: ['card', 'section'],
    tags: ['cards', 'grid', 'showcase', 'features'],
    description: 'A section displaying a grid of card components with various layouts',
    previewImage: '/components/shadcn/card-section.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'cards', type: 'array', required: true, description: 'Array of card data with title, description, and content' },
      { name: 'columns', type: 'select', required: false, default: '3', options: ['2', '3', '4'] },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: [],
    dependencyManifest: [],
    modulePath: 'shadcn-card-section',
    level: 'section',
    code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

<section className="py-24 px-6">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent>{card.content}</CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>`,
    suggestedWith: ['shadcn-card', 'shadcn-button'],
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
    dependencyManifest: [],
    modulePath: 'shadcn-input',
    level: 'primitive',
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
    dependencyManifest: [
      { package: '@radix-ui/react-label', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-label',
    level: 'primitive',
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
    dependencyManifest: [
      { package: '@radix-ui/react-dialog', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-dialog',
    level: 'primitive',
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
    dependencyManifest: [
      { package: '@radix-ui/react-tabs', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-tabs',
    level: 'primitive',
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
    id: 'shadcn-tabs-section',
    name: 'TabsSection',
    displayName: 'Tabs Section',
    source: 'shadcn',
    categories: ['navigation', 'section', 'layout'],
    tags: ['tabs', 'section', 'content', 'organized'],
    description: 'A full section using tabs to organize different content areas',
    previewImage: '/components/shadcn/tabs-section.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'tabs', type: 'array', required: true, description: 'Array of tab objects with label and content' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['@radix-ui/react-tabs'],
    dependencyManifest: [
      { package: '@radix-ui/react-tabs', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-tabs-section',
    level: 'section',
    code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<section className="py-24 px-6">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">Explore Features</h2>
    <Tabs defaultValue="tab-0" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {tabs.map((tab, i) => (
          <TabsTrigger key={i} value={\`tab-\${i}\`}>{tab.label}</TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, i) => (
        <TabsContent key={i} value={\`tab-\${i}\`} className="mt-8">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  </div>
</section>`,
    suggestedWith: ['shadcn-tabs', 'shadcn-card'],
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
    dependencyManifest: [
      { package: '@radix-ui/react-accordion', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-accordion',
    level: 'primitive',
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
    id: 'shadcn-accordion-section',
    name: 'AccordionSection',
    displayName: 'Accordion Section',
    source: 'shadcn',
    categories: ['layout', 'faq', 'section'],
    tags: ['accordion', 'faq', 'section', 'questions'],
    description: 'A full FAQ section built with the accordion component',
    previewImage: '/components/shadcn/accordion-section.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'items', type: 'array', required: true, description: 'Array of FAQ items with question and answer' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['@radix-ui/react-accordion'],
    dependencyManifest: [
      { package: '@radix-ui/react-accordion', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-accordion-section',
    level: 'section',
    code: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

<section className="py-24 px-6">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={\`item-\${i}\`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
</section>`,
    suggestedWith: ['shadcn-accordion', 'osmo-cta-centered'],
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
    dependencyManifest: [
      { package: '@radix-ui/react-avatar', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-avatar',
    level: 'primitive',
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
    dependencyManifest: [
      { package: 'class-variance-authority', version: '^0.7.0' },
    ],
    modulePath: 'shadcn-badge',
    level: 'primitive',
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
    dependencyManifest: [
      { package: '@radix-ui/react-separator', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-separator',
    level: 'primitive',
    code: `import { Separator } from "@/components/ui/separator"

<Separator />`,
    suggestedWith: [],
    docsUrl: 'https://ui.shadcn.com/docs/components/separator',
    version: '1.0.0',
  },
  {
    id: 'shadcn-form',
    name: 'FormSection',
    displayName: 'Form Section',
    source: 'shadcn',
    categories: ['form', 'section'],
    tags: ['form', 'input', 'layout', 'showcase'],
    description: 'A form layout showcase section with labeled inputs and submit actions',
    previewImage: '/components/shadcn/form.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['@radix-ui/react-label'],
    dependencyManifest: [],
    modulePath: 'shadcn-form',
    level: 'section',
    code: `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

<section className="py-24 px-6">
  <div className="max-w-md mx-auto space-y-6">
    <h2 className="text-3xl font-bold text-center">Contact Us</h2>
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <Button className="w-full">Submit</Button>
    </div>
  </div>
</section>`,
    suggestedWith: [],
    docsUrl: 'https://ui.shadcn.com/docs/components/form',
    version: '1.0.0',
  },
  {
    id: 'shadcn-switch',
    name: 'SwitchSettings',
    displayName: 'Switch Settings',
    source: 'shadcn',
    categories: ['form', 'section'],
    tags: ['switch', 'toggle', 'settings', 'panel'],
    description: 'A settings panel with switches for toggling options on and off',
    previewImage: '/components/shadcn/switch.png',
    props: [
      { name: 'headline', type: 'string', required: false, description: 'Section headline' },
      { name: 'className', type: 'string', required: false, description: 'Additional classes' },
    ],
    dependencies: ['@radix-ui/react-switch'],
    dependencyManifest: [],
    modulePath: 'shadcn-switch',
    level: 'section',
    code: `import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<section className="py-24 px-6">
  <div className="max-w-md mx-auto space-y-6">
    <h2 className="text-3xl font-bold text-center">Settings</h2>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications">Notifications</Label>
        <Switch id="notifications" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="darkMode">Dark Mode</Label>
        <Switch id="darkMode" />
      </div>
    </div>
  </div>
</section>`,
    suggestedWith: [],
    docsUrl: 'https://ui.shadcn.com/docs/components/switch',
    version: '1.0.0',
  },
  {
    id: 'shadcn-tooltip',
    name: 'TooltipDemo',
    displayName: 'Tooltip Demo',
    source: 'shadcn',
    categories: ['overlay'],
    tags: ['tooltip', 'hover', 'info', 'showcase'],
    description: 'A tooltip showcase demonstrating hover-activated informational overlays',
    previewImage: '/components/shadcn/tooltip.png',
    props: [
      { name: 'text', type: 'string', required: false, description: 'Tooltip text' },
    ],
    dependencies: ['@radix-ui/react-tooltip'],
    dependencyManifest: [],
    modulePath: 'shadcn-tooltip',
    level: 'primitive',
    code: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    suggestedWith: [],
    docsUrl: 'https://ui.shadcn.com/docs/components/tooltip',
    version: '1.0.0',
  },
]
