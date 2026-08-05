'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import Loader from '@/design-system/layout/Loader'
import { useCollectiveTestFlow } from './CollectiveTestProvider'

export default function FinalizePollCreation() {
  const { state, send, currentStep } = useCollectiveTestFlow()

  if (currentStep !== 'finaliser') {
    return null
  }

  if (state.submission.status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl p-8">
        <p role="alert" aria-live="polite" className="mb-4 text-red-800">
          <Trans>
            Une erreur s'est produite lors de la création de votre test
            collectif. Veuillez réessayer.
          </Trans>
        </p>

        <Button
          onClick={() => send({ type: 'SUBMISSION_STARTED' })}
          data-testid="poll-retry-submission-button">
          <Trans>Réessayer</Trans>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-primary-100 flex flex-col items-center justify-center rounded-2xl p-8">
      <Loader color="dark" className="mb-4 inline-block" />
      <p className="font-bold">
        <Trans>Création de votre test collectif en cours</Trans>
        {state.submission.status === 'pending' && '…'}
      </p>
    </div>
  )
}
