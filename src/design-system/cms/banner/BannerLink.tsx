'use client'

import { trackingBannerClick } from '@/constants/tracking/misc'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function BannerLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <ButtonLink
      onClick={() => {
        trackEvent(trackingBannerClick)
      }}
      size="sm"
      className="!inline-flex border-primary-100 bg-white px-2 py-1 text-primary-800 transition-colors duration-300 hover:border-primary-200 hover:bg-primary-100 hover:text-primary-800"
      href={href}>
      {label}
    </ButtonLink>
  )
}
