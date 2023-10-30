/* eslint @typescript-eslint/no-var-requires: 0 */
const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
})

const withSplit = require('next-with-split').withSplit({
  splits: {
    newColorPalette: {
      path: '/*',
      hosts: {
        'add-split-testing':
          'nosgestesclimat-git-add-split-testing-nos-gestes-climat.vercel.app/',
        'modif-couleurs':
          'nosgestesclimat-git-modif-couleurs-nos-gestes-climat.vercel.app',
      },
    },
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  webpack: function (config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'js-yaml-loader',
    })

    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,

      fs: false, // the solution
    }

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'abc-transitionbascarbone.fr',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/wikipedia/commons/**',
      },
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/actions/liste',
        destination: '/actions',
        permanent: true,
      },
      {
        source: '/groupes/:path*',
        destination: '/amis/:path*',
        permanent: true,
      },
      {
        source: '/conférence/:path*',
        destination: 'https://sondages.nosgestesclimat.fr/conférence/:path*',
        permanent: true,
      },
      {
        source: '/sondage/:path*',
        destination: 'https://sondages.nosgestesclimat.fr/sondage/:path*',
        permanent: true,
      },
      {
        source: '/mon-empreinte-carbone/:path*',
        destination: '/fin/:path*',
        permanent: true,
      },
      {
        source: '/nouveaut%C3%A9s',
        destination: '/nouveautes',
        permanent: true,
      },
      {
        source: '/vie-priv%C3%A9e',
        destination: '/vie-privee',
        permanent: true,
      },
      {
        source: '/partenaires',
        destination: '/diffuser',
        permanent: true,
      },
    ]
  },
  experimental: {
    mdxRs: true,
  },
}

module.exports = withSplit(withMDX(nextConfig))

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  module.exports,
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
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
)
