import type { NextConfig } from 'next'

import createMDX from '@next/mdx'
import { withSentryConfig } from '@sentry/nextjs'

import redirects from './config/redirects.js'

import { remoteImagesPatterns } from './config/remoteImagesPatterns'

const withMDX = createMDX({
  extension: /\.mdx$/,
})

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    remotePatterns: remoteImagesPatterns,
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async redirects() {
    return redirects
  },
  productionBrowserSourceMaps: false,
  outputFileTracingExcludes: {
    '*': ['.next/cache/webpack', '.git/**/*', 'cypress/**/*'],
  },
  turbopack: {
    rules: {
      '*.yaml': {
        loaders: ['yaml-loader'],
        as: '*.js',
      },
      '*.yml': {
        loaders: ['yaml-loader'],
        as: '*.js',
      },
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  experimental: {
    optimizePackageImports: ['@incubateur-ademe/nosgestesclimat'],
    webpackBuildWorker: true,
    authInterrupts: true,
    mdxRs: true,
    useCache: true,
  },
  async rewrites() {
    if (process.env.NEXT_PUBLIC_PROXY_SERVER === 'true') {
      // If API server and nextJS are on different subdomains (development),
      // we might want to creates a proxy to avoid cookie issues
      return [
        {
          source: '/api/server/:path*',
          destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
        },
      ]
    }
    return []
  },
}

const sentryConfig = {
  // Suppresses source map uploading logs during build
  silent: true,
  org: 'incubateur-ademe',
  project: 'nosgestesclimat-nextjs',

  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: process.env.NODE_ENV !== 'development',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  telemetry: process.env.NODE_ENV !== 'development',

  autoDiscoverRelease: true,
  include: '.',
  ignore: ['node_modules', '.next', 'cypress'],
}

export default process.env.NODE_ENV !== 'development'
  ? withSentryConfig(withMDX(nextConfig), sentryConfig)
  : withMDX(nextConfig)
