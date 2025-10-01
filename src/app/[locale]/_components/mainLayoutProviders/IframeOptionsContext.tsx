'use client'

import { getIsFrenchRegion } from '@/helpers/regions/getIsFrenchRegion'
import { useTrackIframe } from '@/hooks/tracking/useTrackIframe'
import { useIsClient } from '@/hooks/useIsClient'
import { useUser } from '@/publicodes-state'
import { getIsIframe } from '@/utils/getIsIframe'
import { createContext, useEffect, useState } from 'react'

export const IframeOptionsContext = createContext<{
  isIframe?: boolean
  isIframeShareData?: boolean
  iframeRegion?: string | null
  isIframeOnlySimulation?: boolean
  iframeLang?: string | null
  isFrenchRegion?: boolean
}>({})

const nullDecode = (string: string) =>
  string == null ? string : decodeURIComponent(string)

export const IframeOptionsProvider = ({
  children,
}: {
  children: (
    containerRef: React.RefObject<HTMLBodyElement | null>
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
  const [isIframeOnlySimulation, setIsIframeOnlySimulation] = useState(false)
  const [iframeLang, setIframeLang] = useState<string | null>(null)
  const [iframeRegion, setIframeRegion] = useState<string | null>(null)

  const containerRef = useTrackIframe(isIframe)

  useEffect(() => {
    if (isIframe) return

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

    if (!isIframeShareData) {
      setIsIframeShareData(Boolean(urlParams.get('shareData')))
    }

    if (!isIframeOnlySimulation) {
      setIsIframeOnlySimulation(Boolean(urlParams.get('onlySimulation')))
    }

    if (!iframeRegion) {
      setIframeRegion(urlParams.get('region'))
    }

    if (!iframeLang) {
      setIframeLang(urlParams.get('lang'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const { user } = useUser()

  const regionCode = user?.region?.code

  const isFrenchRegion = getIsFrenchRegion({
    isIframe,
    iframeRegion: regionCode,
  })

  return (
    <IframeOptionsContext.Provider
      value={{
        ...iframeIntegratorOptions,
        isIframeShareData,
        iframeRegion: regionCode,
        isIframe,
        isIframeOnlySimulation,
        iframeLang,
        isFrenchRegion,
      }}>
      {children(containerRef)}
    </IframeOptionsContext.Provider>
  )
}
