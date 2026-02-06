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

  // ============================================================
  // SECTION-LEVEL COMPONENTS: HEROES
  // ============================================================

  {
    id: 'shadcn-hero-centered',
    name: 'ShadcnHeroCentered',
    displayName: 'Centered Hero',
    source: 'shadcn',
    categories: ['hero', 'section'],
    tags: ['hero', 'landing', 'cta', 'centered', 'heading'],
    description: 'A centered hero section with heading, description, badge, and two CTA buttons',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Build something amazing today', description: 'Main heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Create beautiful, responsive websites with our powerful platform. Ship faster, collaborate better, and scale with confidence.', description: 'Description text', group: 'content' },
      { name: 'primaryCta', type: 'string', required: false, default: 'Get Started', description: 'Primary button text', group: 'content' },
      { name: 'secondaryCta', type: 'string', required: false, default: 'Learn More', description: 'Secondary button text', group: 'content' },
      { name: 'badgeText', type: 'string', required: false, default: 'Now in Beta', description: 'Badge text above heading', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-hero-centered',
    level: 'section',
    code: '<ShadcnHeroCentered headline="Build something amazing today" />',
    suggestedWith: ['shadcn-logo-cloud', 'shadcn-feature-grid-3col'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-hero-split',
    name: 'ShadcnHeroSplit',
    displayName: 'Split Hero',
    source: 'shadcn',
    categories: ['hero', 'section'],
    tags: ['hero', 'landing', 'split', 'image', 'cta'],
    description: 'A split layout hero with content on the left and image placeholder on the right',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Grow your business with modern tools', description: 'Main heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Our platform provides everything you need to build, launch, and scale your product. Focus on what matters most while we handle the rest.', description: 'Description text', group: 'content' },
      { name: 'primaryCta', type: 'string', required: false, default: 'Start Free Trial', description: 'Primary button text', group: 'content' },
      { name: 'secondaryCta', type: 'string', required: false, default: 'Watch Demo', description: 'Secondary button text', group: 'content' },
      { name: 'imageSrc', type: 'image', required: false, default: '', description: 'Hero image URL', group: 'content' },
      { name: 'imageAlt', type: 'string', required: false, default: 'Hero image', description: 'Image alt text', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-hero-split',
    level: 'section',
    code: '<ShadcnHeroSplit headline="Grow your business with modern tools" />',
    suggestedWith: ['shadcn-feature-grid-3col', 'shadcn-stats-section'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-hero-with-form',
    name: 'ShadcnHeroWithForm',
    displayName: 'Hero with Form',
    source: 'shadcn',
    categories: ['hero', 'section'],
    tags: ['hero', 'landing', 'form', 'email', 'signup'],
    description: 'A hero section with email signup form and disclaimer text',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Stay ahead of the curve', description: 'Main heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Join thousands of professionals who trust our platform. Get early access and be the first to know about new features.', description: 'Description text', group: 'content' },
      { name: 'placeholder', type: 'string', required: false, default: 'Enter your email', description: 'Input placeholder', group: 'content' },
      { name: 'buttonText', type: 'string', required: false, default: 'Get Early Access', description: 'Submit button text', group: 'content' },
      { name: 'disclaimerText', type: 'string', required: false, default: 'No spam. Unsubscribe at any time.', description: 'Disclaimer text', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-hero-with-form',
    level: 'section',
    code: '<ShadcnHeroWithForm headline="Stay ahead of the curve" />',
    suggestedWith: ['shadcn-logo-cloud', 'shadcn-feature-list'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-hero-minimal',
    name: 'ShadcnHeroMinimal',
    displayName: 'Minimal Hero',
    source: 'shadcn',
    categories: ['hero', 'section'],
    tags: ['hero', 'landing', 'minimal', 'typography', 'simple'],
    description: 'A minimal hero section with large typography only',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Simplicity is the ultimate sophistication.', description: 'Main heading', group: 'content' },
      { name: 'subheadline', type: 'string', required: false, default: 'Less is more. Build with intention.', description: 'Sub heading', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-hero-minimal',
    level: 'section',
    code: '<ShadcnHeroMinimal headline="Simplicity is the ultimate sophistication." />',
    suggestedWith: ['shadcn-feature-centered', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-hero-with-badges',
    name: 'ShadcnHeroWithBadges',
    displayName: 'Hero with Badges',
    source: 'shadcn',
    categories: ['hero', 'section'],
    tags: ['hero', 'landing', 'badges', 'trust', 'social-proof'],
    description: 'A hero section with trust badges row below the CTA',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Trusted by thousands of teams worldwide', description: 'Main heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Our platform is built on trust, security, and performance. Join the community of innovators building the future.', description: 'Description text', group: 'content' },
      { name: 'primaryCta', type: 'string', required: false, default: 'Get Started Free', description: 'Button text', group: 'content' },
      { name: 'badges', type: 'array', required: false, default: [{ label: 'SOC2 Compliant', icon: 'shield' }, { label: '99.9% Uptime', icon: 'zap' }, { label: '4.9/5 Rating', icon: 'star' }, { label: 'Award Winning', icon: 'award' }], description: 'Trust badges', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-hero-with-badges',
    level: 'section',
    code: '<ShadcnHeroWithBadges headline="Trusted by thousands of teams worldwide" />',
    suggestedWith: ['shadcn-logo-cloud', 'shadcn-testimonial-grid'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-hero-video',
    name: 'ShadcnHeroVideo',
    displayName: 'Video Hero',
    source: 'shadcn',
    categories: ['hero', 'section'],
    tags: ['hero', 'landing', 'video', 'media', 'demo'],
    description: 'A hero section with video background placeholder',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'See it in action', description: 'Main heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Watch how our platform transforms the way teams work together. Experience the future of collaboration.', description: 'Description text', group: 'content' },
      { name: 'primaryCta', type: 'string', required: false, default: 'Start Free Trial', description: 'Primary button text', group: 'content' },
      { name: 'secondaryCta', type: 'string', required: false, default: 'Watch Video', description: 'Secondary button text', group: 'content' },
      { name: 'videoUrl', type: 'string', required: false, default: '', description: 'Video URL', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-hero-video',
    level: 'section',
    code: '<ShadcnHeroVideo headline="See it in action" />',
    suggestedWith: ['shadcn-feature-grid-3col', 'shadcn-testimonial-single'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-hero-animated',
    name: 'ShadcnHeroAnimated',
    displayName: 'Animated Hero',
    source: 'shadcn',
    categories: ['hero', 'section'],
    tags: ['hero', 'landing', 'animated', 'fade', 'motion'],
    description: 'A hero section with fade-in CSS animation effects',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Welcome to the future of design', description: 'Main heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Build stunning interfaces with ease. Our tools help you bring ideas to life faster than ever before.', description: 'Description text', group: 'content' },
      { name: 'primaryCta', type: 'string', required: false, default: 'Get Started', description: 'Primary button text', group: 'content' },
      { name: 'secondaryCta', type: 'string', required: false, default: 'Learn More', description: 'Secondary button text', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-hero-animated',
    level: 'section',
    code: '<ShadcnHeroAnimated headline="Welcome to the future of design" />',
    suggestedWith: ['shadcn-feature-cards', 'shadcn-stats-section'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-hero-gradient',
    name: 'ShadcnHeroGradient',
    displayName: 'Gradient Hero',
    source: 'shadcn',
    categories: ['hero', 'section'],
    tags: ['hero', 'landing', 'gradient', 'colorful', 'bold'],
    description: 'A hero section with customizable gradient background',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Elevate your digital presence', description: 'Main heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Stand out with a beautiful, modern website that captures attention and drives results. Built for speed and designed for impact.', description: 'Description text', group: 'content' },
      { name: 'primaryCta', type: 'string', required: false, default: 'Get Started', description: 'Primary button text', group: 'content' },
      { name: 'secondaryCta', type: 'string', required: false, default: 'See Examples', description: 'Secondary button text', group: 'content' },
      { name: 'gradientFrom', type: 'string', required: false, default: '#6366f1', description: 'Gradient start color', group: 'style' },
      { name: 'gradientTo', type: 'string', required: false, default: '#8b5cf6', description: 'Gradient end color', group: 'style' },
    ],
    dependencies: [],
    modulePath: 'shadcn-hero-gradient',
    level: 'section',
    code: '<ShadcnHeroGradient headline="Elevate your digital presence" />',
    suggestedWith: ['shadcn-feature-grid-4col', 'shadcn-logo-cloud'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  // ============================================================
  // SECTION-LEVEL COMPONENTS: FEATURES
  // ============================================================

  {
    id: 'shadcn-feature-grid-3col',
    name: 'ShadcnFeatureGrid3Col',
    displayName: '3-Column Feature Grid',
    source: 'shadcn',
    categories: ['feature', 'section'],
    tags: ['features', 'grid', 'icons', '3-column', 'cards'],
    description: 'A 3-column feature grid with icons and descriptions',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Everything you need', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Our platform comes packed with powerful features designed to help you succeed.', description: 'Section description', group: 'content' },
      { name: 'features', type: 'array', required: false, default: [{ title: 'Lightning Fast', description: 'Optimized performance that keeps your users engaged and your metrics growing.', icon: 'zap' }, { title: 'Modular Design', description: 'Build with reusable components that scale with your product and team.', icon: 'layers' }, { title: 'Enterprise Security', description: 'Bank-grade security with encryption, SSO, and compliance built in.', icon: 'shield' }], description: 'Feature items', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-feature-grid-3col',
    level: 'section',
    code: '<ShadcnFeatureGrid3Col headline="Everything you need" />',
    suggestedWith: ['shadcn-hero-centered', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-feature-grid-4col',
    name: 'ShadcnFeatureGrid4Col',
    displayName: '4-Column Feature Grid',
    source: 'shadcn',
    categories: ['feature', 'section'],
    tags: ['features', 'grid', 'icons', '4-column', 'cards'],
    description: 'A 4-column feature grid with icons and descriptions',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Powerful features for modern teams', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Everything you need to build, ship, and grow your product.', description: 'Section description', group: 'content' },
      { name: 'features', type: 'array', required: false, default: [{ title: 'Blazing Fast', description: 'Sub-second load times that keep users happy.', icon: 'zap' }, { title: 'Secure by Default', description: 'Enterprise-grade security out of the box.', icon: 'shield' }, { title: 'Global CDN', description: 'Content delivery from edge locations worldwide.', icon: 'globe' }, { title: 'Analytics', description: 'Real-time insights into your performance.', icon: 'chart' }], description: 'Feature items', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-feature-grid-4col',
    level: 'section',
    code: '<ShadcnFeatureGrid4Col headline="Powerful features for modern teams" />',
    suggestedWith: ['shadcn-hero-centered', 'shadcn-pricing-three-tier'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-feature-alternating',
    name: 'ShadcnFeatureAlternating',
    displayName: 'Alternating Features',
    source: 'shadcn',
    categories: ['feature', 'section'],
    tags: ['features', 'alternating', 'image', 'text', 'zigzag'],
    description: 'Alternating image and text rows for feature highlights',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'How it works', description: 'Section heading', group: 'content' },
      { name: 'features', type: 'array', required: false, default: [{ title: 'Design with ease', description: 'Use our intuitive drag-and-drop editor to create stunning layouts without any code. Choose from hundreds of templates or start from scratch.', imageSrc: '' }, { title: 'Collaborate in real-time', description: 'Work together with your team seamlessly. See changes instantly, leave comments, and ship faster with built-in collaboration tools.', imageSrc: '' }, { title: 'Launch with confidence', description: 'Deploy to production with one click. Our infrastructure handles scaling, security, and performance so you can focus on your product.', imageSrc: '' }], description: 'Feature items', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-feature-alternating',
    level: 'section',
    code: '<ShadcnFeatureAlternating headline="How it works" />',
    suggestedWith: ['shadcn-hero-split', 'shadcn-cta-split'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-feature-with-tabs',
    name: 'ShadcnFeatureWithTabs',
    displayName: 'Tabbed Features',
    source: 'shadcn',
    categories: ['feature', 'section'],
    tags: ['features', 'tabs', 'showcase', 'interactive'],
    description: 'A tabbed feature showcase using shadcn Tabs component',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'One platform, endless possibilities', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Explore the different ways our platform can help your team succeed.', description: 'Section description', group: 'content' },
      { name: 'tabs', type: 'array', required: false, default: [{ label: 'Design', value: 'design', title: 'Powerful Design Tools', content: 'Create beautiful interfaces with our intuitive design system.' }, { label: 'Develop', value: 'develop', title: 'Developer Experience', content: 'Write clean, maintainable code with TypeScript support.' }, { label: 'Deploy', value: 'deploy', title: 'One-Click Deployment', content: 'Ship to production in seconds with our CI/CD pipeline.' }], description: 'Tab items', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-tabs'],
    modulePath: 'shadcn-feature-with-tabs',
    level: 'section',
    code: '<ShadcnFeatureWithTabs headline="One platform, endless possibilities" />',
    suggestedWith: ['shadcn-hero-centered', 'shadcn-testimonial-grid'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-feature-comparison',
    name: 'ShadcnFeatureComparison',
    displayName: 'Feature Comparison',
    source: 'shadcn',
    categories: ['feature', 'section'],
    tags: ['features', 'comparison', 'table', 'versus', 'competitors'],
    description: 'A feature comparison table with check/cross indicators',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Compare features', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'See how we stack up against the competition.', description: 'Section description', group: 'content' },
      { name: 'headers', type: 'array', required: false, default: ['Feature', 'Our Product', 'Competitor A', 'Competitor B'], description: 'Table headers', group: 'content' },
      { name: 'features', type: 'array', required: false, default: [{ name: 'Unlimited Projects', values: [true, false, true] }, { name: 'Custom Domains', values: [true, true, false] }, { name: 'Analytics Dashboard', values: [true, false, false] }], description: 'Feature rows', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-feature-comparison',
    level: 'section',
    code: '<ShadcnFeatureComparison headline="Compare features" />',
    suggestedWith: ['shadcn-pricing-three-tier', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-feature-list',
    name: 'ShadcnFeatureList',
    displayName: 'Feature List',
    source: 'shadcn',
    categories: ['feature', 'section'],
    tags: ['features', 'list', 'checklist', 'vertical'],
    description: 'A vertical feature list with check icons and descriptions',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Why choose us', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Here are the top reasons teams love our platform.', description: 'Section description', group: 'content' },
      { name: 'features', type: 'array', required: false, default: [{ title: 'Easy Integration', description: 'Connect with your existing tools in minutes, not days.' }, { title: 'Real-time Sync', description: 'Changes propagate instantly across all connected devices.' }, { title: 'Advanced Analytics', description: 'Get deep insights into usage patterns and performance.' }], description: 'Feature items', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-feature-list',
    level: 'section',
    code: '<ShadcnFeatureList headline="Why choose us" />',
    suggestedWith: ['shadcn-hero-split', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-feature-cards',
    name: 'ShadcnFeatureCards',
    displayName: 'Feature Cards',
    source: 'shadcn',
    categories: ['feature', 'section'],
    tags: ['features', 'cards', 'grid', 'icons', 'hover'],
    description: 'A feature cards grid with icons and hover effects',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Built for teams of all sizes', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'From solo developers to enterprise organizations, we have you covered.', description: 'Section description', group: 'content' },
      { name: 'features', type: 'array', required: false, default: [{ title: 'Beautiful Design', description: 'Professionally crafted components that look great out of the box.', icon: 'palette' }, { title: 'Clean Code', description: 'Well-structured, typed, and documented code you can trust.', icon: 'code' }, { title: 'Fast Shipping', description: 'Go from idea to production in record time.', icon: 'rocket' }], description: 'Feature items', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-feature-cards',
    level: 'section',
    code: '<ShadcnFeatureCards headline="Built for teams of all sizes" />',
    suggestedWith: ['shadcn-hero-centered', 'shadcn-testimonial-grid'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-feature-centered',
    name: 'ShadcnFeatureCentered',
    displayName: 'Centered Features',
    source: 'shadcn',
    categories: ['feature', 'section'],
    tags: ['features', 'centered', 'checklist', 'badge', 'image'],
    description: 'Centered features section with badge, checklist, and image preview',
    previewImage: '',
    props: [
      { name: 'badgeText', type: 'string', required: false, default: 'Features', description: 'Badge text', group: 'content' },
      { name: 'headline', type: 'string', required: false, default: 'Everything you need to ship faster', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Our comprehensive toolkit gives you all the building blocks to create production-ready applications in record time.', description: 'Section description', group: 'content' },
      { name: 'features', type: 'array', required: false, default: ['Responsive components', 'Dark mode support', 'TypeScript ready', 'Accessible by default', 'Fully customizable', 'Regular updates'], description: 'Feature list items', group: 'content' },
      { name: 'imageSrc', type: 'image', required: false, default: '', description: 'Preview image URL', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-feature-centered',
    level: 'section',
    code: '<ShadcnFeatureCentered headline="Everything you need to ship faster" />',
    suggestedWith: ['shadcn-hero-minimal', 'shadcn-cta-banner'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-feature-split',
    name: 'ShadcnFeatureSplit',
    displayName: 'Split Features',
    source: 'shadcn',
    categories: ['feature', 'section'],
    tags: ['features', 'split', 'image', 'checklist', 'cta'],
    description: 'A split layout feature section with text, checklist, and image',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Built for developers who care', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'We believe great tools should get out of your way. Our platform is designed to help you focus on building, not configuring.', description: 'Section description', group: 'content' },
      { name: 'features', type: 'array', required: false, default: ['Hot module replacement for instant feedback', 'TypeScript support with full type safety', 'Built-in testing framework', 'Automatic code splitting'], description: 'Feature list items', group: 'content' },
      { name: 'ctaText', type: 'string', required: false, default: 'Learn More', description: 'CTA button text', group: 'content' },
      { name: 'imageSrc', type: 'image', required: false, default: '', description: 'Image URL', group: 'content' },
      { name: 'imagePosition', type: 'select', required: false, default: 'right', options: ['left', 'right'], description: 'Image position', group: 'style' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-feature-split',
    level: 'section',
    code: '<ShadcnFeatureSplit headline="Built for developers who care" />',
    suggestedWith: ['shadcn-hero-split', 'shadcn-testimonial-single'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-feature-timeline',
    name: 'ShadcnFeatureTimeline',
    displayName: 'Feature Timeline',
    source: 'shadcn',
    categories: ['feature', 'section'],
    tags: ['features', 'timeline', 'milestones', 'history', 'journey'],
    description: 'A timeline-style feature section showing milestones or history',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Our journey', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'A look at the milestones that shaped our product.', description: 'Section description', group: 'content' },
      { name: 'items', type: 'array', required: false, default: [{ title: 'Founded', description: 'Started with a vision to simplify web development for everyone.', date: '2021' }, { title: 'First Release', description: 'Launched our MVP with core features and 100 early adopters.', date: '2022' }, { title: 'Series A', description: 'Raised funding to expand the team and accelerate development.', date: '2023' }, { title: '10K Users', description: 'Reached a major milestone with 10,000 active users worldwide.', date: '2024' }], description: 'Timeline items', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-feature-timeline',
    level: 'section',
    code: '<ShadcnFeatureTimeline headline="Our journey" />',
    suggestedWith: ['shadcn-team-grid', 'shadcn-stats-section'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  // ============================================================
  // SECTION-LEVEL COMPONENTS: PRICING
  // ============================================================

  {
    id: 'shadcn-pricing-three-tier',
    name: 'ShadcnPricingThreeTier',
    displayName: '3-Tier Pricing',
    source: 'shadcn',
    categories: ['pricing', 'section'],
    tags: ['pricing', 'plans', 'tiers', 'billing', 'subscription'],
    description: 'A 3-tier pricing table with highlighted recommended plan',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Simple, transparent pricing', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Choose the plan that works best for you and your team.', description: 'Section description', group: 'content' },
      { name: 'plans', type: 'array', required: false, default: [{ name: 'Starter', price: '$9', period: '/month', description: 'Perfect for individuals.', features: ['5 Projects', '10GB Storage', 'Basic Analytics', 'Email Support'], cta: 'Get Started', highlighted: false }, { name: 'Pro', price: '$29', period: '/month', description: 'Ideal for growing teams.', features: ['Unlimited Projects', '100GB Storage', 'Advanced Analytics', 'Priority Support', 'Custom Domains', 'API Access'], cta: 'Start Free Trial', highlighted: true }, { name: 'Enterprise', price: '$99', period: '/month', description: 'For large organizations.', features: ['Everything in Pro', 'Unlimited Storage', 'Dedicated Support', 'SLA Guarantee', 'SSO / SAML', 'Custom Integrations'], cta: 'Contact Sales', highlighted: false }], description: 'Pricing plans', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-pricing-three-tier',
    level: 'section',
    code: '<ShadcnPricingThreeTier headline="Simple, transparent pricing" />',
    suggestedWith: ['shadcn-faq-accordion', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-pricing-toggle',
    name: 'ShadcnPricingToggle',
    displayName: 'Toggle Pricing',
    source: 'shadcn',
    categories: ['pricing', 'section'],
    tags: ['pricing', 'plans', 'toggle', 'monthly', 'annual', 'billing'],
    description: 'Pricing with monthly/annual toggle switch',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Pricing that scales with you', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Save 20% with annual billing.', description: 'Section description', group: 'content' },
      { name: 'plans', type: 'array', required: false, default: [{ name: 'Basic', monthlyPrice: '$12', annualPrice: '$10', description: 'Essential features.', features: ['3 Projects', '5GB Storage', 'Community Support'], cta: 'Get Started', highlighted: false }, { name: 'Professional', monthlyPrice: '$36', annualPrice: '$29', description: 'Advanced tools.', features: ['Unlimited Projects', '50GB Storage', 'Priority Support', 'Custom Domain', 'Analytics'], cta: 'Start Free Trial', highlighted: true }, { name: 'Business', monthlyPrice: '$84', annualPrice: '$67', description: 'Complete solution.', features: ['Everything in Pro', 'Unlimited Storage', 'Dedicated Manager', 'SLA', 'SSO'], cta: 'Contact Sales', highlighted: false }], description: 'Pricing plans', group: 'content' },
    ],
    dependencies: ['lucide-react', '@radix-ui/react-switch', '@radix-ui/react-label'],
    modulePath: 'shadcn-pricing-toggle',
    level: 'section',
    code: '<ShadcnPricingToggle headline="Pricing that scales with you" />',
    suggestedWith: ['shadcn-faq-accordion', 'shadcn-feature-comparison'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-pricing-cards',
    name: 'ShadcnPricingCards',
    displayName: 'Pricing Cards',
    source: 'shadcn',
    categories: ['pricing', 'section'],
    tags: ['pricing', 'plans', 'cards', 'simple', '2-tier'],
    description: 'A card-based pricing layout with two plans',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Choose your plan', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Start free, upgrade when you need more.', description: 'Section description', group: 'content' },
      { name: 'plans', type: 'array', required: false, default: [{ name: 'Free', price: '$0', period: '/month', features: ['1 Project', '1GB Storage', 'Community Support'], cta: 'Get Started Free' }, { name: 'Team', price: '$49', period: '/month', features: ['10 Projects', '50GB Storage', 'Priority Support', 'Custom Domain'], cta: 'Start Free Trial' }], description: 'Pricing plans', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-pricing-cards',
    level: 'section',
    code: '<ShadcnPricingCards headline="Choose your plan" />',
    suggestedWith: ['shadcn-faq-simple', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-pricing-simple',
    name: 'ShadcnPricingSimple',
    displayName: 'Simple Pricing',
    source: 'shadcn',
    categories: ['pricing', 'section'],
    tags: ['pricing', 'single', 'simple', 'flat-rate'],
    description: 'A simple single pricing card with feature list',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'One plan, everything included', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'No tiers, no surprises. Just a simple, fair price for everyone.', description: 'Section description', group: 'content' },
      { name: 'price', type: 'string', required: false, default: '$19', description: 'Price amount', group: 'content' },
      { name: 'period', type: 'string', required: false, default: '/month', description: 'Price period', group: 'content' },
      { name: 'features', type: 'array', required: false, default: ['Unlimited projects', '100GB storage', 'Priority support', 'Custom domains', 'Advanced analytics', 'Team collaboration'], description: 'Feature list', group: 'content' },
      { name: 'ctaText', type: 'string', required: false, default: 'Start Your Free Trial', description: 'Button text', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-pricing-simple',
    level: 'section',
    code: '<ShadcnPricingSimple headline="One plan, everything included" />',
    suggestedWith: ['shadcn-faq-accordion', 'shadcn-testimonial-single'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-pricing-comparison',
    name: 'ShadcnPricingComparison',
    displayName: 'Pricing Comparison',
    source: 'shadcn',
    categories: ['pricing', 'section'],
    tags: ['pricing', 'comparison', 'table', 'detailed', 'plans'],
    description: 'A detailed pricing comparison table with categories',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Compare all plans', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Find the perfect plan for your needs.', description: 'Section description', group: 'content' },
      { name: 'plans', type: 'array', required: false, default: [{ name: 'Free', price: '$0/mo', cta: 'Get Started' }, { name: 'Pro', price: '$29/mo', cta: 'Start Trial' }, { name: 'Enterprise', price: 'Custom', cta: 'Contact Us' }], description: 'Plan columns', group: 'content' },
      { name: 'features', type: 'array', required: false, default: [{ category: 'Core Features', items: [{ name: 'Projects', values: ['3', 'Unlimited', 'Unlimited'] }, { name: 'Storage', values: ['1GB', '100GB', 'Unlimited'] }] }], description: 'Feature categories and items', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-pricing-comparison',
    level: 'section',
    code: '<ShadcnPricingComparison headline="Compare all plans" />',
    suggestedWith: ['shadcn-faq-accordion', 'shadcn-cta-banner'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-pricing-enterprise',
    name: 'ShadcnPricingEnterprise',
    displayName: 'Enterprise Pricing',
    source: 'shadcn',
    categories: ['pricing', 'section'],
    tags: ['pricing', 'enterprise', 'contact', 'sales', 'custom'],
    description: 'An enterprise pricing section with contact sales CTA',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Enterprise-grade solutions', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: "Custom pricing tailored to your organization's needs. Get dedicated support, advanced security, and unlimited scale.", description: 'Section description', group: 'content' },
      { name: 'features', type: 'array', required: false, default: ['Custom contract and SLA', 'Dedicated account manager', 'SSO / SAML authentication', 'Advanced audit logs', 'Custom integrations', 'On-premise deployment option', 'Priority 24/7 support', '99.99% uptime guarantee'], description: 'Feature list', group: 'content' },
      { name: 'ctaText', type: 'string', required: false, default: 'Contact Sales', description: 'Button text', group: 'content' },
      { name: 'contactEmail', type: 'string', required: false, default: 'sales@example.com', description: 'Contact email', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-pricing-enterprise',
    level: 'section',
    code: '<ShadcnPricingEnterprise headline="Enterprise-grade solutions" />',
    suggestedWith: ['shadcn-feature-comparison', 'shadcn-testimonial-single'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  // ============================================================
  // SECTION-LEVEL COMPONENTS: TESTIMONIALS
  // ============================================================

  {
    id: 'shadcn-testimonial-grid',
    name: 'ShadcnTestimonialGrid',
    displayName: 'Testimonial Grid',
    source: 'shadcn',
    categories: ['testimonial', 'section'],
    tags: ['testimonials', 'reviews', 'grid', 'social-proof', 'ratings'],
    description: 'A grid layout of testimonial cards with star ratings',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Loved by thousands', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'See what our customers have to say about their experience.', description: 'Section description', group: 'content' },
      { name: 'testimonials', type: 'array', required: false, default: [{ quote: 'This platform completely transformed how our team works.', author: 'Sarah Chen', role: 'CTO at TechCorp', rating: 5 }, { quote: 'Simple, powerful, and beautifully designed.', author: 'Marcus Johnson', role: 'Lead Developer', rating: 5 }, { quote: 'The customer support alone is worth the price.', author: 'Emily Rodriguez', role: 'Product Manager', rating: 5 }], description: 'Testimonial items', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-testimonial-grid',
    level: 'section',
    code: '<ShadcnTestimonialGrid headline="Loved by thousands" />',
    suggestedWith: ['shadcn-cta-centered', 'shadcn-logo-cloud'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-testimonial-carousel',
    name: 'ShadcnTestimonialCarousel',
    displayName: 'Testimonial Carousel',
    source: 'shadcn',
    categories: ['testimonial', 'section'],
    tags: ['testimonials', 'carousel', 'slider', 'reviews', 'social-proof'],
    description: 'A simple testimonial slider with navigation controls',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'What our customers say', description: 'Section heading', group: 'content' },
      { name: 'testimonials', type: 'array', required: false, default: [{ quote: 'An amazing product that has revolutionized our workflow.', author: 'Sarah Chen', role: 'CTO at TechCorp' }, { quote: 'The best tool we have adopted this year.', author: 'Marcus Johnson', role: 'Lead Developer at StartupX' }, { quote: 'Incredible value for the price.', author: 'Emily Rodriguez', role: 'Product Manager at DesignCo' }], description: 'Testimonial items', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-testimonial-carousel',
    level: 'section',
    code: '<ShadcnTestimonialCarousel headline="What our customers say" />',
    suggestedWith: ['shadcn-cta-banner', 'shadcn-pricing-three-tier'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-testimonial-single',
    name: 'ShadcnTestimonialSingle',
    displayName: 'Single Testimonial',
    source: 'shadcn',
    categories: ['testimonial', 'section'],
    tags: ['testimonial', 'quote', 'featured', 'review', 'single'],
    description: 'A single featured testimonial with large quote',
    previewImage: '',
    props: [
      { name: 'quote', type: 'string', required: false, default: 'This product has been a game-changer for our entire organization. The ease of use combined with powerful features means our team ships faster than ever. I cannot recommend it highly enough.', description: 'Testimonial quote', group: 'content' },
      { name: 'author', type: 'string', required: false, default: 'Sarah Chen', description: 'Author name', group: 'content' },
      { name: 'role', type: 'string', required: false, default: 'Chief Technology Officer at TechCorp', description: 'Author role', group: 'content' },
      { name: 'companyLogo', type: 'image', required: false, default: '', description: 'Company logo URL', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-testimonial-single',
    level: 'section',
    code: '<ShadcnTestimonialSingle quote="This product has been a game-changer." />',
    suggestedWith: ['shadcn-cta-centered', 'shadcn-feature-split'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-testimonial-with-avatar',
    name: 'ShadcnTestimonialWithAvatar',
    displayName: 'Testimonials with Avatars',
    source: 'shadcn',
    categories: ['testimonial', 'section'],
    tags: ['testimonials', 'avatars', 'reviews', 'social-proof', 'photos'],
    description: 'Testimonial cards with avatar images and star ratings',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Trusted by industry leaders', description: 'Section heading', group: 'content' },
      { name: 'testimonials', type: 'array', required: false, default: [{ quote: 'Absolutely phenomenal product.', author: 'Sarah Chen', role: 'CTO at TechCorp', avatar: '', initials: 'SC', rating: 5 }, { quote: 'The best investment we have made.', author: 'Marcus Johnson', role: 'Lead Developer', avatar: '', initials: 'MJ', rating: 5 }, { quote: 'Outstanding support and product.', author: 'Emily Rodriguez', role: 'Product Manager', avatar: '', initials: 'ER', rating: 5 }], description: 'Testimonial items', group: 'content' },
    ],
    dependencies: ['lucide-react', '@radix-ui/react-avatar'],
    modulePath: 'shadcn-testimonial-with-avatar',
    level: 'section',
    code: '<ShadcnTestimonialWithAvatar headline="Trusted by industry leaders" />',
    suggestedWith: ['shadcn-cta-centered', 'shadcn-logo-cloud'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-testimonial-marquee',
    name: 'ShadcnTestimonialMarquee',
    displayName: 'Testimonial Marquee',
    source: 'shadcn',
    categories: ['testimonial', 'section'],
    tags: ['testimonials', 'marquee', 'scrolling', 'animation', 'social-proof'],
    description: 'Auto-scrolling testimonial marquee with CSS animation',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'What people are saying', description: 'Section heading', group: 'content' },
      { name: 'testimonials', type: 'array', required: false, default: [{ quote: 'Incredible tool that changed how we build products.', author: 'Sarah C.', role: 'CTO' }, { quote: 'Simple, powerful, and a joy to use every day.', author: 'Marcus J.', role: 'Developer' }, { quote: 'The best developer experience I have ever had.', author: 'Emily R.', role: 'Engineer' }], description: 'Testimonial items', group: 'content' },
      { name: 'speed', type: 'number', required: false, default: 30, description: 'Animation speed in seconds', group: 'style' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-testimonial-marquee',
    level: 'section',
    code: '<ShadcnTestimonialMarquee headline="What people are saying" />',
    suggestedWith: ['shadcn-cta-banner', 'shadcn-hero-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-testimonial-video',
    name: 'ShadcnTestimonialVideo',
    displayName: 'Video Testimonials',
    source: 'shadcn',
    categories: ['testimonial', 'section'],
    tags: ['testimonials', 'video', 'reviews', 'media', 'social-proof'],
    description: 'A video testimonials section with thumbnails and play buttons',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Hear from our customers', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Watch real stories from teams who transformed their workflow.', description: 'Section description', group: 'content' },
      { name: 'testimonials', type: 'array', required: false, default: [{ name: 'Sarah Chen', role: 'CTO at TechCorp', thumbnailSrc: '', videoUrl: '', quote: 'This tool transformed how we build products.' }, { name: 'Marcus Johnson', role: 'Lead Developer', thumbnailSrc: '', videoUrl: '', quote: 'Our deployment time went from hours to minutes.' }, { name: 'Emily Rodriguez', role: 'Product Manager', thumbnailSrc: '', videoUrl: '', quote: 'The team collaboration features are unmatched.' }], description: 'Video testimonial items', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-testimonial-video',
    level: 'section',
    code: '<ShadcnTestimonialVideo headline="Hear from our customers" />',
    suggestedWith: ['shadcn-cta-centered', 'shadcn-hero-video'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  // ============================================================
  // SECTION-LEVEL COMPONENTS: FAQ
  // ============================================================

  {
    id: 'shadcn-faq-accordion',
    name: 'ShadcnFaqAccordion',
    displayName: 'FAQ Accordion',
    source: 'shadcn',
    categories: ['faq', 'section'],
    tags: ['faq', 'accordion', 'questions', 'answers', 'help'],
    description: 'An accordion-style FAQ section using shadcn Accordion',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Frequently asked questions', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Find answers to common questions about our product.', description: 'Section description', group: 'content' },
      { name: 'faqs', type: 'array', required: false, default: [{ question: 'What is included in the free plan?', answer: 'The free plan includes up to 3 projects, 1GB of storage, community support, and access to all core features.' }, { question: 'Can I upgrade or downgrade my plan?', answer: 'Yes, you can change your plan at any time from your account settings.' }, { question: 'Is there a free trial for paid plans?', answer: 'All paid plans come with a 14-day free trial with full access.' }], description: 'FAQ items', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-accordion'],
    modulePath: 'shadcn-faq-accordion',
    level: 'section',
    code: '<ShadcnFaqAccordion headline="Frequently asked questions" />',
    suggestedWith: ['shadcn-pricing-three-tier', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-faq-two-column',
    name: 'ShadcnFaqTwoColumn',
    displayName: 'Two-Column FAQ',
    source: 'shadcn',
    categories: ['faq', 'section'],
    tags: ['faq', 'two-column', 'questions', 'answers', 'grid'],
    description: 'A two-column layout FAQ section',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Frequently asked questions', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Everything you need to know about our product and billing.', description: 'Section description', group: 'content' },
      { name: 'faqs', type: 'array', required: false, default: [{ question: 'How does the free trial work?', answer: 'You get full access to all features for 14 days. No credit card required.' }, { question: 'Can I change plans later?', answer: 'Yes, you can upgrade or downgrade at any time.' }, { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, and bank transfers.' }, { question: 'Is my data secure?', answer: 'We use industry-standard encryption and are SOC2 compliant.' }], description: 'FAQ items', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-faq-two-column',
    level: 'section',
    code: '<ShadcnFaqTwoColumn headline="Frequently asked questions" />',
    suggestedWith: ['shadcn-pricing-three-tier', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-faq-categorized',
    name: 'ShadcnFaqCategorized',
    displayName: 'Categorized FAQ',
    source: 'shadcn',
    categories: ['faq', 'section'],
    tags: ['faq', 'categories', 'tabs', 'questions', 'organized'],
    description: 'A FAQ section with category tabs and accordion items',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Help center', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Browse frequently asked questions by category.', description: 'Section description', group: 'content' },
      { name: 'categories', type: 'array', required: false, default: [{ label: 'General', value: 'general', faqs: [{ question: 'What is this product?', answer: 'A comprehensive platform for building web applications.' }] }, { label: 'Billing', value: 'billing', faqs: [{ question: 'How does billing work?', answer: 'We bill monthly or annually based on your plan.' }] }, { label: 'Technical', value: 'technical', faqs: [{ question: 'What technologies do you support?', answer: 'React, Next.js, Vue, and more.' }] }], description: 'FAQ categories', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-tabs', '@radix-ui/react-accordion'],
    modulePath: 'shadcn-faq-categorized',
    level: 'section',
    code: '<ShadcnFaqCategorized headline="Help center" />',
    suggestedWith: ['shadcn-pricing-three-tier', 'shadcn-contact-form'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-faq-simple',
    name: 'ShadcnFaqSimple',
    displayName: 'Simple FAQ',
    source: 'shadcn',
    categories: ['faq', 'section'],
    tags: ['faq', 'simple', 'questions', 'answers', 'list'],
    description: 'A simple Q&A list with separators',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Common questions', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Quick answers to questions you might have.', description: 'Section description', group: 'content' },
      { name: 'faqs', type: 'array', required: false, default: [{ question: 'Is there a free plan?', answer: 'Yes, our free plan includes all core features with usage limits.' }, { question: 'How long is the free trial?', answer: 'All paid plans include a 14-day free trial.' }, { question: 'Can I cancel anytime?', answer: 'Yes, cancel your subscription at any time.' }], description: 'FAQ items', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-separator'],
    modulePath: 'shadcn-faq-simple',
    level: 'section',
    code: '<ShadcnFaqSimple headline="Common questions" />',
    suggestedWith: ['shadcn-pricing-simple', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  // ============================================================
  // SECTION-LEVEL COMPONENTS: CTA
  // ============================================================

  {
    id: 'shadcn-cta-centered',
    name: 'ShadcnCtaCentered',
    displayName: 'Centered CTA',
    source: 'shadcn',
    categories: ['cta', 'section'],
    tags: ['cta', 'call-to-action', 'centered', 'buttons'],
    description: 'A centered call-to-action section with two buttons',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Ready to get started?', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Join thousands of teams already using our platform to build better products faster.', description: 'Section description', group: 'content' },
      { name: 'primaryCta', type: 'string', required: false, default: 'Start Free Trial', description: 'Primary button text', group: 'content' },
      { name: 'secondaryCta', type: 'string', required: false, default: 'Talk to Sales', description: 'Secondary button text', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-cta-centered',
    level: 'section',
    code: '<ShadcnCtaCentered headline="Ready to get started?" />',
    suggestedWith: ['shadcn-faq-accordion', 'shadcn-footer-default'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-cta-split',
    name: 'ShadcnCtaSplit',
    displayName: 'Split CTA',
    source: 'shadcn',
    categories: ['cta', 'section'],
    tags: ['cta', 'call-to-action', 'split', 'image'],
    description: 'A split CTA section with text and image',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Start building today', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Get up and running in minutes. Our platform handles the infrastructure so you can focus on what matters most.', description: 'Section description', group: 'content' },
      { name: 'ctaText', type: 'string', required: false, default: 'Get Started Free', description: 'Button text', group: 'content' },
      { name: 'imageSrc', type: 'image', required: false, default: '', description: 'Image URL', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-cta-split',
    level: 'section',
    code: '<ShadcnCtaSplit headline="Start building today" />',
    suggestedWith: ['shadcn-testimonial-single', 'shadcn-footer-default'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-cta-banner',
    name: 'ShadcnCtaBanner',
    displayName: 'CTA Banner',
    source: 'shadcn',
    categories: ['cta', 'section'],
    tags: ['cta', 'call-to-action', 'banner', 'full-width', 'bold'],
    description: 'A full-width CTA banner with primary background color',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Boost your productivity today', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Start your 14-day free trial. No credit card required.', description: 'Section description', group: 'content' },
      { name: 'ctaText', type: 'string', required: false, default: 'Get Started', description: 'Button text', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-cta-banner',
    level: 'section',
    code: '<ShadcnCtaBanner headline="Boost your productivity today" />',
    suggestedWith: ['shadcn-footer-default', 'shadcn-pricing-three-tier'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-cta-with-form',
    name: 'ShadcnCtaWithForm',
    displayName: 'CTA with Form',
    source: 'shadcn',
    categories: ['cta', 'section'],
    tags: ['cta', 'call-to-action', 'form', 'email', 'signup'],
    description: 'A CTA section with email signup form',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Get early access', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Be the first to try new features. Sign up for early access and get exclusive updates.', description: 'Section description', group: 'content' },
      { name: 'placeholder', type: 'string', required: false, default: 'Enter your email', description: 'Input placeholder', group: 'content' },
      { name: 'buttonText', type: 'string', required: false, default: 'Sign Up', description: 'Button text', group: 'content' },
      { name: 'disclaimer', type: 'string', required: false, default: 'We respect your privacy. Unsubscribe at any time.', description: 'Disclaimer text', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-cta-with-form',
    level: 'section',
    code: '<ShadcnCtaWithForm headline="Get early access" />',
    suggestedWith: ['shadcn-footer-default', 'shadcn-testimonial-grid'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-cta-newsletter',
    name: 'ShadcnCtaNewsletter',
    displayName: 'Newsletter CTA',
    source: 'shadcn',
    categories: ['cta', 'section'],
    tags: ['cta', 'newsletter', 'email', 'subscribe', 'signup'],
    description: 'A newsletter signup CTA with mail icon',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Subscribe to our newsletter', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Get the latest updates, articles, and resources delivered straight to your inbox every week.', description: 'Section description', group: 'content' },
      { name: 'placeholder', type: 'string', required: false, default: 'you@example.com', description: 'Input placeholder', group: 'content' },
      { name: 'buttonText', type: 'string', required: false, default: 'Subscribe', description: 'Button text', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-cta-newsletter',
    level: 'section',
    code: '<ShadcnCtaNewsletter headline="Subscribe to our newsletter" />',
    suggestedWith: ['shadcn-footer-default', 'shadcn-blog-grid'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  // ============================================================
  // SECTION-LEVEL COMPONENTS: HEADERS
  // ============================================================

  {
    id: 'shadcn-header-default',
    name: 'ShadcnHeaderDefault',
    displayName: 'Default Header',
    source: 'shadcn',
    categories: ['header', 'section'],
    tags: ['header', 'navbar', 'navigation', 'menu', 'top'],
    description: 'A standard header with brand name, nav links, and CTA button',
    previewImage: '',
    props: [
      { name: 'brandName', type: 'string', required: false, default: 'Acme Inc', description: 'Brand name', group: 'content' },
      { name: 'navLinks', type: 'array', required: false, default: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'About', href: '#about' }, { label: 'Blog', href: '#blog' }], description: 'Navigation links', group: 'content' },
      { name: 'ctaText', type: 'string', required: false, default: 'Get Started', description: 'CTA button text', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-header-default',
    level: 'section',
    code: '<ShadcnHeaderDefault brandName="Acme Inc" />',
    suggestedWith: ['shadcn-hero-centered', 'shadcn-footer-default'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-header-centered',
    name: 'ShadcnHeaderCentered',
    displayName: 'Centered Header',
    source: 'shadcn',
    categories: ['header', 'section'],
    tags: ['header', 'navbar', 'centered', 'navigation'],
    description: 'A centered navigation header layout',
    previewImage: '',
    props: [
      { name: 'brandName', type: 'string', required: false, default: 'Acme Inc', description: 'Brand name', group: 'content' },
      { name: 'navLinks', type: 'array', required: false, default: [{ label: 'Home', href: '#' }, { label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'Contact', href: '#contact' }], description: 'Navigation links', group: 'content' },
      { name: 'ctaText', type: 'string', required: false, default: 'Sign Up', description: 'CTA button text', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-header-centered',
    level: 'section',
    code: '<ShadcnHeaderCentered brandName="Acme Inc" />',
    suggestedWith: ['shadcn-hero-minimal', 'shadcn-footer-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-header-with-cta',
    name: 'ShadcnHeaderWithCta',
    displayName: 'Header with CTA',
    source: 'shadcn',
    categories: ['header', 'section'],
    tags: ['header', 'navbar', 'cta', 'login', 'signup'],
    description: 'A header with login and CTA buttons',
    previewImage: '',
    props: [
      { name: 'brandName', type: 'string', required: false, default: 'Acme Inc', description: 'Brand name', group: 'content' },
      { name: 'navLinks', type: 'array', required: false, default: [{ label: 'Product', href: '#product' }, { label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'Docs', href: '#docs' }], description: 'Navigation links', group: 'content' },
      { name: 'loginText', type: 'string', required: false, default: 'Log In', description: 'Login link text', group: 'content' },
      { name: 'ctaText', type: 'string', required: false, default: 'Start Free Trial', description: 'CTA button text', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-header-with-cta',
    level: 'section',
    code: '<ShadcnHeaderWithCta brandName="Acme Inc" />',
    suggestedWith: ['shadcn-hero-centered', 'shadcn-footer-default'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-header-transparent',
    name: 'ShadcnHeaderTransparent',
    displayName: 'Transparent Header',
    source: 'shadcn',
    categories: ['header', 'section'],
    tags: ['header', 'navbar', 'transparent', 'overlay'],
    description: 'A transparent overlay header that sits on top of content',
    previewImage: '',
    props: [
      { name: 'brandName', type: 'string', required: false, default: 'Acme Inc', description: 'Brand name', group: 'content' },
      { name: 'navLinks', type: 'array', required: false, default: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'About', href: '#about' }, { label: 'Contact', href: '#contact' }], description: 'Navigation links', group: 'content' },
      { name: 'ctaText', type: 'string', required: false, default: 'Get Started', description: 'CTA button text', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-header-transparent',
    level: 'section',
    code: '<ShadcnHeaderTransparent brandName="Acme Inc" />',
    suggestedWith: ['shadcn-hero-gradient', 'shadcn-hero-video'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-header-mega-menu',
    name: 'ShadcnHeaderMegaMenu',
    displayName: 'Mega Menu Header',
    source: 'shadcn',
    categories: ['header', 'section'],
    tags: ['header', 'navbar', 'mega-menu', 'dropdown', 'navigation'],
    description: 'A header with mega menu dropdown navigation',
    previewImage: '',
    props: [
      { name: 'brandName', type: 'string', required: false, default: 'Acme Inc', description: 'Brand name', group: 'content' },
      { name: 'menuItems', type: 'array', required: false, default: [{ label: 'Products', children: [{ label: 'Analytics', description: 'Measure and optimize performance', href: '#' }, { label: 'Automation', description: 'Automate your workflows', href: '#' }] }, { label: 'Pricing', href: '#pricing' }, { label: 'Docs', href: '#docs' }], description: 'Menu items with optional children', group: 'content' },
      { name: 'ctaText', type: 'string', required: false, default: 'Get Started', description: 'CTA button text', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-header-mega-menu',
    level: 'section',
    code: '<ShadcnHeaderMegaMenu brandName="Acme Inc" />',
    suggestedWith: ['shadcn-hero-centered', 'shadcn-footer-default'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  // ============================================================
  // SECTION-LEVEL COMPONENTS: FOOTERS
  // ============================================================

  {
    id: 'shadcn-footer-default',
    name: 'ShadcnFooterDefault',
    displayName: 'Default Footer',
    source: 'shadcn',
    categories: ['footer', 'section'],
    tags: ['footer', 'navigation', 'links', 'columns', 'copyright'],
    description: 'A standard 4-column footer with brand, links, and copyright',
    previewImage: '',
    props: [
      { name: 'brandName', type: 'string', required: false, default: 'Acme Inc', description: 'Brand name', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Building the future of web development, one component at a time.', description: 'Brand description', group: 'content' },
      { name: 'columns', type: 'array', required: false, default: [{ title: 'Product', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }] }, { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }] }, { title: 'Resources', links: [{ label: 'Help Center', href: '#' }, { label: 'Community', href: '#' }] }, { title: 'Legal', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }] }], description: 'Footer columns', group: 'content' },
      { name: 'copyright', type: 'string', required: false, default: '2024 Acme Inc. All rights reserved.', description: 'Copyright text', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-separator'],
    modulePath: 'shadcn-footer-default',
    level: 'section',
    code: '<ShadcnFooterDefault brandName="Acme Inc" />',
    suggestedWith: ['shadcn-header-default', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-footer-minimal',
    name: 'ShadcnFooterMinimal',
    displayName: 'Minimal Footer',
    source: 'shadcn',
    categories: ['footer', 'section'],
    tags: ['footer', 'minimal', 'simple', 'copyright', 'links'],
    description: 'A minimal single-row footer with brand, copyright, and links',
    previewImage: '',
    props: [
      { name: 'brandName', type: 'string', required: false, default: 'Acme Inc', description: 'Brand name', group: 'content' },
      { name: 'links', type: 'array', required: false, default: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }, { label: 'Contact', href: '#' }], description: 'Footer links', group: 'content' },
      { name: 'copyright', type: 'string', required: false, default: '2024 Acme Inc. All rights reserved.', description: 'Copyright text', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-footer-minimal',
    level: 'section',
    code: '<ShadcnFooterMinimal brandName="Acme Inc" />',
    suggestedWith: ['shadcn-header-default', 'shadcn-cta-banner'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-footer-with-newsletter',
    name: 'ShadcnFooterWithNewsletter',
    displayName: 'Footer with Newsletter',
    source: 'shadcn',
    categories: ['footer', 'section'],
    tags: ['footer', 'newsletter', 'email', 'subscribe', 'columns'],
    description: 'A footer with integrated newsletter signup form',
    previewImage: '',
    props: [
      { name: 'brandName', type: 'string', required: false, default: 'Acme Inc', description: 'Brand name', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Making the web a better place.', description: 'Brand description', group: 'content' },
      { name: 'columns', type: 'array', required: false, default: [{ title: 'Product', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }] }, { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }] }], description: 'Footer columns', group: 'content' },
      { name: 'newsletterHeadline', type: 'string', required: false, default: 'Stay up to date', description: 'Newsletter heading', group: 'content' },
      { name: 'newsletterDescription', type: 'string', required: false, default: 'Get the latest news and updates.', description: 'Newsletter description', group: 'content' },
      { name: 'placeholder', type: 'string', required: false, default: 'Enter your email', description: 'Input placeholder', group: 'content' },
      { name: 'buttonText', type: 'string', required: false, default: 'Subscribe', description: 'Button text', group: 'content' },
      { name: 'copyright', type: 'string', required: false, default: '2024 Acme Inc. All rights reserved.', description: 'Copyright text', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-separator'],
    modulePath: 'shadcn-footer-with-newsletter',
    level: 'section',
    code: '<ShadcnFooterWithNewsletter brandName="Acme Inc" />',
    suggestedWith: ['shadcn-header-default', 'shadcn-cta-newsletter'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-footer-social',
    name: 'ShadcnFooterSocial',
    displayName: 'Social Footer',
    source: 'shadcn',
    categories: ['footer', 'section'],
    tags: ['footer', 'social', 'icons', 'links', 'github', 'twitter'],
    description: 'A footer with social media icon links',
    previewImage: '',
    props: [
      { name: 'brandName', type: 'string', required: false, default: 'Acme Inc', description: 'Brand name', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Building better tools for the modern web.', description: 'Brand description', group: 'content' },
      { name: 'links', type: 'array', required: false, default: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }], description: 'Footer links', group: 'content' },
      { name: 'socialLinks', type: 'array', required: false, default: [{ platform: 'twitter', href: '#' }, { platform: 'github', href: '#' }, { platform: 'linkedin', href: '#' }, { platform: 'youtube', href: '#' }], description: 'Social media links', group: 'content' },
      { name: 'copyright', type: 'string', required: false, default: '2024 Acme Inc. All rights reserved.', description: 'Copyright text', group: 'content' },
    ],
    dependencies: ['lucide-react', '@radix-ui/react-separator'],
    modulePath: 'shadcn-footer-social',
    level: 'section',
    code: '<ShadcnFooterSocial brandName="Acme Inc" />',
    suggestedWith: ['shadcn-header-default', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-footer-centered',
    name: 'ShadcnFooterCentered',
    displayName: 'Centered Footer',
    source: 'shadcn',
    categories: ['footer', 'section'],
    tags: ['footer', 'centered', 'simple', 'links', 'navigation'],
    description: 'A centered footer with brand, nav links, and copyright',
    previewImage: '',
    props: [
      { name: 'brandName', type: 'string', required: false, default: 'Acme Inc', description: 'Brand name', group: 'content' },
      { name: 'links', type: 'array', required: false, default: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Contact', href: '#' }], description: 'Navigation links', group: 'content' },
      { name: 'copyright', type: 'string', required: false, default: '2024 Acme Inc. All rights reserved.', description: 'Copyright text', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-separator'],
    modulePath: 'shadcn-footer-centered',
    level: 'section',
    code: '<ShadcnFooterCentered brandName="Acme Inc" />',
    suggestedWith: ['shadcn-header-centered', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  // ============================================================
  // SECTION-LEVEL COMPONENTS: FORMS
  // ============================================================

  {
    id: 'shadcn-contact-form',
    name: 'ShadcnContactForm',
    displayName: 'Contact Form',
    source: 'shadcn',
    categories: ['form', 'section'],
    tags: ['form', 'contact', 'message', 'email', 'support'],
    description: 'A complete contact form with name, email, subject, and message fields',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Get in touch', description: 'Form heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Fill out the form below and we will get back to you within 24 hours.', description: 'Form description', group: 'content' },
      { name: 'submitText', type: 'string', required: false, default: 'Send Message', description: 'Submit button text', group: 'content' },
    ],
    dependencies: ['lucide-react', '@radix-ui/react-label'],
    modulePath: 'shadcn-contact-form',
    level: 'section',
    code: '<ShadcnContactForm headline="Get in touch" />',
    suggestedWith: ['shadcn-faq-accordion', 'shadcn-footer-default'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-newsletter-form',
    name: 'ShadcnNewsletterForm',
    displayName: 'Newsletter Form',
    source: 'shadcn',
    categories: ['form', 'section'],
    tags: ['form', 'newsletter', 'email', 'subscribe', 'signup'],
    description: 'A newsletter signup form card with icon and disclaimer',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Join our newsletter', description: 'Form heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Get weekly insights, tips, and updates delivered to your inbox. Join 10,000+ subscribers.', description: 'Form description', group: 'content' },
      { name: 'placeholder', type: 'string', required: false, default: 'Enter your email address', description: 'Input placeholder', group: 'content' },
      { name: 'buttonText', type: 'string', required: false, default: 'Subscribe', description: 'Submit button text', group: 'content' },
      { name: 'disclaimer', type: 'string', required: false, default: 'We care about your data. Read our privacy policy.', description: 'Disclaimer text', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-newsletter-form',
    level: 'section',
    code: '<ShadcnNewsletterForm headline="Join our newsletter" />',
    suggestedWith: ['shadcn-blog-grid', 'shadcn-footer-default'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-login-form',
    name: 'ShadcnLoginForm',
    displayName: 'Login Form',
    source: 'shadcn',
    categories: ['form', 'section'],
    tags: ['form', 'login', 'signin', 'authentication', 'password'],
    description: 'A login form with email, password, social login, and forgot password link',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Welcome back', description: 'Form heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Sign in to your account to continue.', description: 'Form description', group: 'content' },
      { name: 'submitText', type: 'string', required: false, default: 'Sign In', description: 'Submit button text', group: 'content' },
      { name: 'signupText', type: 'string', required: false, default: 'Create an account', description: 'Signup link text', group: 'content' },
      { name: 'forgotPasswordText', type: 'string', required: false, default: 'Forgot password?', description: 'Forgot password link text', group: 'content' },
      { name: 'showSocialLogin', type: 'boolean', required: false, default: true, description: 'Show social login buttons', group: 'style' },
    ],
    dependencies: ['@radix-ui/react-label', '@radix-ui/react-separator'],
    modulePath: 'shadcn-login-form',
    level: 'section',
    code: '<ShadcnLoginForm headline="Welcome back" />',
    suggestedWith: ['shadcn-signup-form', 'shadcn-header-default'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-signup-form',
    name: 'ShadcnSignupForm',
    displayName: 'Signup Form',
    source: 'shadcn',
    categories: ['form', 'section'],
    tags: ['form', 'signup', 'register', 'authentication', 'create-account'],
    description: 'A signup/registration form with social login and email fields',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Create your account', description: 'Form heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Start your free trial. No credit card required.', description: 'Form description', group: 'content' },
      { name: 'submitText', type: 'string', required: false, default: 'Create Account', description: 'Submit button text', group: 'content' },
      { name: 'loginText', type: 'string', required: false, default: 'Sign in', description: 'Login link text', group: 'content' },
      { name: 'showSocialLogin', type: 'boolean', required: false, default: true, description: 'Show social login buttons', group: 'style' },
    ],
    dependencies: ['@radix-ui/react-label', '@radix-ui/react-separator'],
    modulePath: 'shadcn-signup-form',
    level: 'section',
    code: '<ShadcnSignupForm headline="Create your account" />',
    suggestedWith: ['shadcn-login-form', 'shadcn-header-default'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-feedback-form',
    name: 'ShadcnFeedbackForm',
    displayName: 'Feedback Form',
    source: 'shadcn',
    categories: ['form', 'section'],
    tags: ['form', 'feedback', 'rating', 'review', 'stars'],
    description: 'A feedback form with star rating and text fields',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Share your feedback', description: 'Form heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'We value your input. Help us improve by sharing your experience.', description: 'Form description', group: 'content' },
      { name: 'submitText', type: 'string', required: false, default: 'Submit Feedback', description: 'Submit button text', group: 'content' },
    ],
    dependencies: ['lucide-react', '@radix-ui/react-label'],
    modulePath: 'shadcn-feedback-form',
    level: 'section',
    code: '<ShadcnFeedbackForm headline="Share your feedback" />',
    suggestedWith: ['shadcn-testimonial-grid', 'shadcn-footer-default'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  // ============================================================
  // SECTION-LEVEL COMPONENTS: CONTENT SECTIONS
  // ============================================================

  {
    id: 'shadcn-stats-section',
    name: 'ShadcnStatsSection',
    displayName: 'Stats Section',
    source: 'shadcn',
    categories: ['content', 'section'],
    tags: ['stats', 'metrics', 'numbers', 'data', 'social-proof'],
    description: 'A statistics/metrics display section with large numbers',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Trusted by teams everywhere', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Our numbers speak for themselves.', description: 'Section description', group: 'content' },
      { name: 'stats', type: 'array', required: false, default: [{ value: '10K+', label: 'Active Users' }, { value: '99.9%', label: 'Uptime' }, { value: '150+', label: 'Countries' }, { value: '4.9/5', label: 'User Rating' }], description: 'Statistics items', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-stats-section',
    level: 'section',
    code: '<ShadcnStatsSection headline="Trusted by teams everywhere" />',
    suggestedWith: ['shadcn-logo-cloud', 'shadcn-testimonial-grid'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-logo-cloud',
    name: 'ShadcnLogoCloud',
    displayName: 'Logo Cloud',
    source: 'shadcn',
    categories: ['content', 'section'],
    tags: ['logos', 'partners', 'clients', 'brands', 'trust'],
    description: 'A partner/client logo grid for social proof',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Trusted by leading companies', description: 'Section heading', group: 'content' },
      { name: 'logos', type: 'array', required: false, default: [{ name: 'Acme Corp', src: '' }, { name: 'TechFlow', src: '' }, { name: 'Quantum', src: '' }, { name: 'Vertex', src: '' }, { name: 'Pinnacle', src: '' }, { name: 'Nexus', src: '' }], description: 'Logo items', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-logo-cloud',
    level: 'section',
    code: '<ShadcnLogoCloud headline="Trusted by leading companies" />',
    suggestedWith: ['shadcn-hero-centered', 'shadcn-stats-section'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-team-grid',
    name: 'ShadcnTeamGrid',
    displayName: 'Team Grid',
    source: 'shadcn',
    categories: ['content', 'section'],
    tags: ['team', 'members', 'people', 'about', 'avatars'],
    description: 'A team members grid with avatars and roles',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Meet our team', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'The talented people behind our product.', description: 'Section description', group: 'content' },
      { name: 'members', type: 'array', required: false, default: [{ name: 'Sarah Chen', role: 'CEO & Co-Founder', avatar: '', initials: 'SC' }, { name: 'Marcus Johnson', role: 'CTO & Co-Founder', avatar: '', initials: 'MJ' }, { name: 'Emily Rodriguez', role: 'Head of Design', avatar: '', initials: 'ER' }], description: 'Team members', group: 'content' },
    ],
    dependencies: ['@radix-ui/react-avatar'],
    modulePath: 'shadcn-team-grid',
    level: 'section',
    code: '<ShadcnTeamGrid headline="Meet our team" />',
    suggestedWith: ['shadcn-feature-timeline', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-blog-grid',
    name: 'ShadcnBlogGrid',
    displayName: 'Blog Grid',
    source: 'shadcn',
    categories: ['content', 'section'],
    tags: ['blog', 'posts', 'articles', 'news', 'content'],
    description: 'A blog posts grid with images, categories, and excerpts',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Latest from the blog', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Insights, tutorials, and updates from our team.', description: 'Section description', group: 'content' },
      { name: 'posts', type: 'array', required: false, default: [{ title: 'Getting Started with Our Platform', excerpt: 'Learn how to set up your first project and start building in minutes.', category: 'Tutorial', date: 'Jan 15, 2024', imageSrc: '' }, { title: 'Best Practices for Component Design', excerpt: 'Discover the patterns and principles that make components reusable.', category: 'Engineering', date: 'Jan 10, 2024', imageSrc: '' }, { title: 'Announcing Our New Pricing Plans', excerpt: 'More flexible pricing to better serve teams of all sizes.', category: 'News', date: 'Jan 5, 2024', imageSrc: '' }], description: 'Blog post items', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-blog-grid',
    level: 'section',
    code: '<ShadcnBlogGrid headline="Latest from the blog" />',
    suggestedWith: ['shadcn-cta-newsletter', 'shadcn-footer-default'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-content-two-column',
    name: 'ShadcnContentTwoColumn',
    displayName: 'Two-Column Content',
    source: 'shadcn',
    categories: ['content', 'section'],
    tags: ['content', 'two-column', 'text', 'image', 'about'],
    description: 'A two-column content layout with text and image',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Built for the modern web', description: 'Section heading', group: 'content' },
      { name: 'content', type: 'string', required: false, default: 'Our platform combines the latest technologies with best practices to deliver an exceptional developer experience.\n\nWith built-in support for TypeScript, automated testing, and CI/CD pipelines, your team can ship with confidence every time.', description: 'Content paragraphs (double newline separated)', group: 'content' },
      { name: 'ctaText', type: 'string', required: false, default: 'Learn More', description: 'CTA button text', group: 'content' },
      { name: 'imageSrc', type: 'image', required: false, default: '', description: 'Image URL', group: 'content' },
      { name: 'imagePosition', type: 'select', required: false, default: 'right', options: ['left', 'right'], description: 'Image position', group: 'style' },
    ],
    dependencies: [],
    modulePath: 'shadcn-content-two-column',
    level: 'section',
    code: '<ShadcnContentTwoColumn headline="Built for the modern web" />',
    suggestedWith: ['shadcn-feature-split', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-how-it-works',
    name: 'ShadcnHowItWorks',
    displayName: 'How It Works',
    source: 'shadcn',
    categories: ['content', 'section'],
    tags: ['how-it-works', 'steps', 'process', 'guide', 'numbered'],
    description: 'A step-by-step how it works section with numbered steps',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'How it works', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'Get started in three simple steps.', description: 'Section description', group: 'content' },
      { name: 'steps', type: 'array', required: false, default: [{ title: 'Create an account', description: 'Sign up for free in under 30 seconds. No credit card required.' }, { title: 'Set up your project', description: 'Choose a template or start from scratch. Import your existing data with one click.' }, { title: 'Launch and grow', description: 'Deploy to production instantly. Monitor performance and scale as you grow.' }], description: 'Step items', group: 'content' },
    ],
    dependencies: [],
    modulePath: 'shadcn-how-it-works',
    level: 'section',
    code: '<ShadcnHowItWorks headline="How it works" />',
    suggestedWith: ['shadcn-hero-centered', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-case-study-card',
    name: 'ShadcnCaseStudyCard',
    displayName: 'Case Study Cards',
    source: 'shadcn',
    categories: ['content', 'section'],
    tags: ['case-study', 'success', 'stories', 'results', 'customers'],
    description: 'A case study cards section showing customer success stories',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Customer success stories', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'See how teams use our platform to achieve incredible results.', description: 'Section description', group: 'content' },
      { name: 'caseStudies', type: 'array', required: false, default: [{ company: 'TechCorp', industry: 'SaaS', result: '3x faster deployment', quote: 'We reduced our deployment pipeline from 45 minutes to under 15 minutes.', imageSrc: '' }, { company: 'DesignStudio', industry: 'Agency', result: '60% cost reduction', quote: 'The platform eliminated the need for three separate tools.', imageSrc: '' }, { company: 'StartupX', industry: 'Fintech', result: '10x user growth', quote: 'Scaling from 1K to 10K users was seamless.', imageSrc: '' }], description: 'Case study items', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-case-study-card',
    level: 'section',
    code: '<ShadcnCaseStudyCard headline="Customer success stories" />',
    suggestedWith: ['shadcn-testimonial-grid', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-comparison-table',
    name: 'ShadcnComparisonTable',
    displayName: 'Comparison Table',
    source: 'shadcn',
    categories: ['content', 'section'],
    tags: ['comparison', 'table', 'products', 'versus', 'features'],
    description: 'A product comparison table with check/cross indicators',
    previewImage: '',
    props: [
      { name: 'headline', type: 'string', required: false, default: 'Product comparison', description: 'Section heading', group: 'content' },
      { name: 'description', type: 'string', required: false, default: 'See how different options stack up side by side.', description: 'Section description', group: 'content' },
      { name: 'products', type: 'array', required: false, default: [{ name: 'Basic', highlighted: false }, { name: 'Pro', highlighted: true }, { name: 'Enterprise', highlighted: false }], description: 'Product columns', group: 'content' },
      { name: 'features', type: 'array', required: false, default: [{ name: 'Users', values: ['Up to 5', 'Up to 50', 'Unlimited'] }, { name: 'Storage', values: ['5 GB', '100 GB', 'Unlimited'] }, { name: 'API Access', values: [false, true, true] }], description: 'Feature rows', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-comparison-table',
    level: 'section',
    code: '<ShadcnComparisonTable headline="Product comparison" />',
    suggestedWith: ['shadcn-pricing-three-tier', 'shadcn-cta-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-announcement-bar',
    name: 'ShadcnAnnouncementBar',
    displayName: 'Announcement Bar',
    source: 'shadcn',
    categories: ['content', 'section'],
    tags: ['announcement', 'banner', 'top-bar', 'notification', 'alert'],
    description: 'A top announcement bar with message and dismiss button',
    previewImage: '',
    props: [
      { name: 'message', type: 'string', required: false, default: 'We just launched our new feature!', description: 'Announcement message', group: 'content' },
      { name: 'linkText', type: 'string', required: false, default: 'Learn more', description: 'Link text', group: 'content' },
      { name: 'linkHref', type: 'string', required: false, default: '#', description: 'Link URL', group: 'content' },
      { name: 'dismissible', type: 'boolean', required: false, default: true, description: 'Can be dismissed', group: 'behavior' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-announcement-bar',
    level: 'section',
    code: '<ShadcnAnnouncementBar message="We just launched our new feature!" />',
    suggestedWith: ['shadcn-header-default', 'shadcn-hero-centered'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-cookie-banner',
    name: 'ShadcnCookieBanner',
    displayName: 'Cookie Banner',
    source: 'shadcn',
    categories: ['content', 'section'],
    tags: ['cookie', 'consent', 'gdpr', 'privacy', 'banner'],
    description: 'A cookie consent banner with accept/decline buttons',
    previewImage: '',
    props: [
      { name: 'message', type: 'string', required: false, default: 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.', description: 'Cookie message', group: 'content' },
      { name: 'acceptText', type: 'string', required: false, default: 'Accept All', description: 'Accept button text', group: 'content' },
      { name: 'declineText', type: 'string', required: false, default: 'Decline', description: 'Decline button text', group: 'content' },
      { name: 'learnMoreText', type: 'string', required: false, default: 'Learn more', description: 'Learn more link text', group: 'content' },
      { name: 'learnMoreHref', type: 'string', required: false, default: '#', description: 'Learn more link URL', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-cookie-banner',
    level: 'section',
    code: '<ShadcnCookieBanner />',
    suggestedWith: ['shadcn-footer-default', 'shadcn-header-default'],
    version: '1.0.0',
    acceptsChildren: false,
  },

  {
    id: 'shadcn-social-proof-banner',
    name: 'ShadcnSocialProofBanner',
    displayName: 'Social Proof Banner',
    source: 'shadcn',
    categories: ['content', 'section'],
    tags: ['social-proof', 'stats', 'metrics', 'banner', 'trust'],
    description: 'A social proof bar with icons and key metrics',
    previewImage: '',
    props: [
      { name: 'items', type: 'array', required: false, default: [{ value: '4.9/5', label: 'Average Rating', icon: 'star' }, { value: '50K+', label: 'Happy Users', icon: 'users' }, { value: '1M+', label: 'Downloads', icon: 'download' }, { value: '#1', label: 'Product of the Year', icon: 'award' }], description: 'Social proof items', group: 'content' },
    ],
    dependencies: ['lucide-react'],
    modulePath: 'shadcn-social-proof-banner',
    level: 'section',
    code: '<ShadcnSocialProofBanner />',
    suggestedWith: ['shadcn-hero-centered', 'shadcn-logo-cloud'],
    version: '1.0.0',
    acceptsChildren: false,
  },
]
