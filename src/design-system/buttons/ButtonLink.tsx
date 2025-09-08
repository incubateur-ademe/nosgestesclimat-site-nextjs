'use client'

import Link from '@/components/Link'
import type { ButtonSize } from '@/types/values'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type {
  HtmlHTMLAttributes,
  KeyboardEvent,
  PropsWithChildren,
} from 'react'
import { twMerge } from 'tailwind-merge'
import { baseClassNames, colorClassNames, sizeClassNames } from './Button'

type Props = {
  href: string
  className?: string
  color?: 'primary' | 'secondary' | 'text' | 'success'
  size?: ButtonSize
  title?: string
  onClick?: () => void
  onKeyDown?: (e: KeyboardEvent<HTMLAnchorElement>) => void
  trackingEvent?: (string | null)[]
  target?: string
  shouldUseUnlocalizedHref?: boolean
}

export default function ButtonLink({
  href,
  children,
  className = '',
  color = 'primary',
  size = 'md',
  title,
  onClick,
  onKeyDown,
  trackingEvent,
  target = '_self',
  shouldUseUnlocalizedHref,
  ...props
}: PropsWithChildren<Props & HtmlHTMLAttributes<HTMLAnchorElement>>) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        if (onClick) {
          onClick(e)
        }
        if (trackingEvent) {
          trackEvent(trackingEvent)
        }
      }}
      onKeyDown={(e) => {
        if (onKeyDown) {
          onKeyDown(e)
        }

        if (trackingEvent) {
          trackEvent(trackingEvent)
        }
      }}
      title={title}
      className={twMerge(
        `${baseClassNames} ${sizeClassNames[size]} ${colorClassNames[color]}`,
        className
      )}
      target={target}
      shouldUseUnlocalizedHref={shouldUseUnlocalizedHref}
      {...props}>
      {children}
    </Link>
  )
}
