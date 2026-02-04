'use client'

import Link from '@/components/Link'
import type { ReactNode } from 'react'

export default function TitleDescLink({
  href,
  text,
  onClick,
}: {
  href: string
  text: ReactNode
  onClick?: () => void
}) {
  return (
    <Link
      className="text-[13px] md:text-base"
      href={href}
      onClick={onClick ? onClick : undefined}>
      {text}
    </Link>
  )
}
