import {
  Layout,
  Type,
  Image,
  Grid3X3,
  CreditCard,
  Star,
  Navigation,
  MessageSquare,
  BarChart3,
  FileText,
  Box,
  MousePointerClick,
  FormInput,
  TextCursorInput,
  Sparkles,
  Layers,
  MonitorPlay,
  PanelTop,
  Maximize2,
  HelpCircle,
} from 'lucide-react'

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  hero: Layout,
  header: Navigation,
  navigation: Navigation,
  footer: Layout,
  pricing: CreditCard,
  testimonial: MessageSquare,
  feature: Star,
  cta: Type,
  content: FileText,
  gallery: Image,
  grid: Grid3X3,
  stats: BarChart3,
  form: FormInput,
  blog: FileText,
  team: Grid3X3,
  faq: HelpCircle,
  logo: Image,
  banner: Layout,
  contact: MessageSquare,
  card: PanelTop,
  layout: Layers,
  animation: Sparkles,
  effect: Sparkles,
  text: Type,
  media: MonitorPlay,
  button: MousePointerClick,
  input: TextCursorInput,
  modal: Maximize2,
  section: PanelTop,
  background: Layers,
  overlay: Layers,
  other: Box,
}

export function getCategoryIcon(category: string): React.ComponentType<{ className?: string }> {
  return categoryIconMap[category.toLowerCase()] || Box
}

export function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const Icon = getCategoryIcon(category)
  return <Icon className={className} />
}
