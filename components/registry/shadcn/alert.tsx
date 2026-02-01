"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"

const iconMap = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
}

export interface ShadcnAlertProps {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success" | "warning"
  showIcon?: boolean
  className?: string
}

export default function ShadcnAlert({
  title = "Heads up!",
  description = "You can add components to your app using the CLI.",
  variant = "default",
  showIcon = true,
  className,
}: ShadcnAlertProps) {
  const Icon = iconMap[variant] || Info

  return (
    <Alert
      variant={variant === "success" || variant === "warning" ? "default" : variant}
      className={className}
    >
      {showIcon && <Icon className="h-4 w-4" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  )
}
