module.exports = {
	plugins: ['react-hooks', 'jsx-a11y'],
	extends: [
		'next/babel',
		'next/core-web-vitals',
		'eslint:recommended',
		'plugin:react/recommended',
		'prettier',
		'plugin:jsx-a11y/strict',
		'plugin:react-hooks/recommended',
		'plugin:cypress/recommended',
	],
	rules: {
		'react/no-unescaped-entities': 'off',
	},
}
