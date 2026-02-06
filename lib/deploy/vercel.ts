/**
 * Vercel deployment integration
 * Handles deploying exported projects to Vercel
 */

export interface VercelDeployOptions {
  projectName: string
  teamId?: string
  token?: string
}

export interface VercelDeployResult {
  success: boolean
  url?: string
  deploymentId?: string
  error?: string
}

/**
 * Deploy a ZIP blob to Vercel using the Vercel API
 */
export async function deployToVercel(
  zipBlob: Blob,
  options: VercelDeployOptions
): Promise<VercelDeployResult> {
  const token = options.token || getStoredToken()

  if (!token) {
    return {
      success: false,
      error: 'No Vercel token configured. Add your token in Settings.',
    }
  }

  try {
    // Step 1: Create deployment
    const formData = new FormData()
    formData.append('file', zipBlob, `${options.projectName}.zip`)

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    }

    if (options.teamId) {
      headers['x-vercel-team-id'] = options.teamId
    }

    // Create project if it doesn't exist
    const createProjectRes = await fetch('https://api.vercel.com/v10/projects', {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: options.projectName,
        framework: 'nextjs',
      }),
    })

    if (!createProjectRes.ok && createProjectRes.status !== 409) {
      const error = await createProjectRes.text()
      return { success: false, error: `Failed to create project: ${error}` }
    }

    // Step 2: Upload files and trigger deployment
    const deployRes = await fetch(
      `https://api.vercel.com/v13/deployments`,
      {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: options.projectName,
          target: 'production',
          projectSettings: {
            framework: 'nextjs',
            buildCommand: 'next build',
            outputDirectory: '.next',
            installCommand: 'npm install',
          },
        }),
      }
    )

    if (!deployRes.ok) {
      const error = await deployRes.text()
      return { success: false, error: `Deployment failed: ${error}` }
    }

    const deployment = await deployRes.json()

    return {
      success: true,
      url: `https://${deployment.url}`,
      deploymentId: deployment.id,
    }
  } catch (error) {
    return {
      success: false,
      error: `Deployment error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

/**
 * Generate a deploy.sh script to include in the exported ZIP
 */
export function generateDeployScript(projectName: string): string {
  return `#!/bin/bash
# Deploy to Vercel
# Run this script from the project root after npm install

echo "Deploying ${projectName} to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "Installing Vercel CLI..."
  npm i -g vercel
fi

# Deploy to production
vercel --prod --yes

echo "Done! Your site is live."
`
}

function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('vercel-token')
}

export function setVercelToken(token: string): void {
  localStorage.setItem('vercel-token', token)
}

export function clearVercelToken(): void {
  localStorage.removeItem('vercel-token')
}
