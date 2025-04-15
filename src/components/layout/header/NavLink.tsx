'use client'

import Link from '@/components/Link'
import ColorLine from '@/design-system/layout/ColorLine'
import DefaultLink from 'next/link'
import { usePathname } from 'next/navigation'
import type { HTMLAttributes, JSX, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  href: string
  shouldUseDefaultLink?: boolean
  activeMatches?: string[]
  icon?: ({ className }: { className?: string }) => JSX.Element
  onClick?: () => void
  className?: string
  activeClassName?: string
}

export default function NavLink({
  children,
  href,
  icon,
  activeMatches,
  shouldUseDefaultLink = false,
  onClick,
  className,
  activeClassName,
  ...props
}: PropsWithChildren<Props> & HTMLAttributes<HTMLAnchorElement>) {
  const pathName = usePathname()

  const isActive =
    activeMatches?.some((matchString) => pathName.includes(matchString)) ||
    pathName.includes(href)

  const Tag = shouldUseDefaultLink ? DefaultLink : Link

  const Icon = icon || (() => null)

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={twMerge(
        'group text-default hover:text-primary-900 relative -mb-[1px] flex h-full items-center gap-2 px-3 text-sm no-underline transition-colors md:text-base',
        `${
          isActive ? activeClassName || 'text-primary-800 font-bold' : ''
        } ${className}`
      )}
      {...props}>
      {isActive && (
        <ColorLine className="bg-primary-700 absolute bottom-0 left-0 rounded-full lg:h-[4px] lg:w-full" />
      )}

      {icon && (
        <Icon
          className={twMerge(
            'group-hover:fill-primary-800 group-hover:stroke-primary-800! h-5 w-5',
            `${isActive ? 'fill-primary-800 stroke-primary-800' : ''}`
          )}
        />
      )}

      {children}
    </Tag>
  )
}
