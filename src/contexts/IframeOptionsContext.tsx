'use client'

import { useIsClient } from '@/app/_components/IsClientCtxProvider'
import { getMatomoEventVisitViaIframe } from '@/constants/matomo'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { PropsWithChildren, createContext } from 'react'
import { getIsIframe } from '../utils/getIsIframe'

export const IframeOptionsContext = createContext<{
  isIframe?: boolean
  iframeShareData?: string | null
  iframeLocalisation?: string | null
  iframeOnlySimulation?: boolean
}>({})

const nullDecode = (string: string) =>
  string == null ? string : decodeURIComponent(string)

export const IframeOptionsProvider = ({ children }: PropsWithChildren) => {
  const isClient = useIsClient()

  const isIframe = isClient && getIsIframe()

  if (!isIframe) return children

  const urlParams = new URLSearchParams(window.location.search)

  const isIframeParameterDefined = urlParams.get('iframe') !== null

  // Si l'on détecte que l'on est dans un iframe sans paramètre iframe défini
  // on essaie de récupérer l'URL du referrer
  if (isIframe && !isIframeParameterDefined) {
    urlParams.set('iframe', '')
    urlParams.set('integratorUrl', document.referrer)
  }

  if (isIframe) {
    trackEvent(
      getMatomoEventVisitViaIframe(
        urlParams.get('integratorUrl') || "Pas d'URL d'intégration"
      )
    )
  }

  const iframeIntegratorOptions = Object.fromEntries(
    [
      'integratorLogo',
      'integratorName',
      'integratorActionUrl',
      'integratorYoutubeVideo',
      'integratorActionText',
    ].map((key) => [
      key,
      nullDecode(new URLSearchParams(document.location.search).get(key) ?? ''),
    ])
  )

  const iframeShareData = urlParams.get('shareData')

  const iframeLocalisation = urlParams.get('localisation')

  const iframeOnlySimulation = Boolean(urlParams.get('onlySimulation'))

  if (iframeOnlySimulation) {
    // Add class to body that hides the header and the footer
    document.body.classList.add(isIframe ? 'iframe' : '')
  }

  const finalValue = {
    ...iframeIntegratorOptions,
    isIframe,
    iframeShareData,
    iframeLocalisation,
    iframeOnlySimulation,
  }

  return (
    <IframeOptionsContext.Provider value={finalValue}>
      {children}
    </IframeOptionsContext.Provider>
  )
}
