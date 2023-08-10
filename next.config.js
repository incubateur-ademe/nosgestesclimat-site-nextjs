const { i18nRewriter } = require('next-i18n-router')

const withMDX = require('@next/mdx')({
	extension: /\.mdx$/,
	options: {
		// If you use `MDXProvider`, uncomment the following line.
		// providerImportSource: "@mdx-js/react",
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
		],
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	async rewrites() {
		return {
			afterFiles: i18nRewriter({
				locales: ['fr', 'en-US'],
				defaultLocale: 'fr',
			}),
		}
	},
}

module.exports = withMDX(nextConfig)
