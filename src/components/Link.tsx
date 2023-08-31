'use client'

import { languages } from '@/constants/translation'
import NextLink from 'next/link'
import { PropsWithChildren } from 'react'

type Props = {
  href: string
  className?: string
  onClick?: () => void
  title?: string
  target?: string
}

export default function Link({
  children,
  href,
  className,
  onClick,
  title,
  target,
}: PropsWithChildren<Props>) {
  const locale = 'fr'

  const localisedHref = `${locale !== languages[0] ? `/${locale}` : ''}${href}`

  return (
    <NextLink
      href={localisedHref}
      className={className}
      onClick={onClick}
      title={title}
      target={target}>
      {children}
    </NextLink>
  )
}
