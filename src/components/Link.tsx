'use client'

import { PreventNavigationContext } from '@/app/_components/mainLayoutProviders/PreventNavigationProvider'
import { languages } from '@/constants/translation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import i18nConfig from '@/i18nConfig'
import { useCurrentLocale } from 'next-i18n-router/client'
import NextLink from 'next/link'
import {
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react'

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
  const { t } = useClientTranslation()

  const { shouldPreventNavigation, handleUpdateShouldPreventNavigation } =
    useContext(PreventNavigationContext)

  // If href includes ":" it must be an external link
  const localisedHref = useMemo(() => {
    // We check if it is an external link (it has a protocol)
    if (href?.includes(':')) {
      return href
    }
    return `${locale !== languages[0] ? `/${locale}` : ''}${href}`
  }, [href, locale])

  function preventNavigation(e: React.MouseEvent<HTMLAnchorElement>) {
    if (shouldPreventNavigation) {
      if (
        !window.confirm(
          t(
            'Êtes-vous sûr de vouloir quitter cette page ? Vos modifications seront perdues.'
          )
        )
      ) {
        e.preventDefault()
        e.stopPropagation()
      } else {
        handleUpdateShouldPreventNavigation(false)
        if (onClick) {
          onClick(e)
        }
      }
    }
  }

  return (
    <NextLink
      href={localisedHref}
      className={className}
      onClick={shouldPreventNavigation ? preventNavigation : onClick}
      title={title}
      target={target}
      prefetch={true}
      {...props}>
      {children}
    </NextLink>
  )
}
