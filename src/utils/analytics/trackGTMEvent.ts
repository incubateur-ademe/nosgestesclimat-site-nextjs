declare global {
  interface Window {
    dataLayer: any[]
    gtag?: (...args: any[]) => void
  }
}

export const trackGTMEvent = (event: { event: string }) => {
  if (typeof window === 'undefined' || !window.dataLayer) {
    console.debug(`GTM Event (not sent - GTM not loaded): ${event.event}`)
    return
  }

  // Log avant l'envoi
  console.debug(`GTM Event about to be sent:`, event)
  console.debug(`Current dataLayer length:`, window.dataLayer.length)

  window.dataLayer.push(event)

  // Log après l'envoi
  console.debug(`GTM Event sent: ${event.event}`)
  console.debug(`New dataLayer length:`, window.dataLayer.length)
  console.debug(
    `Latest dataLayer entry:`,
    window.dataLayer[window.dataLayer.length - 1]
  )

  // Vérifier si GTM est bien configuré
  if (window.gtag) {
    console.debug('GTM gtag function is available')
  } else {
    console.debug(
      'GTM gtag function not yet available (this is normal during loading)'
    )
  }
}
