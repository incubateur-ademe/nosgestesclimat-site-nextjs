'use client'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import { usePathname } from 'next/navigation'
import { HTMLAttributes, ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
}

export default function NavLink({
  href,
  children,
  className,
}: Props & HTMLAttributes<HTMLAnchorElement>) {
  const pathName = usePathname()
  const isActive = pathName.includes(href)

  return (
    <li className="w-full sm:min-w-[84px] md:w-auto">
      <ButtonLink
        className={`flex h-full !w-full flex-col gap-1 py-2 focus-within:z-10 lg:flex-row lg:py-4 ${
          isActive ? ' !bg-primaryLight' : ''
        } ${className}`}
        href={href}
        color="text">
        {children}
      </ButtonLink>
    </li>
  )
}
