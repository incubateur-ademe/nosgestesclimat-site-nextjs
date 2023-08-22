export function getIsIframe(): boolean {
	try {
		return window.self !== window.top
	} catch (e) {
		return true
	}
}
