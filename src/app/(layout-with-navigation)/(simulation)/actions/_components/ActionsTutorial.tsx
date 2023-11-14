'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine, useUser } from '@/publicodes-state'
import Image from 'next/image'
import { getCarbonFootprint } from '../_helpers/getCarbonFootprint'

export default function ActionsTutorial() {
  const { t, i18n } = useClientTranslation()

  const { getValue } = useEngine()

  const { hideTutorial } = useUser()

  const bilan = { nodeValue: getValue('bilan'), dottedName: 'bilan' }

  const [value, unit] = getCarbonFootprint({ t, i18n }, bilan.nodeValue)

  return (
    <Card className="!bg-primary-100 my-6 items-start">
      <h2 className="flex items-center">
        <Image src="/images/misc/E10C.svg" alt="" width={32} height={32} />

        <Trans>Passer à l'action !</Trans>
      </h2>

      <p>
        <Trans i18nKey={'publicodes.ActionTutorial.félicitation'}>
          Vous avez terminé votre simulation, 👏 bravo !
        </Trans>
      </p>

      <p>{t('publicodes.ActionTutorial.msgEstimation', { value, unit })}</p>

      <p>
        <Trans i18nKey={'publicodes.ActionTutorial.msgPrésentation'}>
          Pour vous aider, nous vous présenterons{' '}
          <strong>une liste d'actions</strong> :
        </Trans>
      </p>

      <ul className="list-none">
        <li>
          <Trans>✅ sélectionnez celles qui vous intéressent</Trans>
        </li>

        <li>
          <Trans>
            ❌ écartez celles qui vous semblent trop ambitieuses ou déplacées.
          </Trans>
        </li>
      </ul>

      <p>
        <Trans i18nKey={'publicodes.ActionTutorial.msgPrécision'}>
          💡 Pour améliorer la précision, certaines actions vous poseront
          quelques questions en plus.
        </Trans>
      </p>

      <Button onClick={() => hideTutorial('actions')}>
        <Trans>Démarrer</Trans>
      </Button>
    </Card>
  )
}
