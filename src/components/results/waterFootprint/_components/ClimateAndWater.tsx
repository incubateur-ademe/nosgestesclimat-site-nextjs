'use client'

import Trans from '@/components/translation/trans/TransServer'
import type { Locale } from '@/i18nConfig'

interface Props {
  locale: Locale
}

export default function ClimateAndWater({ locale }: Props) {
  return (
    <div className="mb-12">
      <h2 className="title-lg">
        <Trans i18nKey="simulation.eau.climateAndWater.title" locale={locale}>
          Eau, climat, même combat ?
        </Trans>
      </h2>
      <p>
        <Trans
          i18nKey="simulation.eau.climateAndWater.description1"
          locale={locale}>
          Les activités humaines menacent les équilibres naturels de notre
          planète.
        </Trans>{' '}
        <Trans
          i18nKey="simulation.eau.climateAndWater.description2"
          locale={locale}>
          Comme le climat,{' '}
          <strong>
            le cycle de l'eau est fortement impacté partout dans le monde
          </strong>{' '}
          : accès à l'eau potable, disparition et migration d'espèces (animales
          et végétales), déplacement de populations.
        </Trans>
      </p>
    </div>
  )
}
