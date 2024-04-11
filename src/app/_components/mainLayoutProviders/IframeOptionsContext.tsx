'use client'

import { trackingIframe } from '@/constants/tracking/misc'
import { useIsClient } from '@/hooks/useIsClient'
import { getIsIframe } from '@/utils/getIsIframe'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'

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

  const [iframeIntegratorOptions, setIframeIntegratorOptions] = useState({
    integratorLogo: null,
    integratorName: null,
    integratorActionUrl: null,
    integratorYoutubeVideo: null,
    integratorActionText: null,
  })
  const [isIframeShareData, setIsIframeShareData] = useState(false)
  const [iframeRegion, setIframeRegion] = useState<string | null>(null)
  const [isIframeOnlySimulation, setIsIframeOnlySimulation] = useState(false)
  const [iframeLang, setIframeLang] = useState<string | null>(null)

  useEffect(() => {
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
        trackingIframe(
          urlParams.get('integratorUrl') || "Pas d'URL d'intégration"
        )
      )
    }

    setIframeIntegratorOptions(
      Object.fromEntries(
        [
          'integratorLogo',
          'integratorName',
          'integratorActionUrl',
          'integratorYoutubeVideo',
          'integratorActionText',
        ].map((key) => [
          key,
          nullDecode(
            new URLSearchParams(document.location.search).get(key) ?? ''
          ),
        ])
      ) as any
    )

    setIsIframeShareData(Boolean(urlParams.get('shareData')))

    setIframeRegion(urlParams.get('region'))

    setIsIframeOnlySimulation(Boolean(urlParams.get('onlySimulation')))

    setIframeLang(urlParams.get('lang'))
  }, [isIframe])

  useEffect(() => {
    if (isIframeOnlySimulation) {
      // Add class to body that hides the header and the footer
      document.body.classList.add('iframeOnlySimulation')
    }
  }, [isIframeOnlySimulation])

  return (
    <IframeOptionsContext.Provider
      value={{
        ...iframeIntegratorOptions,
        isIframeShareData,
        iframeRegion,
        isIframeOnlySimulation,
        iframeLang,
      }}>
      {children}
    </IframeOptionsContext.Provider>
  )
}
