'use client'

import Link from '@/components/Link'
import { trackEvent } from '@/utils/matomo/trackEvent'
import type { ReactNode } from 'react'

export default function TitleDescLink({
  href,
  text,
  trackingEvent,
}: {
  href: string
  text: ReactNode
  trackingEvent?: string[]
}) {
  return (
    <Link
      className="text-[13px] md:text-base"
      href={href}
      onClick={() => trackingEvent && trackEvent(trackingEvent)}>
      {text}
    </Link>
  )
}
