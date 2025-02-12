'use client'

import TransClient from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'

export default function ClimateAndWater() {
  return (
    <div>
      <Title tag="h2">
        <TransClient>
          <strong className="text-secondary-700">Eau, climat,</strong> même
          combat ?
        </TransClient>
      </Title>
      <p>
        <TransClient>
          Les activités humaines menacent les équilibres naturels de notre
          planète.
        </TransClient>{' '}
        <TransClient>
          Comme le climat,{' '}
          <strong className="text-secondary-700">
            le cycle de l’eau est fortement impacté partout dans le monde
          </strong>
           : accès à l’eau potable, disparition et migration d’espèces (animales
          et végétales), déplacement de populations.
        </TransClient>
      </p>
    </div>
  )
}
