import type { ComponentRegistryItem } from '../types'

export const shadcnComponents: ComponentRegistryItem[] = [
  // ============================================================
  // FORMS & INPUTS
  // ============================================================

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
    suggestedWith: ['shadcn-button', 'shadcn-card', 'shadcn-label'],
    docsUrl: 'https://ui.shadcn.com/docs/components/input',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-textarea',
    name: 'ShadcnTextarea',
    displayName: 'Textarea',
    source: 'shadcn',
    categories: ['form', 'input'],
    tags: ['text', 'multiline', 'field', 'form', 'message', 'comment'],
    description: 'A multi-line text area with optional label, resize control, and error display',
    previewImage: '',
    props: [
      { name: 'placeholder', type: 'string', required: false, default: 'Type your message here...', description: 'Placeholder text', group: 'content' },
      { name: 'rows', type: 'number', required: false, default: 4, description: 'Number of visible rows', group: 'style' },
      { name: 'resize', type: 'select', required: false, default: 'vertical', options: ['none', 'vertical', 'horizontal', 'both'], description: 'Resize behavior', group: 'style' },
      { name: 'disabled', type: 'boolean', required: false, default: false, description: 'Disabled state', group: 'behavior' },
      { name: 'label', type: 'string', required: false, description: 'Label text', group: 'content' },
      { name: 'error', type: 'string', required: false, description: 'Error message', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-label'],
    dependencyManifest: [
      { package: '@radix-ui/react-label', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-textarea',
    level: 'primitive',
    code: `import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your Message</Label>
  <Textarea id="message" placeholder="Type your message here..." />
</div>`,
    suggestedWith: ['shadcn-button', 'shadcn-label', 'shadcn-input'],
    docsUrl: 'https://ui.shadcn.com/docs/components/textarea',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-checkbox',
    name: 'ShadcnCheckbox',
    displayName: 'Checkbox',
    source: 'shadcn',
    categories: ['form', 'input'],
    tags: ['check', 'toggle', 'field', 'form', 'boolean', 'terms'],
    description: 'A checkbox input with optional label and description text',
    previewImage: '',
    props: [
      { name: 'label', type: 'string', required: false, default: 'Accept terms and conditions', description: 'Checkbox label', group: 'content' },
      { name: 'checked', type: 'boolean', required: false, default: false, description: 'Default checked state', group: 'behavior' },
      { name: 'disabled', type: 'boolean', required: false, default: false, description: 'Disabled state', group: 'behavior' },
      { name: 'description', type: 'string', required: false, description: 'Helper description text', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-checkbox', '@radix-ui/react-label'],
    dependencyManifest: [
      { package: '@radix-ui/react-checkbox', version: '^1.2.0' },
      { package: '@radix-ui/react-label', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-checkbox',
    level: 'primitive',
    code: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-start space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
    suggestedWith: ['shadcn-button', 'shadcn-label', 'shadcn-input'],
    docsUrl: 'https://ui.shadcn.com/docs/components/checkbox',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-radio-group',
    name: 'ShadcnRadioGroup',
    displayName: 'Radio Group',
    source: 'shadcn',
    categories: ['form', 'input'],
    tags: ['radio', 'options', 'select', 'field', 'form', 'choice'],
    description: 'A group of radio buttons for selecting a single option from a list',
    previewImage: '',
    props: [
      {
        name: 'options',
        type: 'array',
        required: false,
        default: [
          { label: 'Default', value: 'default' },
          { label: 'Comfortable', value: 'comfortable' },
          { label: 'Compact', value: 'compact' },
        ],
        description: 'Radio options',
        group: 'content',
        itemSchema: [
          { name: 'label', type: 'string', required: true, description: 'Option label' },
          { name: 'value', type: 'string', required: true, description: 'Option value' },
        ],
      },
      { name: 'value', type: 'string', required: false, default: 'default', description: 'Default selected value', group: 'behavior' },
      { name: 'disabled', type: 'boolean', required: false, default: false, description: 'Disabled state', group: 'behavior' },
      { name: 'label', type: 'string', required: false, description: 'Group label', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-radio-group', '@radix-ui/react-label'],
    dependencyManifest: [
      { package: '@radix-ui/react-radio-group', version: '^1.2.0' },
      { package: '@radix-ui/react-label', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-radio-group',
    level: 'primitive',
    code: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

<RadioGroup defaultValue="default">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
</RadioGroup>`,
    suggestedWith: ['shadcn-button', 'shadcn-label', 'shadcn-card'],
    docsUrl: 'https://ui.shadcn.com/docs/components/radio-group',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-select',
    name: 'ShadcnSelect',
    displayName: 'Select',
    source: 'shadcn',
    categories: ['form', 'input'],
    tags: ['dropdown', 'options', 'select', 'field', 'form', 'pick'],
    description: 'A dropdown select component with label and customizable options',
    previewImage: '',
    props: [
      {
        name: 'options',
        type: 'array',
        required: false,
        default: [
          { label: 'Option 1', value: 'option-1' },
          { label: 'Option 2', value: 'option-2' },
          { label: 'Option 3', value: 'option-3' },
        ],
        description: 'Select options',
        group: 'content',
        itemSchema: [
          { name: 'label', type: 'string', required: true, description: 'Option label' },
          { name: 'value', type: 'string', required: true, description: 'Option value' },
        ],
      },
      { name: 'placeholder', type: 'string', required: false, default: 'Select an option', description: 'Placeholder text', group: 'content' },
      { name: 'disabled', type: 'boolean', required: false, default: false, description: 'Disabled state', group: 'behavior' },
      { name: 'label', type: 'string', required: false, description: 'Label text', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-select', '@radix-ui/react-label'],
    dependencyManifest: [
      { package: '@radix-ui/react-select', version: '^2.2.0' },
      { package: '@radix-ui/react-label', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-select',
    level: 'primitive',
    code: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option-1">Option 1</SelectItem>
    <SelectItem value="option-2">Option 2</SelectItem>
  </SelectContent>
</Select>`,
    suggestedWith: ['shadcn-button', 'shadcn-label', 'shadcn-input'],
    docsUrl: 'https://ui.shadcn.com/docs/components/select',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-slider',
    name: 'ShadcnSlider',
    displayName: 'Slider',
    source: 'shadcn',
    categories: ['form', 'input'],
    tags: ['range', 'slider', 'number', 'field', 'form', 'value'],
    description: 'A range slider input with optional label and live value display',
    previewImage: '',
    props: [
      { name: 'min', type: 'number', required: false, default: 0, description: 'Minimum value', group: 'behavior' },
      { name: 'max', type: 'number', required: false, default: 100, description: 'Maximum value', group: 'behavior' },
      { name: 'step', type: 'number', required: false, default: 1, description: 'Step increment', group: 'behavior' },
      { name: 'value', type: 'number', required: false, default: 50, description: 'Default value', group: 'behavior' },
      { name: 'disabled', type: 'boolean', required: false, default: false, description: 'Disabled state', group: 'behavior' },
      { name: 'showValue', type: 'boolean', required: false, default: true, description: 'Show current value label', group: 'style' },
      { name: 'label', type: 'string', required: false, description: 'Label text', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-slider', '@radix-ui/react-label'],
    dependencyManifest: [
      { package: '@radix-ui/react-slider', version: '^1.3.0' },
      { package: '@radix-ui/react-label', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-slider',
    level: 'primitive',
    code: `import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[50]} max={100} step={1} />`,
    suggestedWith: ['shadcn-label', 'shadcn-input', 'shadcn-card'],
    docsUrl: 'https://ui.shadcn.com/docs/components/slider',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-switch',
    name: 'ShadcnSwitch',
    displayName: 'Switch',
    source: 'shadcn',
    categories: ['form', 'input'],
    tags: ['toggle', 'boolean', 'on', 'off', 'field', 'form', 'switch'],
    description: 'A toggle switch with label and optional description text',
    previewImage: '',
    props: [
      { name: 'checked', type: 'boolean', required: false, default: false, description: 'Default checked state', group: 'behavior' },
      { name: 'label', type: 'string', required: false, default: 'Airplane Mode', description: 'Switch label', group: 'content' },
      { name: 'disabled', type: 'boolean', required: false, default: false, description: 'Disabled state', group: 'behavior' },
      { name: 'description', type: 'string', required: false, description: 'Helper description text', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-switch', '@radix-ui/react-label'],
    dependencyManifest: [
      { package: '@radix-ui/react-switch', version: '^1.2.0' },
      { package: '@radix-ui/react-label', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-switch',
    level: 'primitive',
    code: `import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`,
    suggestedWith: ['shadcn-label', 'shadcn-card', 'shadcn-checkbox'],
    docsUrl: 'https://ui.shadcn.com/docs/components/switch',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-label',
    name: 'ShadcnLabel',
    displayName: 'Label',
    source: 'shadcn',
    categories: ['form', 'text'],
    tags: ['label', 'text', 'form', 'field', 'caption'],
    description: 'A form label component for associating text with form controls',
    previewImage: '',
    props: [
      { name: 'text', type: 'string', required: false, default: 'Label', description: 'Label text', group: 'content' },
      { name: 'htmlFor', type: 'string', required: false, description: 'ID of the associated form element', group: 'behavior' },
    ],
    dependencies: ['@radix-ui/react-label'],
    dependencyManifest: [
      { package: '@radix-ui/react-label', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-label',
    level: 'primitive',
    code: `import { Label } from "@/components/ui/label"

<Label htmlFor="email">Your email address</Label>`,
    suggestedWith: ['shadcn-input', 'shadcn-checkbox', 'shadcn-select'],
    docsUrl: 'https://ui.shadcn.com/docs/components/label',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-toggle',
    name: 'ShadcnToggle',
    displayName: 'Toggle',
    source: 'shadcn',
    categories: ['button', 'input'],
    tags: ['toggle', 'press', 'active', 'formatting', 'toolbar'],
    description: 'A two-state toggle button with icon and optional label',
    previewImage: '',
    props: [
      { name: 'pressed', type: 'boolean', required: false, default: false, description: 'Default pressed state', group: 'behavior' },
      { name: 'icon', type: 'select', required: false, default: 'bold', options: ['bold', 'italic', 'underline'], description: 'Icon to display', group: 'content' },
      { name: 'label', type: 'string', required: false, description: 'Optional text label', group: 'content' },
      { name: 'variant', type: 'select', required: false, default: 'default', options: ['default', 'outline'], description: 'Visual variant', group: 'style' },
      { name: 'size', type: 'select', required: false, default: 'default', options: ['default', 'sm', 'lg'], description: 'Toggle size', group: 'style' },
    ],
    dependencies: ['@radix-ui/react-toggle', 'lucide-react'],
    dependencyManifest: [
      { package: '@radix-ui/react-toggle', version: '^1.2.0' },
      { package: 'lucide-react', version: '^0.400.0' },
    ],
    modulePath: 'shadcn-toggle',
    level: 'primitive',
    code: `import { Toggle } from "@/components/ui/toggle"
import { Bold } from "lucide-react"

<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>`,
    suggestedWith: ['shadcn-toggle-group', 'shadcn-button'],
    docsUrl: 'https://ui.shadcn.com/docs/components/toggle',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-toggle-group',
    name: 'ShadcnToggleGroup',
    displayName: 'Toggle Group',
    source: 'shadcn',
    categories: ['form', 'input'],
    tags: ['toggle', 'group', 'toolbar', 'formatting', 'multi-select'],
    description: 'A group of toggle buttons for selecting one or multiple values',
    previewImage: '',
    props: [
      {
        name: 'items',
        type: 'array',
        required: false,
        default: [
          { value: 'bold', icon: 'bold', label: 'Bold' },
          { value: 'italic', icon: 'italic', label: 'Italic' },
          { value: 'underline', icon: 'underline', label: 'Underline' },
        ],
        description: 'Toggle group items',
        group: 'content',
        itemSchema: [
          { name: 'value', type: 'string', required: true, description: 'Item value' },
          { name: 'label', type: 'string', required: false, description: 'Item label' },
          { name: 'icon', type: 'string', required: false, description: 'Icon name (bold, italic, underline, align-left, align-center, align-right)' },
        ],
      },
      { name: 'type', type: 'select', required: false, default: 'multiple', options: ['single', 'multiple'], description: 'Selection mode', group: 'behavior' },
      { name: 'variant', type: 'select', required: false, default: 'default', options: ['default', 'outline'], description: 'Visual variant', group: 'style' },
    ],
    dependencies: ['@radix-ui/react-toggle-group', 'lucide-react'],
    dependencyManifest: [
      { package: '@radix-ui/react-toggle-group', version: '^1.2.0' },
      { package: 'lucide-react', version: '^0.400.0' },
    ],
    modulePath: 'shadcn-toggle-group',
    level: 'primitive',
    code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, Underline } from "lucide-react"

<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
  <ToggleGroupItem value="underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
</ToggleGroup>`,
    suggestedWith: ['shadcn-toggle', 'shadcn-button', 'shadcn-card'],
    docsUrl: 'https://ui.shadcn.com/docs/components/toggle-group',
    version: '1.0.0',
    acceptsChildren: false,
  },

  // ============================================================
  // FEEDBACK & STATUS
  // ============================================================

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

  {
    id: 'shadcn-badge',
    name: 'ShadcnBadge',
    displayName: 'Badge',
    source: 'shadcn',
    categories: ['other', 'text'],
    tags: ['badge', 'tag', 'label', 'status', 'chip', 'pill'],
    description: 'A small label component for statuses, categories, or counts',
    previewImage: '',
    props: [
      { name: 'text', type: 'string', required: false, default: 'Badge', description: 'Badge text', group: 'content' },
      { name: 'variant', type: 'select', required: false, default: 'default', options: ['default', 'secondary', 'destructive', 'outline'], description: 'Visual variant', group: 'style' },
    ],
    dependencies: ['class-variance-authority'],
    dependencyManifest: [
      { package: 'class-variance-authority', version: '^0.7.0' },
    ],
    modulePath: 'shadcn-badge',
    level: 'primitive',
    code: `import { Badge } from "@/components/ui/badge"

<Badge variant="default">Badge</Badge>`,
    suggestedWith: ['shadcn-card', 'shadcn-avatar', 'shadcn-button'],
    docsUrl: 'https://ui.shadcn.com/docs/components/badge',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-progress',
    name: 'ShadcnProgress',
    displayName: 'Progress',
    source: 'shadcn',
    categories: ['other'],
    tags: ['progress', 'loading', 'bar', 'percentage', 'status', 'completion'],
    description: 'A progress bar component with optional percentage label',
    previewImage: '',
    props: [
      { name: 'value', type: 'number', required: false, default: 60, description: 'Current value', group: 'behavior' },
      { name: 'max', type: 'number', required: false, default: 100, description: 'Maximum value', group: 'behavior' },
      { name: 'showLabel', type: 'boolean', required: false, default: false, description: 'Show percentage label', group: 'style' },
    ],
    dependencies: ['@radix-ui/react-progress'],
    dependencyManifest: [
      { package: '@radix-ui/react-progress', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-progress',
    level: 'primitive',
    code: `import { Progress } from "@/components/ui/progress"

<Progress value={60} />`,
    suggestedWith: ['shadcn-card', 'shadcn-alert'],
    docsUrl: 'https://ui.shadcn.com/docs/components/progress',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-skeleton',
    name: 'ShadcnSkeleton',
    displayName: 'Skeleton',
    source: 'shadcn',
    categories: ['other'],
    tags: ['skeleton', 'loading', 'placeholder', 'shimmer', 'loader'],
    description: 'A loading placeholder skeleton with configurable shape and size',
    previewImage: '',
    props: [
      { name: 'width', type: 'string', required: false, default: '100%', description: 'Skeleton width (CSS value)', group: 'style' },
      { name: 'height', type: 'string', required: false, default: '20px', description: 'Skeleton height (CSS value)', group: 'style' },
      { name: 'variant', type: 'select', required: false, default: 'line', options: ['line', 'circle', 'rect'], description: 'Shape variant', group: 'style' },
    ],
    dependencies: [],
    modulePath: 'shadcn-skeleton',
    level: 'primitive',
    code: `import { Skeleton } from "@/components/ui/skeleton"

<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`,
    suggestedWith: ['shadcn-card', 'shadcn-avatar'],
    docsUrl: 'https://ui.shadcn.com/docs/components/skeleton',
    version: '1.0.0',
    acceptsChildren: false,
  },

  // ============================================================
  // DATA DISPLAY
  // ============================================================

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

  {
    id: 'shadcn-table',
    name: 'ShadcnTable',
    displayName: 'Table',
    source: 'shadcn',
    categories: ['other', 'layout'],
    tags: ['table', 'data', 'grid', 'rows', 'columns', 'spreadsheet'],
    description: 'A data table with configurable headers, rows, caption, and striped styling',
    previewImage: '',
    props: [
      {
        name: 'headers',
        type: 'array',
        required: false,
        default: ['Invoice', 'Status', 'Method', 'Amount'],
        description: 'Column header labels',
        group: 'content',
      },
      {
        name: 'rows',
        type: 'array',
        required: false,
        default: [
          ['INV001', 'Paid', 'Credit Card', '$250.00'],
          ['INV002', 'Pending', 'PayPal', '$150.00'],
          ['INV003', 'Unpaid', 'Bank Transfer', '$350.00'],
        ],
        description: 'Table row data (array of string arrays)',
        group: 'content',
      },
      { name: 'caption', type: 'string', required: false, description: 'Table caption text', group: 'content' },
      { name: 'striped', type: 'boolean', required: false, default: false, description: 'Alternate row striping', group: 'style' },
    ],
    dependencies: [],
    modulePath: 'shadcn-table',
    level: 'primitive',
    code: `import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    suggestedWith: ['shadcn-card', 'shadcn-pagination', 'shadcn-badge'],
    docsUrl: 'https://ui.shadcn.com/docs/components/table',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-avatar',
    name: 'ShadcnAvatar',
    displayName: 'Avatar',
    source: 'shadcn',
    categories: ['media', 'other'],
    tags: ['avatar', 'profile', 'user', 'image', 'picture', 'photo'],
    description: 'A circular avatar component with image and fallback text',
    previewImage: '',
    props: [
      { name: 'src', type: 'image', required: false, default: 'https://github.com/shadcn.png', description: 'Avatar image URL', group: 'content' },
      { name: 'fallback', type: 'string', required: false, default: 'CN', description: 'Fallback initials when image fails', group: 'content' },
      { name: 'size', type: 'select', required: false, default: 'md', options: ['sm', 'md', 'lg'], description: 'Avatar size', group: 'style' },
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
    suggestedWith: ['shadcn-card', 'shadcn-hover-card', 'shadcn-badge'],
    docsUrl: 'https://ui.shadcn.com/docs/components/avatar',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-carousel',
    name: 'ShadcnCarousel',
    displayName: 'Carousel',
    source: 'shadcn',
    categories: ['media', 'layout'],
    tags: ['carousel', 'slider', 'slideshow', 'gallery', 'images', 'swipe'],
    description: 'A carousel slider with cards, navigation arrows, and loop support',
    previewImage: '',
    props: [
      {
        name: 'items',
        type: 'array',
        required: false,
        default: [
          { title: 'Slide 1', description: 'First slide description' },
          { title: 'Slide 2', description: 'Second slide description' },
          { title: 'Slide 3', description: 'Third slide description' },
          { title: 'Slide 4', description: 'Fourth slide description' },
          { title: 'Slide 5', description: 'Fifth slide description' },
        ],
        description: 'Carousel slides',
        group: 'content',
        itemSchema: [
          { name: 'title', type: 'string', required: true, description: 'Slide title' },
          { name: 'description', type: 'string', required: true, description: 'Slide description' },
          { name: 'image', type: 'image', required: false, description: 'Slide image URL' },
        ],
      },
      { name: 'autoplay', type: 'boolean', required: false, default: false, description: 'Auto-advance slides', group: 'behavior' },
      { name: 'loop', type: 'boolean', required: false, default: false, description: 'Loop back to start', group: 'behavior' },
    ],
    dependencies: ['embla-carousel-react'],
    dependencyManifest: [
      { package: 'embla-carousel-react', version: '^8.0.0' },
    ],
    modulePath: 'shadcn-carousel',
    level: 'primitive',
    code: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    suggestedWith: ['shadcn-card', 'shadcn-button'],
    docsUrl: 'https://ui.shadcn.com/docs/components/carousel',
    version: '1.0.0',
    acceptsChildren: false,
  },

  // ============================================================
  // NAVIGATION
  // ============================================================

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

  {
    id: 'shadcn-accordion',
    name: 'ShadcnAccordion',
    displayName: 'Accordion',
    source: 'shadcn',
    categories: ['navigation', 'layout', 'faq'],
    tags: ['accordion', 'expand', 'collapse', 'faq', 'sections', 'disclosure'],
    description: 'A collapsible accordion with multiple items for FAQs or sectioned content',
    previewImage: '',
    props: [
      {
        name: 'items',
        type: 'array',
        required: false,
        default: [
          { title: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
          { title: 'Is it styled?', content: 'Yes. It comes with default styles that match the other components\' aesthetic.' },
          { title: 'Is it animated?', content: 'Yes. It\'s animated by default, but you can disable it if you prefer.' },
        ],
        description: 'Accordion items',
        group: 'content',
        itemSchema: [
          { name: 'title', type: 'string', required: true, description: 'Item title / trigger' },
          { name: 'content', type: 'string', required: true, description: 'Item content' },
        ],
      },
      { name: 'type', type: 'select', required: false, default: 'single', options: ['single', 'multiple'], description: 'Allow one or multiple items open', group: 'behavior' },
      { name: 'collapsible', type: 'boolean', required: false, default: true, description: 'Allow closing all items (single mode)', group: 'behavior' },
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
    suggestedWith: ['shadcn-card', 'shadcn-collapsible'],
    docsUrl: 'https://ui.shadcn.com/docs/components/accordion',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-breadcrumb',
    name: 'ShadcnBreadcrumb',
    displayName: 'Breadcrumb',
    source: 'shadcn',
    categories: ['navigation'],
    tags: ['breadcrumb', 'navigation', 'path', 'trail', 'links'],
    description: 'A breadcrumb navigation trail with configurable separator style',
    previewImage: '',
    props: [
      {
        name: 'items',
        type: 'array',
        required: false,
        default: [
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Breadcrumb' },
        ],
        description: 'Breadcrumb path items',
        group: 'content',
        itemSchema: [
          { name: 'label', type: 'string', required: true, description: 'Item label' },
          { name: 'href', type: 'string', required: false, description: 'Item link (omit for current page)' },
        ],
      },
      { name: 'separator', type: 'select', required: false, default: 'chevron', options: ['chevron', 'slash'], description: 'Separator style', group: 'style' },
    ],
    dependencies: ['lucide-react'],
    dependencyManifest: [
      { package: 'lucide-react', version: '^0.400.0' },
    ],
    modulePath: 'shadcn-breadcrumb',
    level: 'primitive',
    code: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    suggestedWith: ['shadcn-navigation-menu', 'shadcn-button'],
    docsUrl: 'https://ui.shadcn.com/docs/components/breadcrumb',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-navigation-menu',
    name: 'ShadcnNavigationMenu',
    displayName: 'Navigation Menu',
    source: 'shadcn',
    categories: ['navigation', 'header'],
    tags: ['navigation', 'menu', 'navbar', 'links', 'header', 'dropdown'],
    description: 'A top-level navigation menu with dropdowns and link groups',
    previewImage: '',
    props: [
      {
        name: 'items',
        type: 'array',
        required: false,
        default: [
          {
            label: 'Getting Started',
            children: [
              { label: 'Introduction', href: '#', description: 'Re-usable components built with Radix UI and Tailwind CSS.' },
              { label: 'Installation', href: '#', description: 'How to install dependencies and structure your app.' },
              { label: 'Typography', href: '#', description: 'Styles for headings, paragraphs, lists, etc.' },
            ],
          },
          {
            label: 'Components',
            children: [
              { label: 'Alert Dialog', href: '#', description: 'A modal dialog that interrupts the user.' },
              { label: 'Hover Card', href: '#', description: 'For sighted users to preview content.' },
              { label: 'Progress', href: '#', description: 'Displays an indicator showing completion.' },
            ],
          },
          { label: 'Documentation', href: '#' },
        ],
        description: 'Navigation menu items with optional children dropdowns',
        group: 'content',
        itemSchema: [
          { name: 'label', type: 'string', required: true, description: 'Menu item label' },
          { name: 'href', type: 'string', required: false, description: 'Direct link (no dropdown)' },
          { name: 'children', type: 'array', required: false, description: 'Dropdown child items with label, href, description' },
        ],
      },
    ],
    dependencies: ['@radix-ui/react-navigation-menu'],
    dependencyManifest: [
      { package: '@radix-ui/react-navigation-menu', version: '^1.3.0' },
    ],
    modulePath: 'shadcn-navigation-menu',
    level: 'primitive',
    code: `import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="#">Introduction</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    suggestedWith: ['shadcn-breadcrumb', 'shadcn-button', 'shadcn-dropdown-menu'],
    docsUrl: 'https://ui.shadcn.com/docs/components/navigation-menu',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-pagination',
    name: 'ShadcnPagination',
    displayName: 'Pagination',
    source: 'shadcn',
    categories: ['navigation'],
    tags: ['pagination', 'pages', 'navigation', 'paging', 'next', 'previous'],
    description: 'A pagination component with page numbers, ellipsis, and prev/next controls',
    previewImage: '',
    props: [
      { name: 'totalPages', type: 'number', required: false, default: 10, description: 'Total number of pages', group: 'behavior' },
      { name: 'currentPage', type: 'number', required: false, default: 1, description: 'Currently active page', group: 'behavior' },
      { name: 'siblingCount', type: 'number', required: false, default: 1, description: 'Number of sibling pages shown around current', group: 'behavior' },
    ],
    dependencies: [],
    modulePath: 'shadcn-pagination',
    level: 'primitive',
    code: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
    suggestedWith: ['shadcn-table', 'shadcn-card'],
    docsUrl: 'https://ui.shadcn.com/docs/components/pagination',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-dropdown-menu',
    name: 'ShadcnDropdownMenu',
    displayName: 'Dropdown Menu',
    source: 'shadcn',
    categories: ['navigation', 'overlay'],
    tags: ['dropdown', 'menu', 'context', 'actions', 'options', 'popup'],
    description: 'A dropdown menu triggered by a button with items, shortcuts, and separators',
    previewImage: '',
    props: [
      {
        name: 'items',
        type: 'array',
        required: false,
        default: [
          { label: 'Profile', shortcut: 'Shift+P' },
          { label: 'Billing', shortcut: 'Ctrl+B' },
          { label: 'Settings', shortcut: 'Ctrl+S' },
          { label: '', separator: true },
          { label: 'Log out', shortcut: 'Ctrl+Q' },
        ],
        description: 'Menu items with optional shortcuts and separators',
        group: 'content',
        itemSchema: [
          { name: 'label', type: 'string', required: true, description: 'Item label' },
          { name: 'shortcut', type: 'string', required: false, description: 'Keyboard shortcut text' },
          { name: 'disabled', type: 'boolean', required: false, description: 'Disabled state' },
          { name: 'separator', type: 'boolean', required: false, description: 'Render as separator instead of item' },
        ],
      },
      { name: 'trigger', type: 'string', required: false, default: 'Open Menu', description: 'Trigger button text', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-dropdown-menu'],
    dependencyManifest: [
      { package: '@radix-ui/react-dropdown-menu', version: '^2.2.0' },
    ],
    modulePath: 'shadcn-dropdown-menu',
    level: 'primitive',
    code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    suggestedWith: ['shadcn-button', 'shadcn-navigation-menu'],
    docsUrl: 'https://ui.shadcn.com/docs/components/dropdown-menu',
    version: '1.0.0',
    acceptsChildren: false,
  },

  // ============================================================
  // OVERLAYS & POPUPS
  // ============================================================

  {
    id: 'shadcn-dialog',
    name: 'ShadcnDialog',
    displayName: 'Dialog',
    source: 'shadcn',
    categories: ['modal', 'overlay'],
    tags: ['dialog', 'modal', 'popup', 'overlay', 'confirm', 'alert'],
    description: 'A modal dialog with header, content, and footer action buttons',
    previewImage: '',
    props: [
      { name: 'trigger', type: 'string', required: false, default: 'Open Dialog', description: 'Trigger button text', group: 'content' },
      { name: 'title', type: 'string', required: false, default: 'Dialog Title', description: 'Dialog title', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'This is a dialog description that provides context.', description: 'Dialog description', group: 'content' },
      { name: 'content', type: 'string', required: false, default: 'Dialog content goes here. You can place any content in this area.', description: 'Dialog body content', group: 'content' },
      {
        name: 'footerButtons',
        type: 'array',
        required: false,
        default: [
          { text: 'Cancel', variant: 'outline' },
          { text: 'Save Changes', variant: 'default' },
        ],
        description: 'Footer action buttons',
        group: 'content',
        itemSchema: [
          { name: 'text', type: 'string', required: true, description: 'Button text' },
          { name: 'variant', type: 'select', required: false, options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'], description: 'Button variant' },
        ],
      },
    ],
    dependencies: ['@radix-ui/react-dialog'],
    dependencyManifest: [
      { package: '@radix-ui/react-dialog', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-dialog',
    level: 'primitive',
    code: `import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description.</DialogDescription>
    </DialogHeader>
    <DialogFooter><Button>Save</Button></DialogFooter>
  </DialogContent>
</Dialog>`,
    suggestedWith: ['shadcn-button', 'shadcn-input', 'shadcn-card'],
    docsUrl: 'https://ui.shadcn.com/docs/components/dialog',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-sheet',
    name: 'ShadcnSheet',
    displayName: 'Sheet',
    source: 'shadcn',
    categories: ['modal', 'overlay'],
    tags: ['sheet', 'drawer', 'side-panel', 'slide', 'overlay', 'panel'],
    description: 'A slide-out panel from any edge with header and content areas',
    previewImage: '',
    props: [
      { name: 'trigger', type: 'string', required: false, default: 'Open Sheet', description: 'Trigger button text', group: 'content' },
      { name: 'title', type: 'string', required: false, default: 'Sheet Title', description: 'Sheet title', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'This is a sheet description that provides context about the panel content.', description: 'Sheet description', group: 'content' },
      { name: 'content', type: 'string', required: false, default: 'Place your sheet content here. Sheets are useful for side panels, settings, and additional information.', description: 'Sheet body content', group: 'content' },
      { name: 'side', type: 'select', required: false, default: 'right', options: ['top', 'right', 'bottom', 'left'], description: 'Side to slide from', group: 'style' },
    ],
    dependencies: ['@radix-ui/react-dialog'],
    dependencyManifest: [
      { package: '@radix-ui/react-dialog', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-sheet',
    level: 'primitive',
    code: `import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

<Sheet>
  <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>Sheet description.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    suggestedWith: ['shadcn-button', 'shadcn-dialog', 'shadcn-input'],
    docsUrl: 'https://ui.shadcn.com/docs/components/sheet',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-popover',
    name: 'ShadcnPopover',
    displayName: 'Popover',
    source: 'shadcn',
    categories: ['overlay'],
    tags: ['popover', 'popup', 'floating', 'tooltip', 'info', 'content'],
    description: 'A floating popover panel triggered by a button with configurable placement',
    previewImage: '',
    props: [
      { name: 'trigger', type: 'string', required: false, default: 'Open Popover', description: 'Trigger button text', group: 'content' },
      { name: 'content', type: 'string', required: false, default: 'This is the popover content. Place any information or interactive elements here.', description: 'Popover content text', group: 'content' },
      { name: 'side', type: 'select', required: false, default: 'bottom', options: ['top', 'right', 'bottom', 'left'], description: 'Popover placement', group: 'style' },
    ],
    dependencies: ['@radix-ui/react-popover'],
    dependencyManifest: [
      { package: '@radix-ui/react-popover', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-popover',
    level: 'primitive',
    code: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>Content here</PopoverContent>
</Popover>`,
    suggestedWith: ['shadcn-button', 'shadcn-tooltip', 'shadcn-hover-card'],
    docsUrl: 'https://ui.shadcn.com/docs/components/popover',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-tooltip',
    name: 'ShadcnTooltip',
    displayName: 'Tooltip',
    source: 'shadcn',
    categories: ['overlay'],
    tags: ['tooltip', 'hover', 'hint', 'info', 'help', 'tip'],
    description: 'A small tooltip that appears on hover with configurable placement',
    previewImage: '',
    props: [
      { name: 'content', type: 'string', required: false, default: 'Add to library', description: 'Tooltip text', group: 'content' },
      { name: 'trigger', type: 'string', required: false, default: 'Hover me', description: 'Trigger button text', group: 'content' },
      { name: 'side', type: 'select', required: false, default: 'top', options: ['top', 'right', 'bottom', 'left'], description: 'Tooltip placement', group: 'style' },
    ],
    dependencies: ['@radix-ui/react-tooltip'],
    dependencyManifest: [
      { package: '@radix-ui/react-tooltip', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-tooltip',
    level: 'primitive',
    code: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
    <TooltipContent><p>Add to library</p></TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    suggestedWith: ['shadcn-button', 'shadcn-popover'],
    docsUrl: 'https://ui.shadcn.com/docs/components/tooltip',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-hover-card',
    name: 'ShadcnHoverCard',
    displayName: 'Hover Card',
    source: 'shadcn',
    categories: ['overlay'],
    tags: ['hover', 'card', 'preview', 'popup', 'profile', 'info'],
    description: 'A rich hover card with avatar, name, and description for content preview',
    previewImage: '',
    props: [
      { name: 'trigger', type: 'string', required: false, default: '@nextjs', description: 'Trigger text', group: 'content' },
      { name: 'content', type: 'string', required: false, default: 'The React Framework \u2013 created and maintained by @vercel.', description: 'Card content text', group: 'content' },
      { name: 'avatar', type: 'image', required: false, default: 'https://github.com/vercel.png', description: 'Avatar image URL', group: 'content' },
      { name: 'name', type: 'string', required: false, default: 'Next.js', description: 'Display name', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'The React Framework \u2013 created and maintained by @vercel.', description: 'Description text', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-hover-card', '@radix-ui/react-avatar', 'lucide-react'],
    dependencyManifest: [
      { package: '@radix-ui/react-hover-card', version: '^1.2.0' },
      { package: '@radix-ui/react-avatar', version: '^1.2.0' },
      { package: 'lucide-react', version: '^0.400.0' },
    ],
    modulePath: 'shadcn-hover-card',
    level: 'primitive',
    code: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

<HoverCard>
  <HoverCardTrigger>@nextjs</HoverCardTrigger>
  <HoverCardContent>
    <p>The React Framework by @vercel.</p>
  </HoverCardContent>
</HoverCard>`,
    suggestedWith: ['shadcn-avatar', 'shadcn-popover', 'shadcn-tooltip'],
    docsUrl: 'https://ui.shadcn.com/docs/components/hover-card',
    version: '1.0.0',
    acceptsChildren: false,
  },

  // ============================================================
  // LAYOUT & STRUCTURE
  // ============================================================

  {
    id: 'shadcn-collapsible',
    name: 'ShadcnCollapsible',
    displayName: 'Collapsible',
    source: 'shadcn',
    categories: ['layout'],
    tags: ['collapsible', 'expand', 'collapse', 'toggle', 'show', 'hide'],
    description: 'A collapsible content section with trigger button',
    previewImage: '',
    props: [
      { name: 'trigger', type: 'string', required: false, default: 'Toggle Content', description: 'Trigger heading text', group: 'content' },
      { name: 'content', type: 'string', required: false, default: 'This is the collapsible content that can be shown or hidden.', description: 'Collapsible content', group: 'content' },
      { name: 'defaultOpen', type: 'boolean', required: false, default: false, description: 'Start in open state', group: 'behavior' },
    ],
    dependencies: ['@radix-ui/react-collapsible', 'lucide-react'],
    dependencyManifest: [
      { package: '@radix-ui/react-collapsible', version: '^1.2.0' },
      { package: 'lucide-react', version: '^0.400.0' },
    ],
    modulePath: 'shadcn-collapsible',
    level: 'primitive',
    code: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>Content here</CollapsibleContent>
</Collapsible>`,
    suggestedWith: ['shadcn-accordion', 'shadcn-card', 'shadcn-button'],
    docsUrl: 'https://ui.shadcn.com/docs/components/collapsible',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-separator',
    name: 'ShadcnSeparator',
    displayName: 'Separator',
    source: 'shadcn',
    categories: ['layout'],
    tags: ['separator', 'divider', 'line', 'hr', 'border', 'spacer'],
    description: 'A visual separator line with optional label text, horizontal or vertical',
    previewImage: '',
    props: [
      { name: 'orientation', type: 'select', required: false, default: 'horizontal', options: ['horizontal', 'vertical'], description: 'Separator direction', group: 'style' },
      { name: 'label', type: 'string', required: false, description: 'Optional centered label (horizontal only)', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-separator'],
    dependencyManifest: [
      { package: '@radix-ui/react-separator', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-separator',
    level: 'primitive',
    code: `import { Separator } from "@/components/ui/separator"

<Separator />
<Separator orientation="vertical" />`,
    suggestedWith: ['shadcn-card', 'shadcn-accordion'],
    docsUrl: 'https://ui.shadcn.com/docs/components/separator',
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-scroll-area',
    name: 'ShadcnScrollArea',
    displayName: 'Scroll Area',
    source: 'shadcn',
    categories: ['layout'],
    tags: ['scroll', 'overflow', 'container', 'scrollbar', 'area', 'content'],
    description: 'A scrollable content area with custom scrollbar styling',
    previewImage: '',
    props: [
      { name: 'height', type: 'string', required: false, default: '200px', description: 'Container height (CSS value)', group: 'style' },
      { name: 'content', type: 'string', required: false, default: 'Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king\'s pillow, in his soup, even in the royal toilet.', description: 'Scrollable content text', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-scroll-area'],
    dependencyManifest: [
      { package: '@radix-ui/react-scroll-area', version: '^1.2.0' },
    ],
    modulePath: 'shadcn-scroll-area',
    level: 'primitive',
    code: `import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-[200px] w-full rounded-md border p-4">
  <p>Long scrollable content here...</p>
</ScrollArea>`,
    suggestedWith: ['shadcn-card', 'shadcn-table', 'shadcn-separator'],
    docsUrl: 'https://ui.shadcn.com/docs/components/scroll-area',
    version: '1.0.0',
    acceptsChildren: false,
  },
]
