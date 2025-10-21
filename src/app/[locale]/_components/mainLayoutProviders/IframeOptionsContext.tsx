'use client'

import { getIsFrenchRegion } from '@/helpers/regions/getIsFrenchRegion'
import { useUser } from '@/publicodes-state'
import { createContext, useContext } from 'react'
import { IframeStaticContext } from '../IframeStaticProvider'

export const IframeOptionsContext = createContext<{
  isIframe?: boolean
  isIframeShareData?: boolean
  iframeRegion?: string | null
  isIframeOnlySimulation?: boolean
  iframeLang?: string | null
  isFrenchRegion?: boolean
  integratorLogo?: string | null
  integratorName?: string | null
  integratorActionUrl?: string | null
  integratorYoutubeVideo?: string | null
  integratorActionText?: string | null
}>({})

export const IframeOptionsProvider = ({
  children,
}: {
  children: (
    containerRef: React.RefObject<HTMLDivElement | null>
  ) => React.ReactNode
}) => {
  const staticContext = useContext(IframeStaticContext)
  const { user } = useUser()

  const regionCode = user?.region?.code

  const isFrenchRegion = getIsFrenchRegion({
    isIframe: staticContext.isIframe ?? false,
    iframeRegion: regionCode,
  })

  return (
    <IframeOptionsContext.Provider
      value={{
        ...staticContext,
        isFrenchRegion,
      }}>
      {children(staticContext.containerRef ?? { current: null })}
    </IframeOptionsContext.Provider>
  )
}
