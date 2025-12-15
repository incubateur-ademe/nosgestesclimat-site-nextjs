'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { trackEvent } from '@/utils/analytics/trackEvent'

interface Props {
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
      className={`${className} text-primary-700 inline-block px-0 text-[1rem]! no-underline transition-opacity hover:opacity-80`}>
      ← <Trans>Retour</Trans>
    </Link>
  )
}
