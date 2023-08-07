import { getIsIframe } from '../getIsIframe'

const shouldUseDevTracker =
	process.env.NODE_ENV === 'development' ||
	process.env.CONTEXT === 'deploy-preview'

const groupExclusionRegexp = /\/(sondage|conférence)\//

const ua = window.navigator.userAgent

// https://chromium.googlesource.com/chromium/src.git/+/master/docs/ios/user_agent.md
const iOSSafari =
	(!!/iPad/i.exec(ua) || !!/iPhone/i.exec(ua)) &&
	!!/WebKit/i.exec(ua) &&
	!/CriOS/i.exec(ua)

export const trackEvent = (args: string[]) => {
	if (shouldUseDevTracker) {
		// eslint-disable-next-line no-console
		console?.debug(args)
		return
	}

	if (window.location.pathname.match(groupExclusionRegexp)) return

	// There is an issue with the way Safari handle cookies in iframe, cf.
	// https://gist.github.com/iansltx/18caf551baaa60b79206. We could probably
	// do better but for now we don't track action of iOs Safari user in
	// iFrame -- to avoid errors in the number of visitors in our stats.
	if (iOSSafari && getIsIframe()) return

	// Pass a copy of the array to avoid mutation
	window._paq.push([...args])
}
