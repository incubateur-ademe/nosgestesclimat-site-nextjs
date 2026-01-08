'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import { useCurrentSimulation } from '@/publicodes-state'

export default function SubmitSection() {
  const currentSimulation = useCurrentSimulation()

  const hasCompletedTest = currentSimulation.progression === 1

  return (
    <>
      {!hasCompletedTest && (
        <p className="mb-2 text-xs">
          Vous devrez compléter votre test après avoir rejoint le groupe.
        </p>
      )}

      <Button type="submit" data-cypress-id="button-join-group">
        {hasCompletedTest ? (
          <Trans>Rejoindre</Trans>
        ) : (
          <Trans>Rejoindre et passer mon test</Trans>
        )}
      </Button>
    </>
  )
}
