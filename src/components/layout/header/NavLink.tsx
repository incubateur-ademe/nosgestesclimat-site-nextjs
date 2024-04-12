'use client'

import Link from '@/components/Link'
import ColorLine from '@/design-system/layout/ColorLine'
import DefaultLink from 'next/link'
import { usePathname } from 'next/navigation'
import { HTMLAttributes, JSX, PropsWithChildren } from 'react'
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
        'group relative -mb-[1px] flex h-full items-center gap-2 px-3 text-sm text-default no-underline transition-colors hover:text-primary-900 md:text-base',
        `${
          isActive ? activeClassName || 'font-bold text-primary-800' : ''
        } ${className}`
      )}
      {...props}>
      {isActive && (
        <ColorLine className="absolute bottom-0 left-0 rounded-full bg-primary-700 lg:h-[4px] lg:w-full" />
      )}

      {icon && (
        <Icon
          className={twMerge(
            'h-5 w-5 group-hover:fill-primary-800 group-hover:!stroke-primary-800',
            `${isActive ? 'fill-primary-800 stroke-primary-800' : ''}`
          )}
        />
      )}

      {children}
    </Tag>
  )
}
