import Trans from '@/components/translation/trans/TransClient'
import Separator from '@/design-system/layout/Separator'
import type { Locale } from '@/i18nConfig'
import type { Simulation } from '@/publicodes-state/types'
import ResultsBanner from './latestResults/ResultsBanner'

export default function LatestResults({
  locale,
  simulation,
}: {
  locale: Locale
  simulation: Simulation
}) {
  if (!simulation) {
    return null
  }

  return (
    <div className="border-primary-200 rounded-lg border-1 bg-white px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-medium">
          <Trans>Derniers résultats d’empreinte</Trans>
        </h2>

        <Separator />

        <p className="mb-0 font-bold">
          <Trans>Test effectué le</Trans>{' '}
          {new Date(simulation?.date)?.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      <ResultsBanner />
    </div>
  )
}
