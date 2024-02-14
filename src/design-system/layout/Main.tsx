'use client'

import { useIsClient } from '@/hooks/useIsClient'
import { getIsIframe } from '@/utils/getIsIframe'
import { PropsWithChildren } from 'react'

export default function Main({
  children,
  maxWidth,
  className,
}: PropsWithChildren<{ maxWidth?: string; className?: string }>) {
  const maxWidthClass = maxWidth ? `max-w-${maxWidth} mx-auto` : ''

  const isClient = useIsClient()

  const isIframe = isClient && getIsIframe()

  return (
    <main
      className={`flex flex-col overflow-hidden ${maxWidthClass} ${className} ${
        isIframe ? '' : 'min-h-[calc(100vh-2rem)]'
      }`}>
      {children}
    </main>
  )
}
