'use client'

import Link from '@/components/Link'
import { cn } from '@/lib/utils'
import type { ButtonSize } from '@/types/values'
import { trackMatomoEvent__deprecated } from '@/utils/analytics/trackEvent'
import {
  type HtmlHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type PropsWithChildren,
} from 'react'
import Loader from '../layout/Loader'
import { buttonVariants, loaderColorMap } from './buttonStyles'
import type { ButtonColor } from './Button'
import { useButtonState } from './useButtonState'

interface Props {
  href: string
  className?: string
  color?: ButtonColor
  size?: ButtonSize
  title?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  onKeyDown?: (e: KeyboardEvent<HTMLAnchorElement>) => void
  trackingEvent?: (string | null)[]
  target?: string
  scroll?: boolean
  loading?: boolean
  disabled?: boolean
  showLoadingOnClick?: boolean
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
  scroll = true,
  loading,
  disabled,
  showLoadingOnClick = false,
  ...props
}: PropsWithChildren<Props & HtmlHTMLAttributes<HTMLAnchorElement>>) {
  const { isDisabled, showLoader, clickOnce } = useButtonState({
    disabled,
    loading,
    showLoadingOnClick,
  })

  return (
    <Link
      scroll={scroll}
      href={href}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault()
          return
        }

        // Auto-disable link after click
        if (showLoadingOnClick) clickOnce()

        if (onClick) {
          onClick(e)
        }
        if (trackingEvent) {
          trackMatomoEvent__deprecated(trackingEvent)
        }
      }}
      onKeyDown={(e) => {
        if (isDisabled) {
          return
        }
        if (onKeyDown) {
          onKeyDown(e)
        }

        if (trackingEvent) {
          trackMatomoEvent__deprecated(trackingEvent)
        }
      }}
      title={title}
      aria-disabled={isDisabled}
      className={cn(
        buttonVariants({ color, size }),
        isDisabled && 'cursor-not-allowed opacity-50!',
        className
      )}
      target={target}
      {...props}>
      {showLoader && (
        <Loader size="sm" color={loaderColorMap[color]} className="mr-2" />
      )}
      {children}
    </Link>
  )
}
