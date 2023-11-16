'use client'

import { getMatomoEventVisitViaIframe } from '@/constants/matomo'
import { useIsClient } from '@/hooks/useIsClient'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { PropsWithChildren, createContext } from 'react'
import { getIsIframe } from '../utils/getIsIframe'

export const IframeOptionsContext = createContext<{
  isIframe?: boolean
  isIframeShareData?: boolean
  iframeRegion?: string | null
  isIframeOnlySimulation?: boolean
  iframeLang?: string | null
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

  const isIframeShareData = Boolean(urlParams.get('shareData'))

  const iframeRegion = urlParams.get('region')

  const isIframeOnlySimulation = Boolean(urlParams.get('onlySimulation'))

  const iframeLang = urlParams.get('lang')

  if (isIframeOnlySimulation) {
    // Add class to body that hides the header and the footer
    document.body.classList.add('iframeOnlySimulation')
  }

  const finalValue = {
    ...iframeIntegratorOptions,
    isIframe,
    isIframeShareData,
    iframeRegion,
    isIframeOnlySimulation,
    iframeLang,
  }

  return (
    <IframeOptionsContext.Provider value={finalValue}>
      {children}
    </IframeOptionsContext.Provider>
  )
}
