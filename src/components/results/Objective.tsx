import type { Locale } from '@/i18nConfig'
import Trans from '../translation/trans/TransServer'
import ObjectiveWithRhythm from './objective/ObjectiveWithRhythm'

interface Props {
  locale: Locale
  carbonFootprint: number
}

export default function Objective({ locale, carbonFootprint }: Props) {
  return (
    <div>
      <h2>
        <Trans locale={locale} i18nKey="results.objective.title">
          Objectif national : <span className="text-secondary-700">2T</span> par
          personne en 2050
        </Trans>
      </h2>
      <p>
        <Trans locale={locale} i18nKey="results.objective.description">
          L'objectif de la France pour atteindre la neutralité carbone en 2050
          et aider à limiter le réchauffement mondial à +2 °C.
        </Trans>
      </p>

      <ObjectiveWithRhythm locale={locale} carbonFootprint={carbonFootprint} />

      {/* <ObjectiveCurve />

      <CollectiveEfforts /> */}
    </div>
  )
}
