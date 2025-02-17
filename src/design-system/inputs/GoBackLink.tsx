'use client'

import Link from '@/components/Link'
import TransClient from '@/components/translation/trans/TransClient'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  href: string
  className?: string
  eventTracked?: (string | null)[]
}

export default function GoBackLink({ className, href, eventTracked }: Props) {
  return (
    <Link
      href={href}
      onClick={() => {
        if (eventTracked) {
          trackEvent(eventTracked)
        }
      }}
      className={`${className} text-[1rem]! inline-block px-0 text-primary-700 no-underline transition-opacity hover:opacity-80`}>
      ← <TransClient>Retour</TransClient>
    </Link>
  )
}
