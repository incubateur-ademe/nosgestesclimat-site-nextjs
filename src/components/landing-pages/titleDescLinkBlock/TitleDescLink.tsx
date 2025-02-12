'use client'

import { StyledLink } from '@/components/links/StyledLink'
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
    <StyledLink
      className="text-[13px] md:text-base"
      href={href}
      onClick={() => trackingEvent && trackEvent(trackingEvent)}>
      {text}
    </StyledLink>
  )
}
