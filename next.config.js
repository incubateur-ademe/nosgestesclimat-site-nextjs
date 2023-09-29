// const { i18nRewriter } = require('next-i18n-router')

const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
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
  // async rewrites() {
  //   return {
  //     afterFiles: i18nRewriter({
  //       locales: ['fr', 'en'],
  //       defaultLocale: 'fr',
  //     }),
  //   }
  // },
  async redirects() {
    return [
      {
        source: '/actions/liste',
        destination: '/actions',
        permanent: true,
      },
    ]
  },
}

module.exports = withMDX(nextConfig)
