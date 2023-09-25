'use client'

import { useIsClient } from '@/app/_components/IsClientCtxProvider'
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
  console.log({ isIframe })

  return (
    <main
      className={`flex flex-col ${maxWidthClass} ${className} ${
        isIframe ? '' : 'min-h-[calc(100vh-2rem)]'
      }`}>
      {children}
    </main>
  )
}
