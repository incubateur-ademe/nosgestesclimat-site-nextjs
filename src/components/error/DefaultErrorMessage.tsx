'use client'
import Link from '../Link'
import Trans from '../translation/trans/TransClient'

export default function DefaultErrorMessage() {
  return (
    <span className="text-red-800">
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
