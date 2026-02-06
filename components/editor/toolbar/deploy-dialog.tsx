'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { deployToVercel, setVercelToken } from '@/lib/deploy'
import { Rocket, Loader2, Check, ExternalLink, AlertCircle } from 'lucide-react'

interface DeployDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectName: string
  zipBlob: Blob | null
}

export function DeployDialog({ open, onOpenChange, projectName, zipBlob }: DeployDialogProps) {
  const [token, setToken] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployUrl, setDeployUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const hasStoredToken = typeof window !== 'undefined' && !!localStorage.getItem('vercel-token')

  const handleDeploy = async () => {
    if (!zipBlob) return

    if (token) {
      setVercelToken(token)
    }

    setIsDeploying(true)
    setError(null)
    setDeployUrl(null)

    const result = await deployToVercel(zipBlob, {
      projectName: projectName.toLowerCase().replace(/\s+/g, '-'),
    })

    setIsDeploying(false)

    if (result.success && result.url) {
      setDeployUrl(result.url)
    } else {
      setError(result.error || 'Deployment failed')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Deploy to Vercel
          </DialogTitle>
          <DialogDescription>
            Deploy your exported project directly to Vercel.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!hasStoredToken && (
            <div>
              <label className="text-sm font-medium mb-1 block">Vercel Token</label>
              <Input
                type="password"
                placeholder="Enter your Vercel API token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Get your token from vercel.com/account/tokens
              </p>
            </div>
          )}

          {deployUrl && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-600 font-medium mb-2">
                <Check className="h-4 w-4" />
                Deployed successfully!
              </div>
              <a
                href={deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                {deployUrl}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-center gap-2 text-destructive font-medium mb-1">
                <AlertCircle className="h-4 w-4" />
                Deployment Failed
              </div>
              <p className="text-sm text-destructive/80">{error}</p>
            </div>
          )}

          {!zipBlob && (
            <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
              Export your project first to generate the deployment package.
            </div>
          )}

          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2">Alternative: Manual Deploy</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Export the ZIP, extract it, then run:
            </p>
            <code className="text-xs bg-background px-2 py-1 rounded block">
              npx vercel --prod
            </code>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={handleDeploy}
            disabled={isDeploying || !zipBlob || (!hasStoredToken && !token)}
          >
            {isDeploying ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deploying...
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4 mr-2" />
                Deploy
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
