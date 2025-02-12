'use client'

import TransClient from '@/components/translation/trans/TransClient'
import InlineLink from '@/design-system/inputs/InlineLink'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useCurrentSimulation } from '@/publicodes-state'

export default function DoTheTest() {
  const { progression } = useCurrentSimulation()

  if (progression === 0) {
    return (
      <div>
        <TransClient>Vous n'avez pas encore débuté votre test,</TransClient>{' '}
        <InlineLink href={getLinkToSimulateur()}>
          <strong>
            <TransClient>lancez-vous !</TransClient>
          </strong>
        </InlineLink>
      </div>
    )
  }

  return (
    <div>
      <TransClient>Vous avez commencé votre test,</TransClient>{' '}
      <InlineLink href={getLinkToSimulateur()}>
        <strong>
          {' '}
          <TransClient>cliquez ici pour le reprendre !</TransClient>
        </strong>
      </InlineLink>
    </div>
  )
}
