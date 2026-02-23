'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'

interface Props {
  href: string
  className?: string
}

export default function GoBackLink({ className, href }: Props) {
  return (
    <Link
      href={href}
      onClick={() => {
      }}
      className={`${className} text-primary-700 inline-block px-0 text-[1rem]! no-underline transition-opacity hover:opacity-80`}>
      ← <Trans>Retour</Trans>
    </Link>
  )
}
