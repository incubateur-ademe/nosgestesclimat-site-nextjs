'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { actionsClickStart } from '@/constants/tracking/pages/actions'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { getCarbonFootprint } from '@/helpers/actions/getCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useEngine, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function ActionsTutorial() {
  const { t, i18n } = useClientTranslation()

  const { getValue } = useEngine()

  const { hideTutorial } = useUser()

  const bilan = { nodeValue: getValue('bilan'), dottedName: 'bilan' }

  const [value, unit] = getCarbonFootprint({ t, i18n }, bilan.nodeValue)

  const { progression } = useCurrentSimulation()
  const { tutorials } = useUser()

  if (progression < 0.5 || tutorials.actions) {
    return null
  }

  return (
    <Card className="my-6 items-start border-none bg-gray-100">
      <h2 className="flex items-center">
        <TransClient>Passer à l'action !</TransClient>
      </h2>

      <p>
        <TransClient i18nKey={'publicodes.ActionTutorial.félicitation'}>
          Vous avez terminé votre simulation
        </TransClient>
        , <Emoji>👏</Emoji> <TransClient>bravo !</TransClient>
      </p>

      <p>{t('publicodes.ActionTutorial.msgEstimation', { value, unit })}</p>

      <p>
        <TransClient i18nKey={'publicodes.ActionTutorial.msgPrésentation'}>
          Pour vous aider, nous vous présenterons{' '}
          <strong>une liste d'actions</strong> :
        </TransClient>
      </p>

      <ul className="list-none">
        <li className="flex items-center">
          <Emoji className="mr-2">✅</Emoji>

          <TransClient>sélectionnez celles qui vous intéressent</TransClient>
        </li>

        <li className="flex items-center">
          <Emoji className="mr-2">❌</Emoji>

          <TransClient>
            écartez celles qui vous semblent trop ambitieuses ou déplacées.
          </TransClient>
        </li>
      </ul>

      <p className="mt-6">
        <Emoji className="mr-2">💡</Emoji>

        <TransClient i18nKey={'publicodes.ActionTutorial.msgPrécision'}>
          Pour améliorer la précision, certaines actions vous poseront quelques
          questions en plus.
        </TransClient>
      </p>

      <Button
        onClick={() => {
          hideTutorial('actions')
          trackEvent(actionsClickStart)
        }}>
        <TransClient>Démarrer</TransClient>
      </Button>
    </Card>
  )
}
