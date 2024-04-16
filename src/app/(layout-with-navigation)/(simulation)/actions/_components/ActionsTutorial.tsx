'use client'

import { actionsClickStart } from '@/constants/tracking/pages/actions'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { getCarbonFootprint } from '../_helpers/getCarbonFootprint'

export default function ActionsTutorial() {
  const { t, i18n } = useClientTranslation()

  const { getValue } = useEngine()

  const { hideTutorial } = useUser()

  const bilan = { nodeValue: getValue('bilan'), dottedName: 'bilan' }

  const [value, unit] = getCarbonFootprint({ t, i18n }, bilan.nodeValue)

  return (
    <Card className="my-6 items-start border-none bg-gray-100">
      <h2 className="flex items-center">
        <NGCTrans>Passer à l'action !</NGCTrans>
      </h2>

      <p>
        <NGCTrans i18nKey={'publicodes.ActionTutorial.félicitation'}>
          Vous avez terminé votre simulation
        </NGCTrans>
        , <Emoji>👏</Emoji> <NGCTrans>bravo !</NGCTrans>
      </p>

      <p>{t('publicodes.ActionTutorial.msgEstimation', { value, unit })}</p>

      <p>
        <NGCTrans i18nKey={'publicodes.ActionTutorial.msgPrésentation'}>
          Pour vous aider, nous vous présenterons{' '}
          <strong>une liste d'actions</strong> :
        </NGCTrans>
      </p>

      <ul className="list-none">
        <li className="flex items-center">
          <Emoji className="mr-2">✅</Emoji>

          <NGCTrans>sélectionnez celles qui vous intéressent</NGCTrans>
        </li>

        <li className="flex items-center">
          <Emoji className="mr-2">❌</Emoji>

          <NGCTrans>
            écartez celles qui vous semblent trop ambitieuses ou déplacées.
          </NGCTrans>
        </li>
      </ul>

      <p className="mt-6">
        <Emoji className="mr-2">💡</Emoji>

        <NGCTrans i18nKey={'publicodes.ActionTutorial.msgPrécision'}>
          Pour améliorer la précision, certaines actions vous poseront quelques
          questions en plus.
        </NGCTrans>
      </p>

      <Button
        onClick={() => {
          hideTutorial('actions')
          trackEvent(actionsClickStart)
        }}>
        <NGCTrans>Démarrer</NGCTrans>
      </Button>
    </Card>
  )
}
