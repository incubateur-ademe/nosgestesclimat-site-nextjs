'use client'

import { cn } from '@/lib/utils'
import type { ButtonSize } from '@/types/values'
import { trackMatomoEvent__deprecated } from '@/utils/analytics/trackEvent'
import type {
  HtmlHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
} from 'react'
import { buttonVariants } from './buttonStyles'

interface Props {
  href: string
  className?: string
  color?: 'primary' | 'secondary' | 'text' | 'success'
  size?: ButtonSize
  title?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  onKeyDown?: (e: KeyboardEvent<HTMLAnchorElement>) => void
  trackingEvent?: (string | null)[]
  target?: string
}

export default function ButtonAnchor({
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
  ...props
}: PropsWithChildren<Props & HtmlHTMLAttributes<HTMLAnchorElement>>) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          onClick(e)
        }
        if (trackingEvent) {
          trackMatomoEvent__deprecated(trackingEvent)
        }
      }}
      onKeyDown={(e) => {
        if (onKeyDown) {
          onKeyDown(e)
        }

        if (trackingEvent) {
          trackMatomoEvent__deprecated(trackingEvent)
        }
      }}
      title={title}
      className={cn(buttonVariants({ color, size }), className)}
      target={target}
      {...props}>
      {children}
    </a>
  )
}
