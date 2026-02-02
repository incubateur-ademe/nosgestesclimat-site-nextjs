'use client'

import { useIframe } from '@/hooks/useIframe'
import type { PropsWithChildren } from 'react'

export default function HideInIframe({ children }: PropsWithChildren) {
  const { isIframeOnlySimulation } = useIframe()

  if (isIframeOnlySimulation) return null

  return children
}
