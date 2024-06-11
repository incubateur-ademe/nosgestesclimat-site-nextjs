'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'

type Props = {
  href: string
  className?: string
  onClick?: () => void
}

export default function GoBackLink({ className, href, onClick }: Props) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${className} inline-block px-0 !text-[1rem] text-primary-700 no-underline transition-opacity hover:opacity-80`}>
      ← <Trans>Retour</Trans>
    </Link>
  )
}
