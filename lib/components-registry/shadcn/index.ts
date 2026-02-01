import type { ComponentRegistryItem } from '../types'

export const shadcnComponents: ComponentRegistryItem[] = [
  // === Forms ===
  {
    id: 'shadcn-button',
    name: 'ShadcnButton',
    displayName: 'Button',
    source: 'shadcn',
    categories: ['button'],
    tags: ['cta', 'action', 'click', 'submit'],
    description: 'A versatile button component with multiple variants and sizes',
    previewImage: '',
    props: [
      { name: 'text', type: 'string', required: false, default: 'Button', description: 'Button text', group: 'content' },
      { name: 'variant', type: 'select', required: false, default: 'default', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'], description: 'Visual style', group: 'style' },
      { name: 'size', type: 'select', required: false, default: 'default', options: ['default', 'sm', 'lg', 'icon'], description: 'Button size', group: 'style' },
      { name: 'disabled', type: 'boolean', required: false, default: false, description: 'Disabled state', group: 'behavior' },
      { name: 'loading', type: 'boolean', required: false, default: false, description: 'Loading state with spinner', group: 'behavior' },
    ],
    dependencies: ['@radix-ui/react-slot', 'class-variance-authority', 'lucide-react'],
    dependencyManifest: [
      { package: '@radix-ui/react-slot', version: '^1.2.0' },
      { package: 'class-variance-authority', version: '^0.7.0' },
      { package: 'lucide-react', version: '^0.400.0' },
    ],
    modulePath: 'shadcn-button',
    level: 'primitive',
    code: `import { Button } from "@/components/ui/button"

<Button variant="default" size="default">
  Click me
</Button>`,
    suggestedWith: ['shadcn-card', 'shadcn-input'],
    docsUrl: 'https://ui.shadcn.com/docs/components/button',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-input',
    name: 'ShadcnInput',
    displayName: 'Input',
    source: 'shadcn',
    categories: ['form', 'input'],
    tags: ['text', 'field', 'form', 'email', 'password'],
    description: 'A styled input component with optional label and error message',
    previewImage: '',
    props: [
      { name: 'label', type: 'string', required: false, description: 'Input label text', group: 'content' },
      { name: 'placeholder', type: 'string', required: false, default: 'Enter text...', description: 'Placeholder text', group: 'content' },
      { name: 'type', type: 'select', required: false, default: 'text', options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'], description: 'Input type', group: 'behavior' },
      { name: 'disabled', type: 'boolean', required: false, default: false, description: 'Disabled state', group: 'behavior' },
      { name: 'error', type: 'string', required: false, description: 'Error message', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-label'],
    dependencyManifest: [
      { package: '@radix-ui/react-label', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-input',
    level: 'primitive',
    code: `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="grid gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
    suggestedWith: ['shadcn-button', 'shadcn-card'],
    docsUrl: 'https://ui.shadcn.com/docs/components/input',
    version: '1.0.0',
    acceptsChildren: false,
  },

  // === Feedback ===
  {
    id: 'shadcn-alert',
    name: 'ShadcnAlert',
    displayName: 'Alert',
    source: 'shadcn',
    categories: ['other'],
    tags: ['alert', 'notification', 'message', 'feedback', 'info', 'warning', 'error'],
    description: 'Displays a callout for user attention with icon and text',
    previewImage: '',
    props: [
      { name: 'title', type: 'string', required: false, default: 'Heads up!', description: 'Alert title', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'You can add components to your app using the CLI.', description: 'Alert description', group: 'content' },
      { name: 'variant', type: 'select', required: false, default: 'default', options: ['default', 'destructive', 'success', 'warning'], description: 'Alert variant', group: 'style' },
      { name: 'showIcon', type: 'boolean', required: false, default: true, description: 'Show icon', group: 'style' },
    ],
    dependencies: ['class-variance-authority', 'lucide-react'],
    dependencyManifest: [
      { package: 'class-variance-authority', version: '^0.7.0' },
      { package: 'lucide-react', version: '^0.400.0' },
    ],
    modulePath: 'shadcn-alert',
    level: 'primitive',
    code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components.</AlertDescription>
</Alert>`,
    suggestedWith: ['shadcn-card', 'shadcn-button'],
    docsUrl: 'https://ui.shadcn.com/docs/components/alert',
    version: '1.0.0',
    acceptsChildren: false,
  },

  // === Data Display ===
  {
    id: 'shadcn-card',
    name: 'ShadcnCard',
    displayName: 'Card',
    source: 'shadcn',
    categories: ['card', 'layout'],
    tags: ['container', 'content', 'box', 'panel'],
    description: 'A card component with header, content, image, and footer sections',
    previewImage: '',
    props: [
      { name: 'title', type: 'string', required: false, default: 'Card Title', description: 'Card title', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Card description goes here.', description: 'Card description', group: 'content' },
      { name: 'content', type: 'string', required: false, default: 'This is the card content area. You can place any content here.', description: 'Card body content', group: 'content' },
      { name: 'image', type: 'image', required: false, description: 'Card header image URL', group: 'content' },
      { name: 'imageAlt', type: 'string', required: false, default: 'Card image', description: 'Image alt text', group: 'content' },
      {
        name: 'footerButtons',
        type: 'array',
        required: false,
        default: [{ text: 'Action', variant: 'default' }],
        description: 'Footer action buttons',
        group: 'content',
        itemSchema: [
          { name: 'text', type: 'string', required: true, description: 'Button text' },
          { name: 'variant', type: 'select', required: false, options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'], description: 'Button style' },
        ],
      },
    ],
    dependencies: ['@radix-ui/react-slot', 'class-variance-authority'],
    dependencyManifest: [
      { package: '@radix-ui/react-slot', version: '^1.2.0' },
      { package: 'class-variance-authority', version: '^0.7.0' },
    ],
    modulePath: 'shadcn-card',
    level: 'primitive',
    code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
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
    acceptsChildren: false,
  },

  // === Navigation / Layout ===
  {
    id: 'shadcn-tabs',
    name: 'ShadcnTabs',
    displayName: 'Tabs',
    source: 'shadcn',
    categories: ['navigation', 'layout'],
    tags: ['tabs', 'navigation', 'sections', 'panels'],
    description: 'A tabbed interface component for organizing content into panels',
    previewImage: '',
    props: [
      {
        name: 'tabs',
        type: 'array',
        required: false,
        default: [
          { label: 'Account', value: 'account', content: 'Make changes to your account here.' },
          { label: 'Password', value: 'password', content: 'Change your password here.' },
          { label: 'Settings', value: 'settings', content: 'Manage your settings here.' },
        ],
        description: 'Tab items with label, value, and content',
        group: 'content',
        itemSchema: [
          { name: 'label', type: 'string', required: true, description: 'Tab label' },
          { name: 'value', type: 'string', required: true, description: 'Tab value (unique)' },
          { name: 'content', type: 'string', required: true, description: 'Tab content' },
        ],
      },
      { name: 'defaultValue', type: 'string', required: false, description: 'Default active tab value', group: 'behavior' },
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
    suggestedWith: ['shadcn-card', 'shadcn-button'],
    docsUrl: 'https://ui.shadcn.com/docs/components/tabs',
    version: '1.0.0',
    acceptsChildren: false,
  },
]
