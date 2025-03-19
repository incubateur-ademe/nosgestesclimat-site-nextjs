'use client'

import type { BannerType } from '@/adapters/cmsClient'
import { getBanner } from '@/helpers/api/getBanner'
import { useEffect, useState } from 'react'
import ButtonLink from '../inputs/ButtonLink'

export default function Banner() {
  const [banner, setBanner] = useState<BannerType | null>(null)

  useEffect(() => {
    getBanner().then(setBanner)
  }, [])

  if (!banner) return null

  return (
    <div className="inline-flex w-full items-center justify-center bg-primary-600 px-4 py-2 text-sm text-white md:h-12">
      <p className="mb-0 !inline">
        {banner.text}{' '}
        <ButtonLink
          size="sm"
          className="!inline-flex bg-white px-2 py-1 text-primary-800 transition-colors duration-300 hover:bg-primary-100 hover:text-primary-800"
          href={banner.link.url}>
          {banner.link.label}
        </ButtonLink>
      </p>
    </div>
  )
}
