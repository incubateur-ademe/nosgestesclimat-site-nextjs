//@ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
})

const { withSentryConfig } = require('@sentry/nextjs')

const redirects = require('./config/redirects.js')

const remoteImagesPatterns = require('./config/remoteImagesPatterns.js')

const { sentryWebpackPlugin } = require('@sentry/webpack-plugin')

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
  webpack: (config, { dev }) => {
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
    config.devtool = !dev ? 'source-map' : 'eval-source-map'

    if (process.env.SENTRY_AUTH_TOKEN) {
      config.plugins.push(
        sentryWebpackPlugin({
          authToken: process.env.SENTRY_AUTH_TOKEN_SOURCEMAPS,
          org: 'betagouv',
          project: 'nosgestesclimat-nextjs',
        })
      )
    }

    return config
  },
  productionBrowserSourceMaps: true,
  experimental: {
    outputFileTracingExcludes: {
      '*': ['.next/cache/webpack', '.git/**/*', 'cypress/**/*'],
      '/blog': ['public/NGC_Kit.diffusion.zip'],
      '/nouveautes': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
      '/actions/plus': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
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

const sentryConfig = [
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'betagouv',
    project: 'nosgestesclimat-nextjs',
    url: 'https://sentry.incubateur.net/',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: false,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: false,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: false,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
]

module.exports =
  process.env.NODE_ENV !== 'development'
    ? withSentryConfig(withMDX(nextConfig), ...sentryConfig)
    : nextConfig
