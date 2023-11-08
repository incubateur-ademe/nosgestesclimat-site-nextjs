'use client'

import Link from '@/components/Link'
import DefaultLink from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export default function NavLink({
  children,
  href,
  shouldUseDefaultLink = false,
}: PropsWithChildren<{ href: string; shouldUseDefaultLink?: boolean }>) {
  const pathName = usePathname()

  const isActive = pathName.includes(href)

  const Tag = shouldUseDefaultLink ? DefaultLink : Link

  return (
    <Tag
      href={href}
      className={twMerge(
        'text-default group flex items-center gap-2 pb-2 no-underline transition-colors hover:text-primary',
        `${
          isActive
            ? 'border-b-[3px] border-primary stroke-primary text-primary'
            : ''
        }`
      )}>
      {children}
    </Tag>
  )
}
