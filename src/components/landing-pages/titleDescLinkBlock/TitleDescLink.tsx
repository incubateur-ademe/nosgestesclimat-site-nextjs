'use client'

import Link from '@/components/Link'
import type { PosthogEventType } from '@/utils/analytics/trackEvent'
import { trackEvents } from '@/utils/analytics/trackEvent'
import type { ReactNode } from 'react'

export default function TitleDescLink({
  href,
  text,
  trackingEvents,
}: {
  href: string
  text: ReactNode
  trackingEvents?: [(string | null)[], PosthogEventType?]
}) {
  return (
    <Link
      className="text-[13px] md:text-base"
      href={href}
      onClick={
        trackingEvents ? () => trackEvents(...trackingEvents) : undefined
      }>
      {text}
    </Link>
  )
}
