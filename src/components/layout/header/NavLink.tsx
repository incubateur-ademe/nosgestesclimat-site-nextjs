'use client'

import Link from '@/components/Link'
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
        'group relative flex h-full items-center gap-2 px-4 text-sm text-default no-underline transition-colors hover:text-primary-500 lg:text-lg',
        `${
          isActive
            ? activeClassName || 'stroke-primary-500 font-bold text-primary-500'
            : ''
        } ${className}`
      )}
      {...props}>
      {isActive && (
        <span className="absolute bottom-0 left-0 lg:h-[5px] lg:w-full lg:bg-primary-500"></span>
      )}
      {icon && (
        <Icon
          className={twMerge(
            'h-5 w-5 group-hover:stroke-primary-500',
            `${isActive ? 'stroke-primary-500' : ''}`
          )}
        />
      )}
      {children}
    </Tag>
  )
}
