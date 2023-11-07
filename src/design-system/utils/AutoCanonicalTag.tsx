'use client'

import { useIsClient } from '@/hooks/useIsClient'
import Head from 'next/head'

export default function AutoCanonicalTag({
  overrideHref,
}: {
  overrideHref?: string
}) {
  const isClient = useIsClient()

  if (!isClient) return null

  return (
    <Head>
      <link
        rel="canonical"
        href={
          overrideHref ?? `${window.location.origin}${window.location.pathname}`
        }
      />
    </Head>
  )
}
