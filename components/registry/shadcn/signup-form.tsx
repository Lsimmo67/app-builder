'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface ShadcnSignupFormProps {
  headline?: string
  description?: string
  submitText?: string
  loginText?: string
  showSocialLogin?: boolean
  className?: string
}

export default function ShadcnSignupForm({
  headline = 'Create your account',
  description = 'Start your free trial. No credit card required.',
  submitText = 'Create Account',
  loginText = 'Sign in',
  showSocialLogin = true,
  className,
}: ShadcnSignupFormProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-sm">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{headline}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </CardHeader>
          <CardContent>
            {showSocialLogin && (
              <>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Button variant="outline" className="w-full">Google</Button>
                  <Button variant="outline" className="w-full">GitHub</Button>
                </div>
                <div className="relative my-6">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                    or sign up with email
                  </span>
                </div>
              </>
            )}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-first">First name</Label>
                  <Input id="signup-first" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-last">Last name</Label>
                  <Input id="signup-last" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="Create a password" />
              </div>
              <Button type="submit" className="w-full">{submitText}</Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <a href="#" className="text-primary hover:underline">{loginText}</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
