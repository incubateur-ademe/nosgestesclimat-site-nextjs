'use client'

import Link from '@/components/Link'
import { breadcrumbClickLink } from '@/constants/tracking/layout'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Breadcrumbs({
  items,
  className,
  linkClassName,
}: {
  items: {
    href: string
    label: string | JSX.Element
    isActive?: boolean
    isDisabled?: boolean
  }[]
  className?: string
  linkClassName?: string
}) {
  return (
    <section className={twMerge('h-[75px] w-full', className)}>
      <nav className="mx-auto flex h-full w-full items-center gap-4 overflow-x-scroll sm:overflow-x-hidden">
        {items.map(({ href, label, isActive, isDisabled }, index) => (
          <Fragment key={`breadcrumb-item-${index}`}>
            <Link
              onClick={(e) => {
                if (isDisabled) {
                  e.preventDefault()
                }
                trackEvent(breadcrumbClickLink)
              }}
              aria-current={isActive}
              className={twMerge(
                'max-w-full text-ellipsis whitespace-nowrap text-sm capitalize text-primary-700 hover:text-primary-700 hover:underline ',
                isActive
                  ? 'cursor-default text-default no-underline hover:text-default hover:no-underline'
                  : '',
                isDisabled ? 'cursor-default' : '',
                linkClassName
              )}
              href={href}>
              {label}
            </Link>

            {index < items.length - 1 && (
              <svg
                className="h-4 w-4 rotate-[-90deg] text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  fillRule="evenodd"
                />
              </svg>
            )}
          </Fragment>
        ))}
      </nav>
    </section>
  )
}
