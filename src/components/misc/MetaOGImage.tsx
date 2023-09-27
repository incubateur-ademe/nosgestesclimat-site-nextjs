'use client'

import { useIsClient } from '@/app/_components/IsClientCtxProvider'
import { generateOGImageURL } from '@/helpers/openGraph/generateOGImageURL'
import Head from 'next/head'

export default function MetaOGImage() {
  const isClient = useIsClient()

  console.log(
    generateOGImageURL(isClient ? window.location.href : '') ??
      'https://nosgestesclimat.vercel.app/images/misc/dessin-nosgestesclimat.png'
  )

  return (
    <Head>
      <meta
        property="og:image"
        content={
          generateOGImageURL(isClient ? window.location.href : '') ??
          'https://nosgestesclimat.vercel.app/images/misc/dessin-nosgestesclimat.png'
        }
      />
    </Head>
  )
}
