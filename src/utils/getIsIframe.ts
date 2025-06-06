export function getIsIframe(): boolean {
  if (typeof window === 'undefined') return false

  try {
    console.log('in getIsIframe, window.self', window.self)
    console.log('window.top', window.top)
    return window.self !== window.top
  } catch (e) {
    console.log(e)
    return true
  }
}
