'use client'

import { useIsClient } from '@/app/_components/IsClientCtxProvider'
import Head from 'next/head'

type PropType = {
  title: string
  description: string
}

/**
 * Careful, this component only adds the meta tags other than the image.
 * Use MetaOGImage for the image.
 * @param param0
 * @returns
 */
export default function MetaOpenGraph({ title, description }: PropType) {
  const isClient = useIsClient()
  return (
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="og:url"
        content={isClient ? window.location.href : 'https://nosgestesclimat.fr'}
      />
    </Head>
  )
}
