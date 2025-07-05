import type { NextConfig } from 'next'
import path from 'path'
import type { Configuration } from 'webpack'

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
  webpack: (
    config: Configuration,
    { dev, isServer }: { dev: boolean; isServer: boolean }
  ) => {
    if (isServer) {
      config.ignoreWarnings = [
        { module: /opentelemetry/ },
        { module: /mdx-js-loader/ },
        { module: /next\.config\.compiled\.js/ },
        { module: /importRulesFromModel/ },
      ]
    }

    // Add a rule for YAML files
    config.module?.rules?.push({
      test: /\.ya?ml$/,
      use: [{ loader: 'yaml-loader' }],
    })

    if (!dev) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: { config: [__filename] },
        cacheDirectory: path.resolve(process.cwd(), '.next/cache/webpack'),
        compression: 'gzip',
        maxAge: 172800000,
        allowCollectingMemory: true,
        memoryCacheUnaffected: true,
      }
    }

    // Enable source maps
    if (!dev && !isServer) {
      config.devtool = 'hidden-source-map'
    }

    return config
  },
  productionBrowserSourceMaps: false,
  outputFileTracingExcludes: {
    '*': [
      '.next/cache/webpack',
      '.git/**/*',
      'cypress/**/*',
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
      'node_modules/sharp/vendor/**/*',
    ],
  },
  turbopack: {
    rules: {
      '*.yaml': {
        loaders: ['yaml-loader'],
      },
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  experimental: {
    optimizePackageImports: [
      '@incubateur-ademe/nosgestesclimat',
      'react',
      'react-dom',
      'lodash',
      'date-fns',
    ],
    webpackBuildWorker: true,
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

  hideSourceMaps: true,
  autoDiscoverRelease: true,
  include: '.',
  ignore: ['node_modules', '.next', 'cypress'],
}

module.exports =
  process.env.NODE_ENV !== 'development'
    ? withSentryConfig(withMDX(nextConfig), sentryConfig)
    : withMDX(nextConfig)
