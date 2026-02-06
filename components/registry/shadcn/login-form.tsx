'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface ShadcnLoginFormProps {
  headline?: string
  description?: string
  submitText?: string
  signupText?: string
  forgotPasswordText?: string
  showSocialLogin?: boolean
  className?: string
}

export default function ShadcnLoginForm({
  headline = 'Welcome back',
  description = 'Sign in to your account to continue.',
  submitText = 'Sign In',
  signupText = 'Create an account',
  forgotPasswordText = 'Forgot password?',
  showSocialLogin = true,
  className,
}: ShadcnLoginFormProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-sm">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{headline}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Password</Label>
                  <a href="#" className="text-sm text-primary hover:underline">{forgotPasswordText}</a>
                </div>
                <Input id="login-password" type="password" placeholder="Enter your password" />
              </div>
              <Button type="submit" className="w-full">{submitText}</Button>
            </form>
            {showSocialLogin && (
              <>
                <div className="relative my-6">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                    or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">Google</Button>
                  <Button variant="outline" className="w-full">GitHub</Button>
                </div>
              </>
            )}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <a href="#" className="text-primary hover:underline">{signupText}</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
