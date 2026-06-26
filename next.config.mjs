/* @type {import('next').NextConfig} */
const useRepoBasePath = process.env.NEXT_PUBLIC_USE_REPO_BASE_PATH === 'true'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isUserSite = repoName?.endsWith('.github.io')
const basePath = useRepoBasePath && repoName && !isUserSite ? `/${repoName}` : ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  images: {
    unoptimized: true
  }
}

export default nextConfig
