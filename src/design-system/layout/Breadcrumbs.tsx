'use client'

import Link from '@/components/Link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

type Props = {
  items: { href: string; label: string }[]
}

export default function Breadcrumbs({ items }: Props) {
  const pathname = usePathname()

  return (
    <section className="h-[75px] w-full bg-grey-100">
      <nav className="mx-auto flex h-full max-w-5xl items-center gap-4 px-6 lg:px-0">
        {items.map(({ href, label }, index) => (
          <Fragment key={`breadcrumb-item-${index}`}>
            <Link
              className={`text-default ${
                pathname === href ? '' : 'no-underline'
              } hover:text-default hover:underline`}
              href={href}>
              {label}
            </Link>

            {index < items.length - 1 && (
              <svg
                className="text-grey-500 h-4 w-4 rotate-[-90deg]"
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
