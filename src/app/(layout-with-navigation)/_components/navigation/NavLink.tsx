'use client'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
}

export default function NavLink({ href, children }: Props) {
  return (
    <li className="w-full min-w-[84px] lg:w-auto">
      <ButtonLink
        className="flex h-full !w-full flex-col gap-1 py-2 lg:flex-row lg:py-4"
        color="text"
        href={href}>
        {children}
      </ButtonLink>
    </li>
  )
}
