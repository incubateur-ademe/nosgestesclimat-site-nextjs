'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
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
      className={`${className} inline-block px-0 !text-[1rem] text-primary-700 no-underline transition-opacity hover:opacity-80`}>
      ← <Trans>Retour</Trans>
    </Link>
  )
}
