declare global {
  interface Window {
    dataLayer: any[]
  }
}

export const trackGTMEvent = (event: { event: string }) => {
  if (typeof window === 'undefined' || !window.dataLayer) {
    console.debug(`GTM Event (not sent - GTM not loaded): ${event}`)
    return
  }

  window.dataLayer.push(event)
  console.debug(`GTM Event sent: ${event}`)
}
