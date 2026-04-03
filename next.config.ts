import type { NextConfig } from 'next'
import { version as release } from './package.json'

import createMDX from '@next/mdx'
import { SentryBuildOptions, withSentryConfig } from '@sentry/nextjs'

import redirects from './config/redirects.js'

import { remoteImagesPatterns } from './config/remoteImagesPatterns'
import { PROXY_SERVER } from './config/urls'

const withMDX = createMDX({
  extension: /\.mdx$/,
})


// Use rewrite rules to proxy requests from the client to the server when both are on different domain (preview app / local)

const rewrites = PROXY_SERVER? {
  rewrites: () => [{
    source: '/api/server/:path*',
    destination: `${serverUrl}/:path*`,
  }]
} : {}


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

  ...rewrites,
  webpack(config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    })

    return config
  },
}

const sentryConfig = {
  // Suppresses source map uploading logs during build
  silent: process.env.NODE_ENV === 'development',
  org: 'incubateur-ademe',
  project: 'nosgestesclimat-nextjs',
  release,

  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: process.env.NODE_ENV !== 'development',


  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  telemetry: process.env.NODE_ENV !== 'development',

  include: '.',
  ignore: ['node_modules', '.next', 'cypress'],
} as SentryBuildOptions

export default process.env.NODE_ENV !== 'development'
  ? withSentryConfig(withMDX(nextConfig), sentryConfig)
  : withMDX(nextConfig)
