'use client'

import { languages } from '@/constants/translation'
import { currentLocale } from 'next-i18n-router'
import NextLink from 'next/link'
import { PropsWithChildren } from 'react'

type Props = {
  href: string
  className?: string
  onClick?: () => void
  title?: string
}

export default function Link({
  children,
  href,
  className,
  onClick,
  title,
}: PropsWithChildren<Props>) {
  const locale = currentLocale()
  const localisedHref = `/${locale !== languages[0] ? `/${locale}` : ''}${href}`

  return (
    <NextLink
      href={localisedHref}
      className={className}
      onClick={onClick}
      title={title}>
      {children}
    </NextLink>
  )
}
