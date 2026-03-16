'use client'

import { shouldHideIfIframe } from '@/helpers/iframe/shouldHideIfIframe'
import { useIframe } from '@/hooks/useIframe'
import type { PropsWithChildren } from 'react'

interface Props {
  hideIfNotFrenchRegion?: boolean
}

export default function HideInIframe({
  children,
  hideIfNotFrenchRegion = false,
}: PropsWithChildren<Props>) {
  const { isIframeOnlySimulation, isFrenchRegion, isIframe } = useIframe()

  const shouldHideChildren = shouldHideIfIframe({
    isIframe,
    isFrenchRegion,
    isIframeOnlySimulation,
    hideIfNotFrenchRegion,
  })

  if (shouldHideChildren) return null

  return children
}
