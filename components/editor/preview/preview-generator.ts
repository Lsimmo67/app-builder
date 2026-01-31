import { ComponentInstance } from '@/types/component'
import { componentRegistry } from '@/lib/components-registry'
import { DesignSystem } from '@/types/project'

// ============================================
// Renderer type and registry
// ============================================

type ComponentRenderer = (props: Record<string, unknown>) => string

const previewRenderers = new Map<string, ComponentRenderer>()

// ============================================
// SHADCN UI RENDERERS (10)
// ============================================

previewRenderers.set('shadcn-button', (props) => {
  const variant = (props.variant as string) || 'default'
  const size = (props.size as string) || 'default'
  const variantClasses: Record<string, string> = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  }
  const sizeClasses: Record<string, string> = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  }
  return `
    <div class="p-4 flex justify-center">
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.default}">
        ${props.children || props.label || 'Button'}
      </button>
    </div>`
})

previewRenderers.set('shadcn-card', (props) => {
  return `
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 max-w-md mx-auto my-4">
      ${props.title ? `<h3 class="text-2xl font-semibold leading-none tracking-tight mb-2">${props.title}</h3>` : ''}
      ${props.description ? `<p class="text-sm text-muted-foreground">${props.description}</p>` : ''}
      ${props.children ? `<div class="mt-4">${props.children}</div>` : ''}
    </div>`
})

previewRenderers.set('shadcn-input', (props) => {
  return `
    <div class="p-4 max-w-sm mx-auto">
      <input type="${props.type || 'text'}" placeholder="${props.placeholder || 'Enter text...'}" ${props.disabled ? 'disabled' : ''}
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
    </div>`
})

previewRenderers.set('shadcn-label', (props) => {
  return `
    <div class="p-4 max-w-sm mx-auto">
      <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        ${props.children || 'Label'}
      </label>
    </div>`
})

previewRenderers.set('shadcn-dialog', (props) => {
  return `
    <div class="p-8 flex justify-center">
      <div class="w-full max-w-lg rounded-lg border bg-card shadow-lg p-6">
        <div class="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
          <h2 class="text-lg font-semibold leading-none tracking-tight">${props.title || 'Dialog Title'}</h2>
          ${props.description ? `<p class="text-sm text-muted-foreground">${props.description}</p>` : ''}
        </div>
        <div class="py-4 text-sm">${props.children || 'Dialog content goes here...'}</div>
        <div class="flex justify-end gap-2 mt-4">
          <button class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent h-10 px-4 py-2">Cancel</button>
          <button class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Confirm</button>
        </div>
      </div>
    </div>`
})

previewRenderers.set('shadcn-tabs', (props) => {
  const tabs = (props.tabs as string[]) || ['Tab 1', 'Tab 2', 'Tab 3']
  const defaultVal = (props.defaultValue as string) || tabs[0]
  return `
    <div class="p-4 max-w-lg mx-auto">
      <div class="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full">
        ${tabs.map((tab: string, i: number) => `
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all flex-1 ${i === 0 ? 'bg-background text-foreground shadow-sm' : ''}">
            ${tab}
          </button>
        `).join('')}
      </div>
      <div class="mt-4 p-4 border rounded-lg">
        <p class="text-sm text-muted-foreground">Content for ${defaultVal}</p>
      </div>
    </div>`
})

previewRenderers.set('shadcn-accordion', (props) => {
  const items = (props.items as string[]) || ['How does this work?', 'Is it accessible?', 'Can I customize it?']
  return `
    <div class="p-4 max-w-lg mx-auto">
      ${items.map((item: string, i: number) => `
        <details class="border-b" ${i === 0 ? 'open' : ''}>
          <summary class="flex cursor-pointer items-center justify-between py-4 font-medium transition-all hover:underline text-sm">
            ${item}
            <svg class="h-4 w-4 shrink-0 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </summary>
          <div class="pb-4 pt-0 text-sm text-muted-foreground">
            Answer for "${item}". Customize this content through the properties panel.
          </div>
        </details>
      `).join('')}
    </div>`
})

previewRenderers.set('shadcn-avatar', (props) => {
  const fallback = (props.fallback as string) || 'AB'
  return `
    <div class="p-4 flex justify-center">
      <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
        ${props.src
    ? `<img class="aspect-square h-full w-full" src="${props.src}" alt="${props.alt || 'Avatar'}" />`
    : `<span class="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium">${fallback}</span>`
  }
      </span>
    </div>`
})

previewRenderers.set('shadcn-badge', (props) => {
  const variant = (props.variant as string) || 'default'
  const variantClasses: Record<string, string> = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'border border-input text-foreground',
  }
  return `
    <div class="p-4 flex justify-center">
      <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantClasses[variant] || variantClasses.default}">
        ${props.children || 'Badge'}
      </div>
    </div>`
})

previewRenderers.set('shadcn-separator', (props) => {
  const orientation = (props.orientation as string) || 'horizontal'
  if (orientation === 'vertical') {
    return `<div class="p-4 flex justify-center"><div class="shrink-0 bg-border w-[1px] h-16"></div></div>`
  }
  return `<div class="p-4"><div class="shrink-0 bg-border h-[1px] w-full"></div></div>`
})

// ============================================
// ACETERNITY UI RENDERERS (12)
// ============================================

previewRenderers.set('aceternity-hero-parallax', (props) => {
  return `
    <section class="relative h-[500px] overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),transparent)]"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center z-10 px-4">
          <h1 class="text-5xl font-bold mb-4 text-white bg-clip-text">${props.title || 'Parallax Hero'}</h1>
          <p class="text-xl text-slate-300">${props.subtitle || 'Scroll to see the parallax effect'}</p>
        </div>
      </div>
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0); background-size: 40px 40px;"></div>
    </section>`
})

previewRenderers.set('aceternity-bento-grid', (props) => {
  return `
    <section class="py-16 px-6 bg-background">
      <div class="mx-auto max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[18rem]">
          <div class="col-span-2 row-span-2 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/5 border p-8 flex flex-col justify-end">
            <h3 class="text-2xl font-bold mb-2">${props.title || 'Featured Item'}</h3>
            <p class="text-muted-foreground">${props.description || 'Main feature description'}</p>
          </div>
          <div class="rounded-xl bg-card border p-6 flex flex-col justify-end">
            <h4 class="font-semibold mb-1">Feature 1</h4>
            <p class="text-sm text-muted-foreground">Description of feature one</p>
          </div>
          <div class="rounded-xl bg-card border p-6 flex flex-col justify-end">
            <h4 class="font-semibold mb-1">Feature 2</h4>
            <p class="text-sm text-muted-foreground">Description of feature two</p>
          </div>
        </div>
      </div>
    </section>`
})

previewRenderers.set('aceternity-spotlight', (props) => {
  const fill = (props.fill as string) || 'white'
  return `
    <section class="relative h-[400px] overflow-hidden bg-slate-950 flex items-center justify-center">
      <div class="absolute inset-0" style="background: radial-gradient(600px circle at 50% 50%, ${fill}15, transparent 40%);"></div>
      <div class="relative z-10 text-center">
        <h2 class="text-4xl font-bold text-white mb-4">Spotlight Effect</h2>
        <p class="text-slate-400 max-w-md mx-auto">A beautiful spotlight effect that follows cursor movement with a radial gradient glow.</p>
      </div>
    </section>`
})

previewRenderers.set('aceternity-text-generate', (props) => {
  const words = (props.words as string) || 'The quick brown fox jumps over the lazy dog'
  return `
    <section class="py-16 px-6 bg-slate-950 flex items-center justify-center min-h-[300px]">
      <div class="max-w-2xl mx-auto text-center">
        <p class="text-2xl font-bold leading-relaxed">
          ${words.split(' ').map((word: string, i: number) =>
    `<span class="text-white" style="opacity: ${Math.min(1, 0.2 + i * 0.1)};">${word} </span>`
  ).join('')}
        </p>
      </div>
    </section>`
})

previewRenderers.set('aceternity-sparkles', (props) => {
  const color = (props.particleColor as string) || '#FFFFFF'
  return `
    <section class="relative h-[300px] bg-slate-950 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0" style="background-image: radial-gradient(${color} 1px, transparent 1px), radial-gradient(${color} 1px, transparent 1px); background-size: 50px 50px, 30px 30px; background-position: 0 0, 25px 25px; opacity: 0.3;"></div>
      <div class="relative z-10 text-center">
        <h2 class="text-3xl font-bold text-white">Sparkles Effect</h2>
        <p class="text-slate-400 mt-2">Animated particles floating across the background</p>
      </div>
    </section>`
})

previewRenderers.set('aceternity-3d-card', (props) => {
  return `
    <div class="p-8 flex justify-center">
      <div class="rounded-xl border bg-card shadow-xl p-8 max-w-sm transition-all" style="transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);">
        <h3 class="text-xl font-bold mb-2">3D Card Effect</h3>
        <p class="text-muted-foreground text-sm">Hover to see the 3D tilt effect. The card transforms based on mouse position.</p>
        <div class="mt-4 h-32 rounded-lg bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
          <span class="text-sm text-muted-foreground">${props.children || 'Card content'}</span>
        </div>
      </div>
    </div>`
})

previewRenderers.set('aceternity-infinite-cards', (props) => {
  const items = (props.items as string[]) || ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5']
  const direction = (props.direction as string) || 'left'
  return `
    <section class="py-12 overflow-hidden bg-background">
      <style>@keyframes marquee-${direction}{from{transform:translateX(0)}to{transform:translateX(-50%)}}</style>
      <div class="flex gap-4" style="animation: marquee-${direction} 20s linear infinite; width: max-content;">
        ${[...items, ...items].map((item: string) => `
          <div class="flex-shrink-0 w-64 rounded-xl border bg-card p-6">
            <p class="text-sm font-medium">"${item}"</p>
            <p class="text-xs text-muted-foreground mt-2">-- Author</p>
          </div>
        `).join('')}
      </div>
    </section>`
})

previewRenderers.set('aceternity-lamp', (props) => {
  return `
    <section class="relative h-[400px] bg-slate-950 flex items-center justify-center overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]" style="background: conic-gradient(from 270deg at 50% 0%, transparent 0deg, rgba(120,119,198,0.4) 90deg, transparent 180deg); filter: blur(40px);"></div>
      <div class="relative z-10 text-center mt-16">
        <h2 class="text-4xl font-bold text-white">${props.children || 'Lamp Effect'}</h2>
        <p class="text-slate-400 mt-4">A beautiful lamp glow illuminating from above</p>
      </div>
    </section>`
})

previewRenderers.set('aceternity-wavy-bg', (props) => {
  return `
    <section class="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-slate-950">
      <svg class="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none" style="height: 200px;">
        <path fill="rgba(99,102,241,0.2)" d="M0,192L48,186.7C96,181,192,171,288,181.3C384,192,480,224,576,218.7C672,213,768,171,864,165.3C960,160,1056,192,1152,208C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
        <path fill="rgba(139,92,246,0.15)" d="M0,256L48,234.7C96,213,192,171,288,160C384,149,480,171,576,186.7C672,203,768,213,864,202.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L0,320Z"/>
      </svg>
      <div class="relative z-10 text-center px-4">
        <h2 class="text-4xl font-bold text-white">${props.children || 'Wavy Background'}</h2>
        <p class="text-slate-400 mt-2">Animated wavy background effect</p>
      </div>
    </section>`
})

previewRenderers.set('aceternity-floating-navbar', (props) => {
  const navItems = (props.navItems as string[]) || ['Home', 'About', 'Projects', 'Contact']
  return `
    <div class="py-4 flex justify-center">
      <nav class="flex items-center gap-6 rounded-full border bg-card/80 px-6 py-3 shadow-lg backdrop-blur-sm">
        ${navItems.map((item: string, i: number) => `
          <a href="#" class="text-sm ${i === 0 ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'} transition-colors">${item}</a>
        `).join('')}
      </nav>
    </div>`
})

previewRenderers.set('aceternity-tracing-beam', (props) => {
  return `
    <section class="py-12 px-6">
      <div class="max-w-2xl mx-auto relative pl-8">
        <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500 via-violet-500/50 to-transparent"></div>
        <div class="absolute left-[-3px] top-0 w-2 h-2 rounded-full bg-violet-500"></div>
        <div class="space-y-8">
          <div><h3 class="text-lg font-semibold mb-2">Step 1</h3><p class="text-muted-foreground text-sm">${props.children || 'Content with tracing beam animation.'}</p></div>
          <div><h3 class="text-lg font-semibold mb-2">Step 2</h3><p class="text-muted-foreground text-sm">The beam traces your scroll progress.</p></div>
          <div><h3 class="text-lg font-semibold mb-2">Step 3</h3><p class="text-muted-foreground text-sm">Creates a visual timeline effect.</p></div>
        </div>
      </div>
    </section>`
})

// ============================================
// OSMO SUPPLY RENDERERS (11)
// ============================================

previewRenderers.set('osmo-hero-centered', (props) => {
  return `
    <section class="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
      <div class="mx-auto max-w-4xl text-center">
        <h1 class="text-4xl font-bold tracking-tight sm:text-6xl mb-6">${props.headline || 'Welcome to Our Platform'}</h1>
        <p class="text-lg leading-8 text-muted-foreground mb-10">${props.subheadline || 'Build something amazing with our tools and resources.'}</p>
        <div class="flex items-center justify-center gap-4">
          <a href="#" class="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90">${props.primaryCTA || 'Get Started'}</a>
          ${props.secondaryCTA ? `<a href="#" class="text-sm font-semibold text-foreground hover:text-primary">${props.secondaryCTA} &rarr;</a>` : ''}
        </div>
      </div>
    </section>`
})

previewRenderers.set('osmo-hero-split', (props) => {
  const imgPos = (props.imagePosition as string) || 'right'
  return `
    <section class="py-16 px-6 lg:px-8">
      <div class="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="${imgPos === 'left' ? 'lg:order-2' : ''}">
          <h1 class="text-4xl font-bold tracking-tight mb-6">${props.headline || 'Build Faster'}</h1>
          <p class="text-lg text-muted-foreground mb-8">${props.description || 'Create stunning websites with our component library.'}</p>
          <button class="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Get Started</button>
        </div>
        <div class="rounded-xl bg-muted h-80 flex items-center justify-center overflow-hidden ${imgPos === 'left' ? 'lg:order-1' : ''}">
          ${props.image ? `<img src="${props.image}" alt="Hero" class="w-full h-full object-cover" />` : '<span class="text-muted-foreground">Hero Image</span>'}
        </div>
      </div>
    </section>`
})

previewRenderers.set('osmo-features-grid', (props) => {
  const features = (props.features as string[]) || ['Speed', 'Security', 'Scalability']
  const columns = (props.columns as string) || '3'
  return `
    <section class="py-20 px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">${props.headline || 'Features'}</h2>
          <p class="text-muted-foreground">${props.subheadline || 'Everything you need to succeed'}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-8">
          ${features.slice(0, 6).map((f: string, i: number) => `
            <div class="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4"><span class="text-primary text-lg font-bold">${i + 1}</span></div>
              <h3 class="font-semibold mb-2">${f}</h3>
              <p class="text-sm text-muted-foreground">Description for ${f.toLowerCase()} feature.</p>
            </div>`).join('')}
        </div>
      </div>
    </section>`
})

previewRenderers.set('osmo-features-alternating', (props) => {
  const features = (props.features as string[]) || ['Feature One', 'Feature Two', 'Feature Three']
  return `
    <section class="py-20 px-6 lg:px-8">
      <div class="mx-auto max-w-6xl space-y-20">
        ${features.slice(0, 3).map((f: string, i: number) => `
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="${i % 2 === 1 ? 'lg:order-2' : ''}"><h3 class="text-2xl font-bold mb-4">${f}</h3><p class="text-muted-foreground">Detailed description of ${f.toLowerCase()}.</p></div>
            <div class="rounded-xl bg-muted h-64 flex items-center justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}"><span class="text-muted-foreground">Image ${i + 1}</span></div>
          </div>`).join('')}
      </div>
    </section>`
})

previewRenderers.set('osmo-testimonials', (props) => {
  const testimonials = (props.testimonials as string[]) || ['Great product!', 'Love using it.', 'Highly recommended.']
  return `
    <section class="py-20 px-6 lg:px-8 bg-muted/30">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-3xl font-bold text-center mb-12">${props.headline || 'What our customers say'}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${testimonials.slice(0, 3).map((t: string, i: number) => `
            <div class="rounded-lg border bg-card p-6">
              <svg class="h-8 w-8 text-muted-foreground/30 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              <p class="text-sm mb-4">"${t}"</p>
              <div class="flex items-center gap-3">
                <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">U${i + 1}</div>
                <div><p class="text-sm font-medium">User ${i + 1}</p><p class="text-xs text-muted-foreground">Customer</p></div>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </section>`
})

previewRenderers.set('osmo-pricing', (props) => {
  const plans = (props.plans as string[]) || ['Starter', 'Pro', 'Enterprise']
  return `
    <section class="py-20 px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-3xl font-bold text-center mb-4">${props.headline || 'Simple, transparent pricing'}</h2>
        <p class="text-center text-muted-foreground mb-12">Choose the plan that works for you</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${plans.slice(0, 3).map((plan: string, i: number) => `
            <div class="rounded-lg border ${i === 1 ? 'border-primary shadow-lg ring-2 ring-primary' : ''} bg-card p-8 flex flex-col">
              <h3 class="text-lg font-semibold mb-2">${plan}</h3>
              <div class="text-3xl font-bold mb-4">$${i === 0 ? '9' : i === 1 ? '29' : '99'}<span class="text-sm font-normal text-muted-foreground">/mo</span></div>
              <ul class="space-y-2 mb-8 flex-1 text-sm">
                <li class="flex items-center gap-2"><span class="text-primary">&#10003;</span> Feature 1</li>
                <li class="flex items-center gap-2"><span class="text-primary">&#10003;</span> Feature 2</li>
                <li class="flex items-center gap-2"><span class="text-primary">&#10003;</span> Feature 3</li>
              </ul>
              <button class="w-full rounded-md ${i === 1 ? 'bg-primary text-primary-foreground' : 'border border-input bg-background'} px-4 py-2 text-sm font-medium">Get started</button>
            </div>`).join('')}
        </div>
      </div>
    </section>`
})

previewRenderers.set('osmo-cta-centered', (props) => {
  return `
    <section class="py-20 px-6 lg:px-8 bg-primary text-primary-foreground">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-3xl font-bold mb-4">${props.headline || 'Ready to get started?'}</h2>
        <p class="text-lg opacity-90 mb-8">${props.description || 'Join thousands of satisfied customers today.'}</p>
        <a href="#" class="inline-block rounded-md bg-background text-foreground px-6 py-3 text-sm font-semibold shadow-sm hover:opacity-90">${props.buttonText || 'Start Free Trial'}</a>
      </div>
    </section>`
})

previewRenderers.set('osmo-faq', (props) => {
  const faqs = (props.faqs as string[]) || ['How does it work?', 'Is there a free trial?', 'Can I cancel anytime?']
  return `
    <section class="py-20 px-6 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-3xl font-bold text-center mb-12">${props.headline || 'Frequently Asked Questions'}</h2>
        ${faqs.slice(0, 6).map((faq: string, i: number) => `
          <details class="border-b group" ${i === 0 ? 'open' : ''}>
            <summary class="flex cursor-pointer items-center justify-between py-4 font-medium text-sm">${faq}
              <svg class="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </summary>
            <div class="pb-4 text-sm text-muted-foreground">This is the answer for "${faq}".</div>
          </details>`).join('')}
      </div>
    </section>`
})

previewRenderers.set('osmo-footer', (props) => {
  const links = (props.links as string[]) || ['Privacy', 'Terms', 'Contact']
  return `
    <footer class="py-12 px-6 lg:px-8 border-t">
      <div class="mx-auto max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div><span class="font-bold text-lg">${props.logo || 'Brand'}</span><p class="text-sm text-muted-foreground mt-2">Building amazing products for the web.</p></div>
          <div><h4 class="font-semibold text-sm mb-3">Links</h4>${links.map((l: string) => `<a href="#" class="block text-sm text-muted-foreground hover:text-foreground py-1">${l}</a>`).join('')}</div>
          <div><h4 class="font-semibold text-sm mb-3">Resources</h4><a href="#" class="block text-sm text-muted-foreground hover:text-foreground py-1">Documentation</a><a href="#" class="block text-sm text-muted-foreground hover:text-foreground py-1">Blog</a></div>
          ${(props.showNewsletter !== false) ? `<div><h4 class="font-semibold text-sm mb-3">Newsletter</h4><div class="flex gap-2"><input placeholder="Email" class="flex-1 h-9 rounded-md border bg-background px-3 text-sm" /><button class="h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm">Join</button></div></div>` : ''}
        </div>
        <div class="border-t pt-6 text-center text-sm text-muted-foreground">&copy; 2024 ${props.logo || 'Company'}. All rights reserved.</div>
      </div>
    </footer>`
})

previewRenderers.set('osmo-navbar', (props) => {
  const links = (props.links as string[]) || ['Features', 'Pricing', 'About']
  return `
    <header class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="mx-auto max-w-6xl flex h-16 items-center justify-between px-6">
        <span class="font-bold text-lg">${props.logo || 'Brand'}</span>
        <nav class="flex items-center gap-6">
          ${links.map((l: string) => `<a href="#" class="text-sm text-muted-foreground hover:text-foreground transition-colors">${l}</a>`).join('')}
          ${props.ctaText ? `<button class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">${props.ctaText}</button>` : ''}
        </nav>
      </div>
    </header>`
})

// ============================================
// SKIPER UI RENDERERS (9)
// ============================================

previewRenderers.set('skiper-glass-card', (props) => {
  return `
    <div class="p-8 flex justify-center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="rounded-xl p-6 max-w-sm" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.2);">
        <h3 class="text-xl font-bold text-white mb-2">Glass Card</h3>
        <p class="text-white/70 text-sm">${props.children || 'A beautiful glass morphism card with backdrop blur and transparency.'}</p>
      </div>
    </div>`
})

previewRenderers.set('skiper-gradient-button', (props) => {
  const variant = (props.variant as string) || 'primary'
  const gradients: Record<string, string> = { primary: 'from-violet-600 to-indigo-600', secondary: 'from-pink-500 to-rose-500', success: 'from-emerald-500 to-teal-500' }
  return `
    <div class="p-8 flex justify-center">
      <button class="rounded-full bg-gradient-to-r ${gradients[variant] || gradients.primary} px-8 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-shadow">${props.children || 'Gradient Button'}</button>
    </div>`
})

previewRenderers.set('skiper-glow-card', (props) => {
  const glowColor = (props.glowColor as string) || '#8B5CF6'
  return `
    <div class="p-8 flex justify-center bg-slate-950">
      <div class="rounded-xl border border-white/10 bg-slate-900 p-6 max-w-sm relative" style="box-shadow: 0 0 40px ${glowColor}30, 0 0 80px ${glowColor}15;">
        <h3 class="text-xl font-bold text-white mb-2">Glow Card</h3>
        <p class="text-slate-400 text-sm">${props.children || 'A card with a beautiful glow effect.'}</p>
      </div>
    </div>`
})

previewRenderers.set('skiper-animated-border', (props) => {
  return `
    <div class="p-8 flex justify-center bg-slate-950">
      <div class="relative rounded-xl p-[2px]" style="background: conic-gradient(from 0deg, #8B5CF6, #EC4899, #EF4444, #F59E0B, #22C55E, #3B82F6, #8B5CF6);">
        <div class="rounded-xl bg-slate-950 p-6">
          <h3 class="text-xl font-bold text-white mb-2">Animated Border</h3>
          <p class="text-slate-400 text-sm">${props.children || 'A card with an animated gradient border.'}</p>
        </div>
      </div>
    </div>`
})

previewRenderers.set('skiper-hero-gradient', (props) => {
  return `
    <section class="relative min-h-[500px] flex items-center justify-center overflow-hidden" style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);">
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30" style="background: radial-gradient(circle, #8B5CF6 0%, transparent 70%); filter: blur(60px);"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20" style="background: radial-gradient(circle, #EC4899 0%, transparent 70%); filter: blur(60px);"></div>
      </div>
      <div class="relative z-10 text-center px-6">
        <h1 class="text-5xl font-bold text-white mb-6">${props.headline || 'Build Something Amazing'}</h1>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto">${props.subheadline || 'Create stunning web experiences with our modern design system.'}</p>
      </div>
    </section>`
})

previewRenderers.set('skiper-floating-card', (props) => {
  return `
    <div class="p-8 flex justify-center">
      <div class="rounded-xl border bg-card p-6 max-w-sm shadow-2xl" style="transform: translateY(-4px);">
        <h3 class="text-xl font-bold mb-2">Floating Card</h3>
        <p class="text-muted-foreground text-sm">${props.children || 'A card that gently floats above the surface.'}</p>
      </div>
    </div>`
})

previewRenderers.set('skiper-text-gradient', (props) => {
  const from = (props.from as string) || '#8B5CF6'
  const to = (props.to as string) || '#EC4899'
  return `
    <div class="p-8 flex justify-center">
      <h2 class="text-5xl font-bold" style="background: linear-gradient(135deg, ${from}, ${to}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        ${props.children || 'Gradient Text'}
      </h2>
    </div>`
})

previewRenderers.set('skiper-shimmer-button', (props) => {
  return `
    <div class="p-8 flex justify-center">
      <style>@keyframes shimmer-btn{0%{background-position:-200% 0}100%{background-position:200% 0}}</style>
      <button class="relative rounded-full px-8 py-3 text-sm font-semibold text-white overflow-hidden" style="background: linear-gradient(90deg, #8B5CF6 0%, #A78BFA 25%, #C4B5FD 50%, #A78BFA 75%, #8B5CF6 100%); background-size: 200% 100%; animation: shimmer-btn 3s linear infinite;">
        ${props.children || 'Shimmer Button'}
      </button>
    </div>`
})

previewRenderers.set('skiper-noise-card', (props) => {
  return `
    <div class="p-8 flex justify-center">
      <div class="rounded-xl p-6 max-w-sm relative overflow-hidden" style="background: linear-gradient(135deg, #1e1b4b, #312e81);">
        <div class="relative z-10">
          <h3 class="text-xl font-bold text-white mb-2">Noise Texture</h3>
          <p class="text-indigo-200/70 text-sm">${props.children || 'A card with a subtle noise texture overlay.'}</p>
        </div>
      </div>
    </div>`
})

// ============================================
// GSAP EFFECTS RENDERERS (9)
// ============================================

previewRenderers.set('gsap-scroll-reveal', (props) => {
  const animation = (props.animation as string) || 'fadeUp'
  return `
    <section class="py-16 px-6">
      <div class="mx-auto max-w-4xl text-center animate-fade-in">
        <span class="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium mb-4">GSAP: Scroll Reveal</span>
        <h2 class="text-3xl font-bold mb-4">Scroll Reveal (${animation})</h2>
        <p class="text-muted-foreground">${props.children || 'This content animates into view when scrolled into the viewport.'}</p>
      </div>
    </section>`
})

previewRenderers.set('gsap-text-split', (props) => {
  const text = (props.text as string) || 'Animated Text'
  const splitBy = (props.splitBy as string) || 'chars'
  return `
    <section class="py-16 px-6 bg-slate-950">
      <div class="mx-auto max-w-4xl text-center">
        <span class="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium mb-4">GSAP: Text Split (${splitBy})</span>
        <h2 class="text-5xl font-bold">
          ${splitBy === 'chars'
    ? text.split('').map((c: string, i: number) => `<span class="inline-block text-white" style="opacity: ${Math.min(1, 0.3 + i * 0.05)};">${c === ' ' ? '&nbsp;' : c}</span>`).join('')
    : text.split(' ').map((w: string, i: number) => `<span class="inline-block text-white mr-3" style="opacity: ${Math.min(1, 0.3 + i * 0.15)};">${w}</span>`).join('')}
        </h2>
      </div>
    </section>`
})

previewRenderers.set('gsap-parallax', (props) => {
  return `
    <section class="relative py-20 px-6 overflow-hidden min-h-[400px]">
      <div class="absolute inset-0 bg-gradient-to-b from-muted/50 to-background"></div>
      <div class="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/10"></div>
      <div class="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-accent/10"></div>
      <div class="relative z-10 mx-auto max-w-4xl text-center">
        <span class="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium mb-4">GSAP: Parallax (speed: ${props.speed || 0.5})</span>
        <h2 class="text-3xl font-bold mb-4">Parallax Scroll</h2>
        <p class="text-muted-foreground">${props.children || 'Background elements move at different speeds.'}</p>
      </div>
    </section>`
})

previewRenderers.set('gsap-horizontal-scroll', (props) => {
  return `
    <section class="py-16 overflow-hidden">
      <div class="px-6 mb-8">
        <span class="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium mb-2">GSAP: Horizontal Scroll</span>
        <h2 class="text-2xl font-bold">Horizontal Scroll Section</h2>
      </div>
      <div class="flex gap-6 px-6" style="overflow-x: auto;">
        ${[1, 2, 3, 4, 5].map((i) => `<div class="flex-shrink-0 w-80 h-48 rounded-xl border bg-card p-6 flex flex-col justify-end"><h3 class="font-semibold">Panel ${i}</h3><p class="text-sm text-muted-foreground mt-1">Scroll horizontally</p></div>`).join('')}
      </div>
    </section>`
})

previewRenderers.set('gsap-magnetic-button', (props) => {
  return `
    <div class="p-12 flex flex-col items-center justify-center bg-slate-950">
      <span class="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium mb-6">GSAP: Magnetic Button</span>
      <button class="relative rounded-full bg-white text-slate-950 px-10 py-4 text-lg font-semibold transition-transform hover:scale-105" style="box-shadow: 0 0 30px rgba(255,255,255,0.1);">${props.children || 'Hover Me'}</button>
    </div>`
})

previewRenderers.set('gsap-morph-svg', (props) => {
  return `
    <div class="p-12 flex flex-col items-center justify-center bg-slate-950">
      <span class="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium mb-4">GSAP: SVG Morph</span>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <path d="${(props.fromPath as string) || 'M100,10 C150,10 190,50 190,100 C190,150 150,190 100,190 C50,190 10,150 10,100 C10,50 50,10 100,10'}" fill="rgba(139,92,246,0.3)" stroke="#8B5CF6" stroke-width="2"/>
      </svg>
      <p class="text-slate-400 text-sm mt-4">SVG path morphing animation</p>
    </div>`
})

previewRenderers.set('gsap-pin-section', (props) => {
  return `
    <section class="py-16 px-6">
      <div class="mx-auto max-w-4xl text-center">
        <span class="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium mb-4">GSAP: Pin Section</span>
        <h2 class="text-3xl font-bold mb-4">Pinned Section</h2>
        <p class="text-muted-foreground mb-8">${props.children || 'This section stays pinned while content scrolls.'}</p>
        <div class="grid grid-cols-3 gap-4">
          ${[1, 2, 3].map((i) => `<div class="rounded-lg border bg-card p-4"><h4 class="font-medium text-sm">Item ${i}</h4><p class="text-xs text-muted-foreground mt-1">Pinned content</p></div>`).join('')}
        </div>
      </div>
    </section>`
})

previewRenderers.set('gsap-flip-animation', (props) => {
  return `
    <section class="py-16 px-6">
      <div class="mx-auto max-w-4xl">
        <span class="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium mb-4">GSAP: FLIP Animation</span>
        <h2 class="text-2xl font-bold mb-6">FLIP Layout Animation</h2>
        <div class="grid grid-cols-4 gap-4">
          ${[1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<div class="aspect-square rounded-lg flex items-center justify-center text-white font-bold text-lg" style="background: hsl(${i * 45}, 70%, 50%);">${i}</div>`).join('')}
        </div>
        <p class="text-sm text-muted-foreground mt-4">${props.children || 'Click items to rearrange with smooth FLIP animations'}</p>
      </div>
    </section>`
})

// ============================================
// GENERIC FALLBACK RENDERER
// ============================================

function generateGenericComponentHtml(displayName: string, props: Record<string, unknown>): string {
  return `
    <div class="preview-placeholder my-4 mx-auto max-w-4xl">
      <div class="text-sm font-medium mb-2">${displayName}</div>
      <div class="text-xs text-muted-foreground">
        ${Object.keys(props).length > 0
    ? `Props: ${Object.keys(props).join(', ')}`
    : 'No props configured'}
      </div>
    </div>`
}

// ============================================
// MAIN PREVIEW GENERATION
// ============================================

/**
 * Generate a complete HTML document for preview
 */
export function generatePreviewHtml(
  components: ComponentInstance[],
  designSystem: DesignSystem | null,
  options: { darkMode?: boolean; width?: number } = {}
): string {
  const { darkMode = false } = options
  const cssVariables = generateCssVariables(designSystem, darkMode)

  const componentsHtml = components
    .filter((c) => !c.isHidden)
    .sort((a, b) => a.order - b.order)
    .map((c) => generateComponentHtml(c))
    .join('\n')

  return `<!DOCTYPE html>
<html lang="en" class="${darkMode ? 'dark' : ''}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
            secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
            destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
            muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
            accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
            card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
          },
          borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
        },
      },
    }
  <\/script>
  <style>
    ${cssVariables}
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: hsl(var(--background)); color: hsl(var(--foreground)); min-height: 100vh; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
    .preview-placeholder { border: 2px dashed hsl(var(--border)); border-radius: var(--radius); padding: 2rem; text-align: center; background: hsl(var(--muted)); }
  </style>
</head>
<body>
  <main>
    ${componentsHtml || '<div class="flex items-center justify-center min-h-screen"><div class="text-center text-muted-foreground"><p class="text-lg">No components to preview</p><p class="text-sm">Add components to see them here</p></div></div>'}
  </main>
  <script>
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animate-fade-in'); }); }, { threshold: 0.1 });
    document.querySelectorAll('section').forEach(el => observer.observe(el));
    document.addEventListener('click', (e) => { if (e.target.tagName === 'A') e.preventDefault(); });
  <\/script>
</body>
</html>`
}

/**
 * Generate HTML for a single component (used by canvas inline preview)
 */
export function generateSingleComponentHtml(component: ComponentInstance): string {
  return generateComponentHtml(component)
}

/**
 * Generate HTML for a single component using the renderer registry
 */
function generateComponentHtml(component: ComponentInstance): string {
  const registry = componentRegistry.getById(component.componentRegistryId)
  if (!registry) {
    return `<!-- Unknown component: ${component.componentRegistryId} -->`
  }

  const renderer = previewRenderers.get(registry.id)
  if (renderer) {
    return renderer(component.props)
  }

  return generateGenericComponentHtml(registry.displayName, component.props)
}

/**
 * Generate CSS variables from design system
 */
function generateCssVariables(designSystem: DesignSystem | null, darkMode: boolean): string {
  const defaultVars = `
    :root {
      --background: 0 0% 100%; --foreground: 222.2 84% 4.9%;
      --card: 0 0% 100%; --card-foreground: 222.2 84% 4.9%;
      --popover: 0 0% 100%; --popover-foreground: 222.2 84% 4.9%;
      --primary: 222.2 47.4% 11.2%; --primary-foreground: 210 40% 98%;
      --secondary: 210 40% 96%; --secondary-foreground: 222.2 47.4% 11.2%;
      --muted: 210 40% 96%; --muted-foreground: 215.4 16.3% 46.9%;
      --accent: 210 40% 96%; --accent-foreground: 222.2 47.4% 11.2%;
      --destructive: 0 84.2% 60.2%; --destructive-foreground: 210 40% 98%;
      --border: 214.3 31.8% 91.4%; --input: 214.3 31.8% 91.4%;
      --ring: 222.2 84% 4.9%; --radius: 0.5rem;
    }
    .dark {
      --background: 222.2 84% 4.9%; --foreground: 210 40% 98%;
      --card: 222.2 84% 4.9%; --card-foreground: 210 40% 98%;
      --popover: 222.2 84% 4.9%; --popover-foreground: 210 40% 98%;
      --primary: 210 40% 98%; --primary-foreground: 222.2 47.4% 11.2%;
      --secondary: 217.2 32.6% 17.5%; --secondary-foreground: 210 40% 98%;
      --muted: 217.2 32.6% 17.5%; --muted-foreground: 215 20.2% 65.1%;
      --accent: 217.2 32.6% 17.5%; --accent-foreground: 210 40% 98%;
      --destructive: 0 62.8% 30.6%; --destructive-foreground: 210 40% 98%;
      --border: 217.2 32.6% 17.5%; --input: 217.2 32.6% 17.5%;
      --ring: 212.7 26.8% 83.9%;
    }`

  if (!designSystem?.colors) return defaultVars

  const colors = designSystem.colors
  let customVars = ':root {\n'
  for (const [key, value] of Object.entries(colors)) {
    const hsl = hexToHsl(value as string)
    if (hsl) customVars += `  --${key}: ${hsl};\n`
  }
  if (designSystem.borderRadius) {
    const radius = designSystem.borderRadius as unknown as Record<string, string>
    customVars += `  --radius: ${radius.md || radius.default || '0.5rem'};\n`
  }
  customVars += '}\n'
  return defaultVars + customVars
}

function hexToHsl(hex: string): string | null {
  if (!hex || !hex.startsWith('#')) return null
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return null
  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}
