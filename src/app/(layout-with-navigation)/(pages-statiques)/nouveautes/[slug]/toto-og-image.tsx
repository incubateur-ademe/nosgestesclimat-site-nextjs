'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { getCurrentLangInfos } from '@/locales/translation'
import Image from 'next/image'
import { ImageResponse } from 'next/server'
import { extractImageSrc } from '../_helpers/extractImage'
import { slugifyString } from '../_helpers/slugifyString'
import { sortReleases } from '../_helpers/sortReleases'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default function OpenGraphImage({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const { i18n } = useClientTranslation()

  const currentLangInfos = getCurrentLangInfos(i18n)

  const data = sortReleases(currentLangInfos.releases)

  const selectedReleaseIndex = data.findIndex(
    ({ name }) => encodeURI(slugifyString(name)) === slug
  )

  const body = data[selectedReleaseIndex]?.body

  const image = extractImageSrc(body)

  return new ImageResponse(
    <Image src={image} alt="Article image" width={100} height={100} />,
    // ImageResponse options
    {
      ...size,
    }
  )
}
