'use client'

import { useIframe } from '@/hooks/useIframe'
import type { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export default function FooterClientShell({ children }: Props) {
  const { isIframeOnlySimulation } = useIframe()

  if (isIframeOnlySimulation) return null

  return children
}
