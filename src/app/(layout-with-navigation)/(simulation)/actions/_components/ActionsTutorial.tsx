'use client'

import actionImg from '@/assets/images/E10C.svg'
import TransServer from '@/components/translation/TransServer'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'

export default function ActionsTutorial({
  value,
  unit,
}: {
  value: string
  unit: string
}) {
  const { t } = useClientTranslation()
  return (
    <Card className="my-6">
      <h2 className="flex items-center">
        <Image src={actionImg} alt="" width={32} height={32} />
        <TransServer>Passer à l'action !</TransServer>
      </h2>
      <p>
        <TransServer i18nKey={'publicodes.ActionTutorial.félicitation'}>
          Vous avez terminé votre simulation, 👏 bravo !
        </TransServer>
      </p>
      <p>{t('publicodes.ActionTutorial.msgEstimation', { value, unit })}</p>

      <p>
        <TransServer i18nKey={'publicodes.ActionTutorial.msgPrésentation'}>
          Pour vous aider, nous vous présenterons{' '}
          <strong>une liste d'actions</strong> :
        </TransServer>
      </p>

      <ul className="list-none">
        <li>
          <TransServer>✅ sélectionnez celles qui vous intéressent</TransServer>
        </li>
        <li>
          <TransServer>
            ❌ écartez celles qui vous semblent trop ambitieuses ou déplacées.
          </TransServer>
        </li>
      </ul>
      <p>
        <TransServer i18nKey={'publicodes.ActionTutorial.msgPrécision'}>
          💡 Pour améliorer la précision, certaines actions vous poseront
          quelques questions en plus.
        </TransServer>
      </p>
      <button
        className="ui__ button plain cta"
        onClick={() => console.log('TODO: implement logic to skip tutorial')}>
        <TransServer>Démarrer</TransServer>
      </button>
    </Card>
  )
}
