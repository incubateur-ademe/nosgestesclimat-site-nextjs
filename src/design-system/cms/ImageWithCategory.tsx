import Image from 'next/image'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import Badge from '../layout/Badge'

export default function ImageWithCategory({
  imageSrc,
  imageAlt,
  width = 320,
  height = 240,
  className,
  category,
  hideBadgeOnMobile = true,
}: {
  imageSrc: string
  imageAlt: string
  width?: number | `${number}`
  height?: number | `${number}`
  className?: string
  category: ReactNode | string
  hideBadgeOnMobile?: boolean
}) {
  return (
    <div className="relative min-h-[134px] w-1/3 min-w-28 md:mb-4 md:min-h-[240px] md:w-auto">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={width}
        height={height}
        className={twMerge('h-full w-full rounded-xl object-cover', className)}
      />

      {/* Hidden on mobile */}
      <div
        className={twMerge(
          'absolute left-2 top-2 md:block',
          hideBadgeOnMobile ? 'hidden' : 'block'
        )}>
        <Badge className="inline-block text-xs">{category}</Badge>
      </div>
    </div>
  )
}
