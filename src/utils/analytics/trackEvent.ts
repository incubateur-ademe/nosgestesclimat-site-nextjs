const shouldUseDevTracker = process.env.NODE_ENV === 'development'

declare global {
  interface Window {
    _paq: any[]
  }
}

export const trackEvent = (args: (string | null)[]) => {
  if (shouldUseDevTracker || !window?._paq) {
    console.log(args)
    console.debug(args.join(' => '))
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

export const trackPageView = (url: string) => {
  if (shouldUseDevTracker || !window?._paq) {
    console.debug('trackPageView => ' + url)
    return
  }

  window?._paq?.push(['setCustomUrl', url])
  window?._paq?.push(['setDocumentTitle', document?.title])

  // remove all previously assigned custom variables, requires Matomo (formerly Piwik) 3.0.2
  window?._paq?.push(['deleteCustomVariables', 'page'])
  window?._paq?.push(['setPagePerformanceTiming', 0])

  window?._paq?.push(['trackPageView'])
}
