'use client'

import { PreventNavigationContext } from '@/app/[locale]/_components/mainLayoutProviders/PreventNavigationProvider'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import NextLink from 'next/link'
import type {
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
} from 'react'
import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
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
  const { t } = useClientTranslation()

  const { shouldPreventNavigation, handleUpdateShouldPreventNavigation } =
    useContext(PreventNavigationContext)

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
      href={href}
      className={twMerge(
        'text-primary-700 hover:text-primary-800 break-words underline transition-colors',
        className
      )}
      onClick={shouldPreventNavigation ? preventNavigation : onClick}
      title={title}
      target={target}
      prefetch={true}
      {...props}>
      {children}
    </NextLink>
  )
}
