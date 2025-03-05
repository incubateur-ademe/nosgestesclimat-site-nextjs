'use client'

import { useTrackIframe } from '@/hooks/tracking/useTrackIframe'
import { useIsClient } from '@/hooks/useIsClient'
import { getIsIframe } from '@/utils/getIsIframe'
import { createContext, useEffect, useState } from 'react'

export const IframeOptionsContext = createContext<{
  isIframe?: boolean
  isIframeShareData?: boolean
  iframeRegion?: string | null
  isIframeOnlySimulation?: boolean
  iframeLang?: string | null
}>({})

const nullDecode = (string: string) =>
  string == null ? string : decodeURIComponent(string)

export const IframeOptionsProvider = ({
  children,
}: {
  children: (
    containerRef: React.RefObject<HTMLDivElement | null>
  ) => React.ReactNode
}) => {
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

  const containerRef = useTrackIframe(isIframe)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

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
    if (isIframe) {
      // Add class to body to modify the style of the page on iframe mode
      document.body.classList.add('iframe-mode')
    }
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
        isIframe,
        isIframeOnlySimulation,
        iframeLang,
      }}>
      {children(containerRef)}
    </IframeOptionsContext.Provider>
  )
}
