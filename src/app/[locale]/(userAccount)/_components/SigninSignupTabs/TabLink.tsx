'use client'

import {
  captureClickTab,
  tabTrackEvent,
} from '@/constants/tracking/pages/signin'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import Link from 'next/link'
import type { MouseEvent } from 'react'

export default function TabLink({
  href,
  isActive,
  children,
  onClick,
  tab,
  ...props
}: {
  href: string
  isActive: boolean
  children: React.ReactNode
  tab: 'connexion' | 'inscription'
} & React.HTMLAttributes<HTMLAnchorElement>) {
  const baseClasses =
    'inline-block px-4 py-3 text-lg border-b-3 border-transparent'
  const activeClasses =
    'font-bold px-4 py-3 border-primary-600! border-current text-primary-600'

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Track events if not active
    if (!isActive) {
      trackEvent(tabTrackEvent(tab))
      trackPosthogEvent(captureClickTab({ tab }))
    }

    // Call original onClick if provided
    if (onClick) {
      onClick(e)
    }
  }

  if (isActive) {
    return (
      <span
        aria-current="page"
        className={`${baseClasses} ${activeClasses}`}
        {...props}>
        {children}
      </span>
    )
  }
  return (
    <Link href={href} className={baseClasses} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
