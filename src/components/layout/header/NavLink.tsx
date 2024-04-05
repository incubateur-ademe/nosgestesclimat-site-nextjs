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
        'group relative flex h-full items-center gap-2 px-4 text-sm text-default no-underline transition-colors hover:text-primary-700 md:text-base',
        `${
          isActive
            ? activeClassName || 'stroke-primary-700 font-bold text-primary-700'
            : ''
        } ${className}`
      )}
      {...props}>
      {isActive && (
        <span className="absolute bottom-0 left-0 lg:h-[5px] lg:w-full lg:bg-primary-700"></span>
      )}

      {icon && (
        <Icon
          className={twMerge(
            'h-5 w-5 group-hover:stroke-primary-700',
            `${isActive ? 'stroke-primary-700 stroke-2' : ''}`
          )}
        />
      )}

      {children}
    </Tag>
  )
}
