import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@wadahkode/aicss'],
  publicRuntimeConfig: {
    staticFolder: '/static',
  },
}

export default nextConfig
