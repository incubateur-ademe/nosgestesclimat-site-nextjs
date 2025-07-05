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
    // Ignorer les warnings pour tous les environnements
    config.ignoreWarnings = [
      { module: /opentelemetry/ },
      { module: /mdx-js-loader/ },
      { module: /next\.config\.compiled\.js/ },
      { module: /importRulesFromModel/ },
      // Ignorer les erreurs de cache webpack - regex exacte
      {
        message:
          /Can't resolve.*next\.config\.compiled\.js.*while resolving.*next\.config\.compiled\.js/,
      },
      {
        message:
          /Caching failed for pack.*Error: Can't resolve.*next\.config\.compiled\.js/,
      },
      {
        message:
          /\[webpack\.cache\.PackFileCacheStrategy\] Caching failed for pack/,
      },
      // Ignorer tous les warnings liés au cache
      { message: /Caching failed for pack/ },
    ]

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
      'node_modules/@swc/core-darwin-x64',
      'node_modules/@swc/core-win32-x64-msvc',
      'node_modules/@swc/core-win32-arm64-msvc',
      'node_modules/@swc/core-darwin-arm64',
      'node_modules/@swc/core-linux-arm64-gnu',
      'node_modules/@swc/core-linux-arm64-musl',
      'node_modules/@esbuild/linux-x64',
      'node_modules/@esbuild/darwin-x64',
      'node_modules/@esbuild/win32-x64',
      'node_modules/@esbuild/darwin-arm64',
      'node_modules/@esbuild/linux-arm64',
      'node_modules/@esbuild/win32-arm64',
      'node_modules/sharp/vendor/**/*',
      'node_modules/sharp/build/Release',
      'node_modules/canvas/build/Release',
      'node_modules/canvas/build/Release/obj',
      'node_modules/puppeteer/.local-chromium/**/*',
      'node_modules/puppeteer/lib/esm/puppet/**/*',
      'node_modules/playwright/browsers/**/*',
      'node_modules/playwright/install-scripts/**/*',
      'node_modules/pg/lib/native/**/*',
      'node_modules/pg/build/Release',
      'node_modules/gl/build/Release',
      'node_modules/glu/build/Release',
      'node_modules/glfw/build/Release',
      'node_modules/gl-matrix/build/Release',
      'node_modules/gl-texture2d/build/Release',
      'node_modules/gl-fbo/build/Release',
      'node_modules/gl-buffer/build/Release',
      'node_modules/gl-vao/build/Release',
      'node_modules/gl-shader/build/Release',
      'node_modules/gl-program/build/Release',
      'node_modules/gl-draw/build/Release',
      'node_modules/gl-geometry/build/Release',
      'node_modules/gl-mesh/build/Release',
      'node_modules/gl-object/build/Release',
      'node_modules/gl-camera/build/Release',
      'node_modules/@storybook/**/*',
      'node_modules/storybook/**/*',
      'node_modules/cypress/**/*',
      'node_modules/playwright/**/*',
      'node_modules/puppeteer/**/*',
      'node_modules/jest/**/*',
      'node_modules/@testing-library/**/*',
      'node_modules/jsdom/**/*',
      'node_modules/msw/**/*',
      'node_modules/@babel/**/*',
      'node_modules/babel-**/*',
      'node_modules/eslint/**/*',
      'node_modules/prettier/**/*',
      'node_modules/typescript/**/*',
      'node_modules/ts-node/**/*',
      'node_modules/ts-prune/**/*',
      'node_modules/webpack/**/*',
      'node_modules/postcss/**/*',
      'node_modules/tailwindcss/**/*',
      'node_modules/i18next-parser/**/*',
      'node_modules/deepl-node/**/*',
      'node_modules/@faker-js/**/*',
      'node_modules/faker/**/*',
      'node_modules/posthog-js/**/*',
      'node_modules/axe-core/**/*',
      'node_modules/cypress-axe/**/*',
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
      'axios',
      'dayjs',
      'framer-motion',
      'fuse.js',
      'html-to-image',
      'i18next',
      'i18next-browser-languagedetector',
      'i18next-resources-to-backend',
      'markdown-to-jsx',
      'posthog-js',
      'publicodes',
      'react-hook-form',
      'react-i18next',
      'react-number-format',
      'react-select',
      'react-tooltip',
      'recharts',
      'tailwind-merge',
      'tailwindcss',
      'uuid',
      'yargs',
      'ramda',
      '@tanstack/react-query',
      'react-wavify',
      'react-debounce-input',
      'react-verification-input',
      'use-count-up',
      'gray-matter',
      'process',
    ],
    webpackBuildWorker: true,
  },
}

const sentryConfig = {
  // Suppresses source map uploading logs during build
  silent: true,
  org: 'incubateur-ademe',
  project: 'nosgestesclimat-nextjs',

  authToken: process.env.SENTRY_AUTH_TOKEN,

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
