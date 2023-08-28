'use client'

import ButtonLink from '@/design-system/inputs/ButtonLink'
import { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
}

export default function NavLink({ href, children }: Props) {
  return (
    <li className='min-w-[84px] w-full md:w-auto'>
      <ButtonLink
        className='flex !w-full flex-col md:flex-row gap-1 py-2 md:py-4 h-full'
        color='text'
        href={href}>
        {children}
      </ButtonLink>
    </li>
  )
}
