/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'
const isUserSite = repoName?.endsWith('.github.io')
const basePath = isGitHubPages && repoName && !isUserSite ? `/${repoName}` : ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true
  }
}

export default nextConfig
