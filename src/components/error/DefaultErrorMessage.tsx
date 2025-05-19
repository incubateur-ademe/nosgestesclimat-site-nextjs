'use client'

import Alert from '@/design-system/alerts/alert/Alert'
import Link from '../Link'
import Trans from '../translation/trans/TransClient'

export default function DefaultErrorMessage() {
  return (
    <Alert
      type="error"
      className="mb-6"
      description={
        <>
          <Trans>
            Oups ! Une erreur s'est produite. Veuillez réessayer plus tard. Si
            le problème persiste, vous pouvez
          </Trans>{' '}
          <Link href="/contact">
            <Trans>nous contacter</Trans>
          </Link>
          .
        </>
      }
    />
  )
}
