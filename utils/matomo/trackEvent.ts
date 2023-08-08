const shouldUseDevTracker =
	process.env.NODE_ENV === 'development' ||
	process.env.CONTEXT === 'deploy-preview'

const groupExclusionRegexp = /\/(sondage|conférence)\//

export const trackEvent = (args: string[]) => {
	if (shouldUseDevTracker) {
		// eslint-disable-next-line no-console
		console?.debug(args)
		return
	}

	if (window.location.pathname.match(groupExclusionRegexp)) return

	// Pass a copy of the array to avoid mutation
	window._paq.push([...args])
}
