//@ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
})

const { withSentryConfig } = require('@sentry/nextjs')

const redirects = require('./config/redirects.js')

const remoteImagesPatterns = require('./config/remoteImagesPatterns.js')

// const { sentryWebpackPlugin } = require('@sentry/webpack-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    // @ts-expect-error remotePatterns is not typed
    remotePatterns: remoteImagesPatterns,
  },
  async redirects() {
    return redirects
  },
  webpack: (config, { dev, isServer }) => {
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
        config.cache.maxMemoryGenerations = 0
      }
    }

    // Add a rule for YAML files
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    })

    // Enable source maps
    if (!dev && !isServer) {
      config.devtool = 'source-map'
    }

    // We do not want to split the chunks too much
    config.optimization.splitChunks.minSize = 300000

    return config
  },
  productionBrowserSourceMaps: true,
  sentry: {
    hideSourceMaps: false, // Ensure source maps are not hidden
  },
  experimental: {
    outputFileTracingExcludes: {
      '*': ['.next/cache/webpack', '.git/**/*', 'cypress/**/*'],
      '/blog': ['public/NGC_Kit.diffusion.zip'],
      '/nouveautes': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
      '/sitemap.xml': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
    },
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

  org: 'incubateur-ademe',
  project: 'nosgestesclimat-nextjs',
  sentryUrl: 'https://sentry.io/',

  // Only print logs for uploading source maps in CI
  silent: true,

  authToken: process.env.SENTRY_AUTH_TOKEN,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
}

module.exports =
  process.env.NODE_ENV !== 'development'
    ? withSentryConfig(withMDX(nextConfig), sentryConfig)
    : nextConfig
