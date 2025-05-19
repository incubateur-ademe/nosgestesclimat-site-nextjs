'use client'

import Alert from '@/design-system/alerts/alert/Alert'
import type { PropsWithChildren } from 'react'
import Link from '../Link'
import Trans from '../translation/trans/TransClient'

export default function DefaultErrorMessage({ children }: PropsWithChildren) {
  return (
    <Alert
      type="error"
      className="mb-6"
      description={
        children ?? (
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
        )
      }
    />
  )
}
