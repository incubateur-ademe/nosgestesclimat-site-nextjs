'use client'

import Trans from '@/components/translation/Trans'
import InlineLink from '@/design-system/inputs/InlineLink'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useCurrentSimulation } from '@/publicodes-state'

export default function DoTheTest() {
  const { progression } = useCurrentSimulation()

  if (progression === 0) {
    return (
      <div>
        <Trans>Vous n'avez pas encore débuté votre test,</Trans>{' '}
        <InlineLink href={getLinkToSimulateur()}>
          <strong>
            <Trans>lancez-vous !</Trans>
          </strong>
        </InlineLink>
      </div>
    )
  }

  return (
    <div>
      <Trans>Vous avez commencé votre test,</Trans>{' '}
      <InlineLink href={getLinkToSimulateur()}>
        <strong>
          {' '}
          <Trans>cliquez ici pour le reprendre !</Trans>
        </strong>
      </InlineLink>
    </div>
  )
}
