import type { Configuration } from 'webpack'

const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
})

import { withSentryConfig } from '@sentry/nextjs'

import redirects from './config/redirects.js'

import remoteImagesPatterns from './config/remoteImagesPatterns.js'

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    remotePatterns: remoteImagesPatterns,
  },
  async redirects() {
    return redirects
  },
  webpack: (
    config: Configuration,
    { dev, isServer }: { dev: boolean; isServer: boolean }
  ) => {
    if (isServer) {
      config.ignoreWarnings = [{ module: /opentelemetry/ }]
    }

    if (config.cache) {
      if (dev) {
        // Development configuration
        config.cache = {
          type: 'filesystem',
        }
      } else {
        // Use cache in production
        config.cache = Object.freeze({
          type: 'memory',
        })
      }
    }

    // Add a rule for YAML files
    config.module?.rules?.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    })

    // Enable source maps
    if (!dev && !isServer) {
      config.devtool = 'source-map'
    }

    return config
  },
  productionBrowserSourceMaps: true,
  outputFileTracingExcludes: {
    '*': ['.next/cache/webpack', '.git/**/*', 'cypress/**/*'],
    '/blog': ['public/NGC_Kit.diffusion.zip'],
    '/nouveautes': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
    '/sitemap.xml': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
  },
  experimental: {
    optimizePackageImports: ['@incubateur-ademe/nosgestesclimat'],
    webpackBuildWorker: true,
    turbo: {
      rules: {
        '*.yaml': {
          loaders: ['yaml-loader'],
        },
      },
    },
  },
}

const sentryConfig = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: 'incubateur-ademe',
  project: 'nosgestesclimat-nextjs',

  authToken: process.env.SENTRY_AUTH_TOKEN,
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: false,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  telemetry: process.env.NODE_ENV !== 'development',
}

module.exports =
  process.env.NODE_ENV !== 'development'
    ? withSentryConfig(withMDX(nextConfig), sentryConfig)
    : nextConfig
