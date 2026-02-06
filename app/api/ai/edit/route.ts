import { NextRequest, NextResponse } from 'next/server'

export interface AIEditRequest {
  prompt: string
  componentName: string
  componentProps: Record<string, unknown>
  componentStyles?: Record<string, string>
  componentHtml?: string
}

export interface AIEditSuggestion {
  type: 'props' | 'styles' | 'html' | 'info'
  description: string
  changes: Record<string, unknown>
}

export interface AIEditResponse {
  suggestions: AIEditSuggestion[]
  message: string
}

// Map of common edit intents to property/style changes
const EDIT_PATTERNS: Array<{
  patterns: RegExp[]
  handler: (prompt: string, req: AIEditRequest) => AIEditSuggestion[]
}> = [
  {
    patterns: [/make.*bigger|increase.*size|larger|scale up/i],
    handler: (_prompt, req) => {
      const suggestions: AIEditSuggestion[] = []
      if (req.componentStyles?.fontSize) {
        const current = parseFloat(req.componentStyles.fontSize) || 16
        suggestions.push({
          type: 'styles',
          description: `Increase font size from ${current}px to ${Math.round(current * 1.25)}px`,
          changes: { fontSize: `${Math.round(current * 1.25)}px` },
        })
      } else {
        suggestions.push({
          type: 'styles',
          description: 'Increase the overall size',
          changes: { fontSize: '1.25em', transform: 'scale(1.1)' },
        })
      }
      return suggestions
    },
  },
  {
    patterns: [/make.*smaller|decrease.*size|reduce|shrink/i],
    handler: (_prompt, req) => {
      const suggestions: AIEditSuggestion[] = []
      if (req.componentStyles?.fontSize) {
        const current = parseFloat(req.componentStyles.fontSize) || 16
        suggestions.push({
          type: 'styles',
          description: `Decrease font size from ${current}px to ${Math.round(current * 0.8)}px`,
          changes: { fontSize: `${Math.round(current * 0.8)}px` },
        })
      } else {
        suggestions.push({
          type: 'styles',
          description: 'Decrease the overall size',
          changes: { fontSize: '0.85em' },
        })
      }
      return suggestions
    },
  },
  {
    patterns: [/center|align.*center|middle/i],
    handler: () => [{
      type: 'styles',
      description: 'Center the content',
      changes: { textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    }],
  },
  {
    patterns: [/bold|make.*bold|stronger/i],
    handler: () => [{
      type: 'styles',
      description: 'Make text bold',
      changes: { fontWeight: '700' },
    }],
  },
  {
    patterns: [/italic|italicize/i],
    handler: () => [{
      type: 'styles',
      description: 'Make text italic',
      changes: { fontStyle: 'italic' },
    }],
  },
  {
    patterns: [/add.*padding|more.*space|more.*padding/i],
    handler: () => [{
      type: 'styles',
      description: 'Add more padding',
      changes: { paddingTop: '2rem', paddingRight: '2rem', paddingBottom: '2rem', paddingLeft: '2rem' },
    }],
  },
  {
    patterns: [/remove.*padding|no.*padding|less.*space/i],
    handler: () => [{
      type: 'styles',
      description: 'Remove padding',
      changes: { paddingTop: '0', paddingRight: '0', paddingBottom: '0', paddingLeft: '0' },
    }],
  },
  {
    patterns: [/add.*margin|more.*margin/i],
    handler: () => [{
      type: 'styles',
      description: 'Add more margin',
      changes: { marginTop: '1.5rem', marginBottom: '1.5rem' },
    }],
  },
  {
    patterns: [/rounded|border.*radius|round.*corners/i],
    handler: () => [{
      type: 'styles',
      description: 'Add rounded corners',
      changes: { borderRadius: '12px' },
    }],
  },
  {
    patterns: [/shadow|add.*shadow|drop.*shadow/i],
    handler: () => [{
      type: 'styles',
      description: 'Add box shadow',
      changes: { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
    }],
  },
  {
    patterns: [/hide|make.*hidden|invisible/i],
    handler: () => [{
      type: 'styles',
      description: 'Hide the component',
      changes: { display: 'none' },
    }],
  },
  {
    patterns: [/full.*width|stretch|100%/i],
    handler: () => [{
      type: 'styles',
      description: 'Make full width',
      changes: { width: '100%' },
    }],
  },
  {
    patterns: [/flex.*row|horizontal|side.*by.*side/i],
    handler: () => [{
      type: 'styles',
      description: 'Arrange items horizontally',
      changes: { display: 'flex', flexDirection: 'row', gap: '1rem' },
    }],
  },
  {
    patterns: [/flex.*col|vertical|stack/i],
    handler: () => [{
      type: 'styles',
      description: 'Stack items vertically',
      changes: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    }],
  },
  {
    patterns: [/change.*text|update.*text|set.*text/i],
    handler: (prompt) => {
      const textMatch = prompt.match(/(?:to|=|:)\s*"([^"]+)"|(?:to|=|:)\s*['']([^'']+)['']/i)
      if (textMatch) {
        const newText = textMatch[1] || textMatch[2]
        return [{
          type: 'props',
          description: `Change text to "${newText}"`,
          changes: { text: newText },
        }]
      }
      return [{
        type: 'info',
        description: 'Specify the new text in quotes, e.g.: change text to "Hello World"',
        changes: {},
      }]
    },
  },
  {
    patterns: [/background.*color|bg.*color|change.*background/i],
    handler: (prompt) => {
      const colorMatch = prompt.match(/#[0-9a-fA-F]{3,8}|(?:to|=)\s*([\w]+)/i)
      if (colorMatch) {
        const color = colorMatch[0].startsWith('#') ? colorMatch[0] : colorMatch[1]
        return [{
          type: 'styles',
          description: `Set background color to ${color}`,
          changes: { backgroundColor: color },
        }]
      }
      return [{
        type: 'info',
        description: 'Specify a color, e.g.: background color #3b82f6',
        changes: {},
      }]
    },
  },
  {
    patterns: [/text.*color|font.*color|color/i],
    handler: (prompt) => {
      const colorMatch = prompt.match(/#[0-9a-fA-F]{3,8}/i)
      if (colorMatch) {
        return [{
          type: 'styles',
          description: `Set text color to ${colorMatch[0]}`,
          changes: { color: colorMatch[0] },
        }]
      }
      return [{
        type: 'info',
        description: 'Specify a hex color, e.g.: text color #ffffff',
        changes: {},
      }]
    },
  },
  {
    patterns: [/opacity|transparent|fade/i],
    handler: (prompt) => {
      const numMatch = prompt.match(/\d+%?/)
      const opacity = numMatch ? (parseFloat(numMatch[0]) > 1 ? parseFloat(numMatch[0]) / 100 : parseFloat(numMatch[0])) : 0.7
      return [{
        type: 'styles',
        description: `Set opacity to ${opacity}`,
        changes: { opacity: String(opacity) },
      }]
    },
  },
]

export async function POST(request: NextRequest) {
  try {
    const body: AIEditRequest = await request.json()

    if (!body.prompt || !body.componentName) {
      return NextResponse.json(
        { error: 'Missing required fields: prompt, componentName' },
        { status: 400 }
      )
    }

    // Try pattern matching first
    for (const pattern of EDIT_PATTERNS) {
      for (const regex of pattern.patterns) {
        if (regex.test(body.prompt)) {
          const suggestions = pattern.handler(body.prompt, body)
          return NextResponse.json({
            suggestions,
            message: `Found ${suggestions.length} suggestion(s) for "${body.componentName}"`,
          } satisfies AIEditResponse)
        }
      }
    }

    // No pattern matched — return helpful guidance
    return NextResponse.json({
      suggestions: [{
        type: 'info',
        description: `I understood your request for "${body.componentName}", but I need a more specific instruction. Try things like: "make it bigger", "add padding", "center the text", "add a shadow", "change background color #3b82f6", etc.`,
        changes: {},
      }],
      message: 'No matching edit pattern found. Try a more specific instruction.',
    } satisfies AIEditResponse)
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
