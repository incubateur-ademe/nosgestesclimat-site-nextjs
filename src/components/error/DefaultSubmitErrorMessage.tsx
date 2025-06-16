'use client'

import { twMerge } from 'tailwind-merge'
import Link from '../Link'
import Trans from '../translation/trans/TransClient'

export default function DefaultSubmitErrorMessage({
  className,
}: {
  className?: string
}) {
  return (
    <span
      role="alert"
      className={twMerge('block font-bold text-red-800', className)}>
      <Trans>
        Oups ! Une erreur s'est produite. Veuillez réessayer plus tard. Si le
        problème persiste, vous pouvez
      </Trans>{' '}
      <Link href="/contact">
        <Trans>nous contacter</Trans>
      </Link>
      .
    </span>
  )
}
