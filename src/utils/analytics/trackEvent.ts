import posthog from 'posthog-js'

const shouldNotTrack = process.env.NODE_ENV === 'development'

const shouldLogTracking =
  process.env.NODE_ENV === 'development' ||
  process.env.NEXT_PUBLIC_MATOMO_ID !== '1'

declare global {
  interface Window {
    _paq: unknown[]
    Matomo: Record<string, unknown>
  }
}

/**
 * Unified tracking function that sends events to both Matomo and Posthog
 * @param matomoArgs - Array for Matomo tracking: ['trackEvent', 'Category', 'Action', 'Name', 'Value']
 * @param posthogEvent - Optional object for Posthog tracking: { eventName: string, properties?: Record<...> }
 */
export interface PosthogEventType {
  eventName: string
  properties?: Record<string, string | number | boolean | null | undefined>
}
export const trackEvents = (
  matomoArgs: (string | null)[],
  posthogEvent?: PosthogEventType
) => {
  // Track to Matomo
  if (shouldLogTracking) {
    console.log('Matomo:', matomoArgs)
    console.debug('Matomo:', matomoArgs.join(' => '))
  }

  if (!shouldNotTrack && window?._paq) {
    window._paq.push([...matomoArgs])
  }

  // Track to Posthog if provided
  if (posthogEvent) {
    if (shouldLogTracking) {
      console.log('Posthog:', posthogEvent)
      console.debug(
        'Posthog:',
        `"${posthogEvent.eventName}" =>`,
        posthogEvent.properties
      )
    }

    if (!shouldNotTrack && typeof window !== 'undefined' && window?._paq) {
      posthog.capture(posthogEvent.eventName, { ...posthogEvent.properties })
    }
  }
}

/**
 * @deprecated Use trackEvents with matomoArgs parameter instead
 */
export const trackEvent = (args: (string | null)[]) => {
  if (shouldLogTracking) {
    console.log(args)
    console.debug(args.join(' => '))
  }

  if (shouldNotTrack || !window?._paq) {
    return
  }

  // Matomo: [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]
  // Exemple : ['trackEvent', 'Misc', 'Region', 'Region used: FR']
  // Or : ['trackEvent', 'Accueil', 'CTA Click', 'Click Reprendre le test']
  // Or : ['trackEvent', 'Simulation', 'Simulation Completed', null, '8.9']
  // Or : ['trackEvent', 'Simulation', 'Simulation Time', null, '3']
  // Or : ['trackEvent', 'Fin', 'Toggle Target block']

  // Pass a copy of the array to avoid mutation
  window?._paq?.push([...args])
}

/**
 * @deprecated Use trackEvents with posthogEvent parameter instead
 */
export const trackPosthogEvent = (args: {
  eventName: string
  properties?: Record<string, string | number | boolean | null | undefined>
}) => {
  if (shouldLogTracking) {
    console.log(args)
    console.debug('posthog', `"${args.eventName}" =>`, args.properties)
  }

  if (shouldNotTrack || !window?._paq) {
    return
  }

  posthog.capture(args.eventName, { ...args.properties })
}

export const trackPageView = (url: string, anonymizedUrl: string) => {
  if (shouldLogTracking) {
    console.debug('trackPageView => ' + url)
    console.debug('trackAnonymizedPageView => ' + anonymizedUrl)
  }

  if (shouldNotTrack || !window?._paq) {
    return
  }

  posthog.capture('$pageview', { $current_url: url })

  // We track "organisation anonymized" page view for Matomo, as it is public. We don't want anyone to check any poll results with the slug.
  window?._paq?.push(['setCustomUrl', anonymizedUrl])
  window?._paq?.push(['setDocumentTitle', document?.title])

  // remove all previously assigned custom variables, requires Matomo (formerly Piwik) 3.0.2
  window?._paq?.push(['deleteCustomVariables', 'page'])
  window?._paq?.push(['setPagePerformanceTiming', 0])

  window?._paq?.push(['trackPageView'])
}
