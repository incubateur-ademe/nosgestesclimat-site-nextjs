'use client'

import actionImg from '@/assets/images/E10C.svg'
import TransClient from '@/components/translation/TransClient'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine } from '@/publicodes-state'
import Image from 'next/image'
import { getCarbonFootprint } from '../_helpers/getCarbonFootprint'

export default function ActionsTutorial() {
  const { t, i18n } = useClientTranslation()

  const { getValue } = useEngine()

  const bilan = { nodeValue: getValue('bilan'), dottedName: 'bilan' }

  const [value, unit] = getCarbonFootprint({ t, i18n }, bilan.nodeValue)

  return (
    <Card className="my-6 flex-col items-start !bg-primaryLight">
      <h2 className="flex items-center">
        <Image src={actionImg} alt="" width={32} height={32} />

        <TransClient>Passer à l'action !</TransClient>
      </h2>

      <p>
        <TransClient i18nKey={'publicodes.ActionTutorial.félicitation'}>
          Vous avez terminé votre simulation, 👏 bravo !
        </TransClient>
      </p>

      <p>{t('publicodes.ActionTutorial.msgEstimation', { value, unit })}</p>

      <p>
        <TransClient i18nKey={'publicodes.ActionTutorial.msgPrésentation'}>
          Pour vous aider, nous vous présenterons{' '}
          <strong>une liste d'actions</strong> :
        </TransClient>
      </p>

      <ul className="list-none">
        <li>
          <TransClient>✅ sélectionnez celles qui vous intéressent</TransClient>
        </li>

        <li>
          <TransClient>
            ❌ écartez celles qui vous semblent trop ambitieuses ou déplacées.
          </TransClient>
        </li>
      </ul>

      <p>
        <TransClient i18nKey={'publicodes.ActionTutorial.msgPrécision'}>
          💡 Pour améliorer la précision, certaines actions vous poseront
          quelques questions en plus.
        </TransClient>
      </p>

      <Button
        onClick={() => console.log('TODO: implement logic to skip tutorial')}>
        <TransClient>Démarrer</TransClient>
      </Button>
    </Card>
  )
}
