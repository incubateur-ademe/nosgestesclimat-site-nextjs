'use client'

import { getSearchParamsClientSide } from '@/helpers/getSearchParamsClientSide'
import { verifyIfIntegratorBypassRights } from '@/helpers/iframe/verifyIntegratorBypassRights'
import { getIsFrenchRegion } from '@/helpers/regions/getIsFrenchRegion'
import { useTrackIframe } from '@/hooks/tracking/useTrackIframe'
import { useUser } from '@/publicodes-state'
import { getIsIframe } from '@/utils/getIsIframe'
import * as Sentry from '@sentry/nextjs'
import { createContext, useEffect, useState } from 'react'

const getIsAllowedToBypassConsentDataShare = () => {
  if (typeof window === 'undefined') return false
  // https://stackoverflow.com/questions/6531534/document-location-parent-location-can-they-be-blocked

  const windowLocation = window.location
  const windowParentLocation = window.parent.location

  if (!windowLocation) {
    console.error('Iframe Nos Gestes Climat: window.location is undefined')
    Sentry.captureMessage(
      `Iframe Nos Gestes Climat: window.location is undefined`
    )
  }

  if (!windowParentLocation) {
    console.error(
      'Iframe Nos Gestes Climat: window.parent.location is undefined'
    )
    Sentry.captureMessage(
      `Iframe Nos Gestes Climat: window.parent.location is undefined`
    )
  }

  const integratorUrl = new URL(
    window.location != window.parent.location
      ? (document.referrer ?? 'about:blank')
      : (document.location.href ?? 'about:blank')
  ).origin

  return verifyIfIntegratorBypassRights(integratorUrl)
}

export const IframeOptionsContext = createContext<{
  isIframe?: boolean
  isIframeShareData?: boolean
  iframeRegion?: string | null
  isIframeOnlySimulation?: boolean
  isIntegratorAllowedToBypassConsentDataShare?: boolean
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
  const searchParams = getSearchParamsClientSide()

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

  const isAllowedToBypassConsentDataShare =
    getIsAllowedToBypassConsentDataShare()

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
        isIframeShareData: isIframe && isIframeShareData,
        iframeRegion: regionCode,
        isIframe,
        isIframeOnlySimulation,
        isIntegratorAllowedToBypassConsentDataShare:
          isAllowedToBypassConsentDataShare,
        iframeLang,
        isFrenchRegion,
        containerRef,
      }}>
      {children(containerRef ?? { current: null })}
    </IframeOptionsContext.Provider>
  )
}
