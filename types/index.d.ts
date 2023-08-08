declare module '*.yaml' {
	const data: string
	export default data
}

declare global {
	var window: {
		_paq: any
	}
}
