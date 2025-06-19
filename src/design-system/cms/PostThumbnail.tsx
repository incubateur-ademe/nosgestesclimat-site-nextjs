'use client'

import Trans from '@/components/translation/trans/TransClient'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import ImageWithCategory from './ImageWithCategory'

export default function PostThumbnail({
  title,
  category,
  imageSrc,
  imageAlt,
  href,
  trackingEvent,
  className,
}: {
  title: ReactNode
  category: ReactNode
  imageSrc: string
  imageAlt: string
  href: string
  trackingEvent: string[]
  className?: string
}) {
  return (
    <a
      href={href}
      className={twMerge(
        'flex h-full rounded-xl no-underline! duration-300! md:flex-col md:transition-transform md:hover:translate-y-[-6px]',
        className
      )}
      onClick={trackingEvent ? () => trackEvent(trackingEvent) : undefined}>
      <ImageWithCategory
        category={category}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        imageClassName="min-h-[134px] w-1/3 min-w-28 md:h-[240px] md:w-full"
        containerClassName="w-1/3 md:w-full"
      />

      <div className="mt-4 flex w-full flex-col md:flex-1">
        {/* Hidden on desktop */}
        <p className="text-primary-700 mb-2 px-4 text-xs font-bold md:hidden md:pt-4 md:text-[13px]">
          {category}
        </p>

        <h3 className="text-default mb-auto pr-2 pl-4 text-[13px] font-normal no-underline! md:mb-2 md:px-4 md:text-base">
          {title}
        </h3>

        <div className="text-primary-700 mt-auto cursor-pointer p-4 pt-0 text-left text-[13px] underline md:text-right md:text-base">
          <Trans>Lire la suite</Trans>
        </div>
      </div>
    </a>
  )
}
