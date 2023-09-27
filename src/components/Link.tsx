'use client'

import { i18nConfig } from '@/constants/i18n'
import { getLocalisedURL } from '@/helpers/localisation/getLocalisedURL'
import { useCurrentLocale } from 'next-i18n-router/client'
import NextLink from 'next/link'
import { HTMLAttributes, MouseEventHandler, PropsWithChildren } from 'react'

type Props = {
  href: string
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
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

  // If href includes ":" it must be an external link
  const localisedHref = href.includes(':')
    ? href
    : getLocalisedURL({ href, locale: locale || 'fr' })

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
