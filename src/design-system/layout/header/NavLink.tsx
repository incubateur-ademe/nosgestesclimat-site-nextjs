'use client'

import Link from '@/components/Link'
import DefaultLink from 'next/link'
import { usePathname } from 'next/navigation'
import { JSX, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  href: string
  shouldUseDefaultLink?: boolean
  // Active on the landing page
  isBasePathActive?: boolean
  activeMatches?: string[]
  icon?: ({ className }: { className?: string }) => JSX.Element
}

export default function NavLink({
  children,
  href,
  icon,
  activeMatches,
  shouldUseDefaultLink = false,
  // Active on the landing page
  isBasePathActive = false,
}: PropsWithChildren<Props>) {
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
      className={twMerge(
        'text-default group relative flex h-full items-center gap-2 px-2 pb-2 text-lg no-underline transition-colors hover:text-primary',
        `${isActive ? 'stroke-primary font-bold text-primary' : ''}`
      )}>
      {isActive && (
        <span className="absolute bottom-0 left-0 h-[4px] w-full bg-primary"></span>
      )}
      {icon && (
        <Icon
          className={twMerge(
            'h-5 w-5 group-hover:stroke-primary',
            `${isActive ? 'stroke-primary' : ''}`
          )}
        />
      )}
      {children}
    </Tag>
  )
}
