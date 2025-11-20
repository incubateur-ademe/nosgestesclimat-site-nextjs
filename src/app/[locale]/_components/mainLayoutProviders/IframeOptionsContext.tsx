'use client'

import { getIsFrenchRegion } from '@/helpers/regions/getIsFrenchRegion'
import { useTrackIframe } from '@/hooks/tracking/useTrackIframe'
import { useUser } from '@/publicodes-state'
import { getIsIframe } from '@/utils/getIsIframe'
import { useSearchParams } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'

export const IframeOptionsContext = createContext<{
  isIframe?: boolean
  isIframeShareData?: boolean
  iframeRegion?: string | null
  isIframeOnlySimulation?: boolean
  iframeLang?: string | null
  isFrenchRegion?: boolean
  containerRef?: React.RefObject<HTMLDivElement | null>
}>({})

export const IframeOptionsProvider = ({
  children,
}: {
  children: (
    containerRef: React.RefObject<HTMLDivElement | null>
  ) => React.ReactNode
}) => {
  const searchParams = useSearchParams()
  const { user } = useUser()

  // Detect iframe mode using window check
  const isIframe = getIsIframe()

  const [isIframeShareData, setIsIframeShareData] = useState(false)
  const [isIframeOnlySimulation, setIsIframeOnlySimulation] = useState(false)
  const [iframeLang, setIframeLang] = useState<string | null>(null)
  const [iframeRegion, setIframeRegion] = useState<string | null>(null)

  const containerRef = useTrackIframe(isIframe)

  // Read iframe parameters from URL
  useEffect(() => {
    if (!isIframe) return

    if (!isIframeShareData) {
      setIsIframeShareData(Boolean(searchParams.get('shareData')))
    }

    if (!isIframeOnlySimulation) {
      setIsIframeOnlySimulation(Boolean(searchParams.get('onlySimulation')))
    }

    if (!iframeRegion) {
      setIframeRegion(searchParams.get('region'))
    }

    if (!iframeLang) {
      setIframeLang(searchParams.get('lang'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIframe, searchParams])

  // Add body classes for iframe styling
  useEffect(() => {
    if (isIframe) {
      document.body.classList.add('iframe-mode')
    }
  }, [isIframe])

  useEffect(() => {
    if (isIframeOnlySimulation) {
      document.body.classList.add('iframeOnlySimulation')
    }
  }, [isIframeOnlySimulation])

  const regionCode = user?.region?.code

  const isFrenchRegion = getIsFrenchRegion({
    isIframe: isIframe ?? false,
    iframeRegion: regionCode,
  })

  return (
    <IframeOptionsContext.Provider
      value={{
        isIframeShareData,
        iframeRegion: regionCode,
        isIframe,
        isIframeOnlySimulation,
        iframeLang,
        isFrenchRegion,
        containerRef,
      }}>
      {children(containerRef ?? { current: null })}
    </IframeOptionsContext.Provider>
  )
}
