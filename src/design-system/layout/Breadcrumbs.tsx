'use client'

import Link from '@/components/Link'
import { breadcrumbClickLink } from '@/constants/tracking/layout'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { Fragment } from 'react'

type Props = {
  items: {
    href: string
    label: string | JSX.Element
    isActive?: boolean
    isDisabled?: boolean
  }[]
}

export default function Breadcrumbs({ items }: Props) {
  return (
    <section className="h-[75px] w-full bg-gray-100">
      <nav className="mx-auto flex h-full max-w-5xl items-center gap-4 overflow-x-scroll px-6 lg:px-0">
        {items.map(({ href, label, isActive, isDisabled }, index) => (
          <Fragment key={`breadcrumb-item-${index}`}>
            <Link
              onClick={(e) => {
                if (isDisabled) {
                  e.preventDefault()
                }
                trackEvent(breadcrumbClickLink)
              }}
              className={`text-default ${
                isActive ? '' : 'no-underline'
              } max-w-full text-ellipsis whitespace-nowrap text-sm capitalize hover:text-default hover:underline ${isDisabled ? 'cursor-none' : ''}`}
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
