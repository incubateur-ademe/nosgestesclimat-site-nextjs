//@ts-check
const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const { withSentryConfig } = require('@sentry/nextjs')

const redirects = require('./config/redirects.js')

const remoteImagesPatterns = require('./config/remoteImagesPatterns.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  images: {
    remotePatterns: remoteImagesPatterns,
  },
  async redirects() {
    return redirects
  },
  webpack: (config, { dev }) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: 'memory',
      })
      config.cache.maxMemoryGenerations = 0
    }

    // Add a rule for YAML files
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    })

    return config
  },
  experimental: {
    outputFileTracingExcludes: {
      '*': ['.next/cache/webpack', '.git/**/*', 'cypress/**/*'],
      '/blog': ['public/NGC_Kit.diffusion.zip'],
      '/nouveautes': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
      '/actions/plus': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
      '/sitemap.xml': ['public/images/blog', 'public/NGC_Kit.diffusion.zip'],
    },
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
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
]

module.exports = withSentryConfig(
  withBundleAnalyzer(withMDX(nextConfig)),
  ...sentryConfig
)
