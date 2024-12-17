'use client'

import Trans from '@/components/translation/Trans'
import { trackEvent } from '@/utils/matomo/trackEvent'
import type { ReactNode } from 'react'
import ImageWithCategory from './ImageWithCategory'

export default function PostThumbnail({
  title,
  category,
  imageSrc,
  imageAlt,
  href,
  trackingEvent,
}: {
  title: ReactNode
  category: ReactNode
  imageSrc: string
  imageAlt: string
  href: string
  trackingEvent: string[]
}) {
  return (
    <a
      href={href}
      className="flex rounded-xl bg-white !no-underline !duration-500 md:flex-col md:transition-transform md:hover:translate-y-[-6px]"
      onClick={() => trackEvent(trackingEvent)}>
      <ImageWithCategory
        category={category}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        imageClassName="min-h-[134px] w-1/3 min-w-28 md:min-h-[240px] md:w-full"
        containerClassName="w-1/3 md:w-full"
      />

      <div className="mt-4 flex w-full flex-col">
        {/* Hidden on desktop */}
        <p className="mb-2 px-4 pt-4 text-xs font-bold text-primary-700 md:hidden md:text-[13px]">
          {category}
        </p>

        <h3 className="mb-2 pl-4 pr-2 text-[13px] font-normal text-default !no-underline md:px-4 md:text-base">
          {title}
        </h3>

        <div className="cursor-pointer p-4 pt-0 text-left text-[13px] text-primary-700 underline md:text-right md:text-base">
          <Trans>Lire la suite</Trans>
        </div>
      </div>
    </a>
  )
}
