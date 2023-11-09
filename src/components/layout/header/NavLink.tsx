'use client'

import Link from '@/components/Link'
import DefaultLink from 'next/link'
import { usePathname } from 'next/navigation'
import { HTMLAttributes, JSX, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  href: string
  shouldUseDefaultLink?: boolean
  // Active on the landing page
  isBasePathActive?: boolean
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
  // Active on the landing page
  isBasePathActive = false,
  onClick,
  className,
  activeClassName,
  ...props
}: PropsWithChildren<Props> & HTMLAttributes<HTMLAnchorElement>) {
  const pathName = usePathname()

  const isActive =
    (pathName === '/' && isBasePathActive) ||
    activeMatches?.some((matchString) => pathName.includes(matchString)) ||
    pathName.includes(href)

  const Tag = shouldUseDefaultLink ? DefaultLink : Link

  const Icon = icon || (() => null)

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={twMerge(
        'hover:text-primary-500 group relative flex h-full items-center gap-2 px-4 text-sm text-default no-underline transition-colors lg:text-lg',
        `${
          isActive
            ? activeClassName || 'stroke-primary-500 text-primary-500 font-bold'
            : ''
        } ${className}`
      )}
      {...props}>
      {isActive && (
        <span className="lg:bg-primary-500 absolute bottom-0 left-0 lg:h-[5px] lg:w-full"></span>
      )}
      {icon && (
        <Icon
          className={twMerge(
            'group-hover:stroke-primary-500 h-5 w-5',
            `${isActive ? 'stroke-primary-500' : ''}`
          )}
        />
      )}
      {children}
    </Tag>
  )
}
