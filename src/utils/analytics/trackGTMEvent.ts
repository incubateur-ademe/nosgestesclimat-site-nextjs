declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
  }
}

export const trackGTMEvent = (event: { event: string }) => {
  if (typeof window === 'undefined' || !window.dataLayer) {
    console.debug(`GTM Event (not sent - GTM not loaded): ${event.event}`)
    return
  }

  window.dataLayer.push(event)
}
