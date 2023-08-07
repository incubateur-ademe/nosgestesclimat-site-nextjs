const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
	options: {
		// If you use remark-gfm, you'll need to use next.config.mjs
		// as the package is ESM only
		// https://github.com/remarkjs/remark-gfm#install
		remarkPlugins: [],
		rehypePlugins: [],
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
	i18n: {
		locales: ['fr', 'en-US'],
		defaultLocale: 'fr',
	},
	locales: ['fr', 'en-US'],
	defaultLocale: 'fr',
	webpack: function (config) {
		config.module.rules.push({
			test: /\.ya?ml$/,
			use: 'yaml-loader',
		})
		return config
	},
}

module.exports = withMDX(nextConfig)
