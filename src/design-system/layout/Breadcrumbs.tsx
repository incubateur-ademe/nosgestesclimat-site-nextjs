'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { breadcrumbClickLink } from '@/constants/tracking/layout'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { Fragment, type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Breadcrumbs({
  items,
  className,
  linkClassName,
}: {
  items: {
    href: string
    label: string | ReactNode
    isActive?: boolean
    isDisabled?: boolean
  }[]
  className?: string
  linkClassName?: string
}) {
  const { t } = useClientTranslation()

  return (
    <section className={twMerge('h-[75px] w-full', className)}>
      <nav
        id="breadcrumbs-navigation"
        aria-label={t('Chemin de navigation')}
        aria-labelledby="breadcrumbs-title"
        className="h-full w-full">
        <p id="breadcrumbs-title" className="sr-only">
          <Trans>Chemin de navigation</Trans>
        </p>
        <ul className="mx-auto flex h-full w-full items-center gap-4 overflow-x-scroll sm:overflow-x-hidden">
          {items.map(({ href, label, isActive, isDisabled }, index) => (
            <Fragment key={`breadcrumb-item-${index}`}>
              <li>
                <Link
                  onClick={(e) => {
                    if (isDisabled) {
                      e.preventDefault()
                    }
                    trackEvent(breadcrumbClickLink(href))
                  }}
                  aria-current={isActive}
                  className={twMerge(
                    'text-primary-700 hover:text-primary-700 max-w-full text-sm text-ellipsis whitespace-nowrap capitalize hover:underline',
                    isActive
                      ? 'text-default hover:text-default cursor-default no-underline hover:no-underline'
                      : '',
                    isDisabled ? 'cursor-default' : '',
                    linkClassName
                  )}
                  href={href}>
                  {label}
                </Link>
              </li>

              {index < items.length - 1 && (
                <svg
                  className="h-4 w-4 rotate-[-90deg] text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label={t('icons.breadcrumbs.ariaLabel', "Fil d'Ariane")}>
                  <path
                    clipRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    fillRule="evenodd"
                  />
                </svg>
              )}
            </Fragment>
          ))}
        </ul>
      </nav>
    </section>
  )
}
