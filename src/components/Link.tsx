'use client'

import { i18nConfig } from '@/constants/i18n'
import { languages } from '@/constants/translation'
import { useCurrentLocale } from 'next-i18n-router/client'
import NextLink from 'next/link'
import { HTMLAttributes, PropsWithChildren } from 'react'

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
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLAnchorElement> & Props>) {
  const locale = useCurrentLocale(i18nConfig)

  const localisedHref = `${locale !== languages[0] ? `/${locale}` : ''}${href}`

  return (
    <NextLink
      href={localisedHref}
      className={className}
      onClick={onClick}
      title={title}
      target={target}
      prefetch={true}
      {...props}>
      {children}
    </NextLink>
  )
}
