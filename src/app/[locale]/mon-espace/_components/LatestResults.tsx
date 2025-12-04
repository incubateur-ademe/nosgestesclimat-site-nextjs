import MetricSlider from '@/components/fin/MetricSlider'
import CarboneTotalChart from '@/components/fin/metricSlider/CarboneTotalChart'
import Trans from '@/components/translation/trans/TransServer'
import Separator from '@/design-system/layout/Separator'
import type { Locale } from '@/i18nConfig'
import type { Simulation } from '@/publicodes-state/types'
import SeeDetailLink from './latestResults/SeeDetailLink'

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
        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          <h2 className="mb-0 text-2xl font-medium md:text-3xl">
            <Trans locale={locale} i18nKey="mon-espace.latestResults.title">
              Derniers résultats d'empreinte
            </Trans>
          </h2>

          <SeeDetailLink
            className="hidden md:flex"
            simulationId={simulation.id}
          />
        </div>

        <Separator className="mt-8 mb-6" />

        <p className="mb-0 font-bold">
          {/* Mobile */}
          <span className="inline md:hidden">
            <Trans locale={locale} i18nKey="mon-espace.latestResults.date">
              Réalisé le
            </Trans>
          </span>
          {/* Desktop */}
          <span className="hidden md:inline">
            <Trans locale={locale} i18nKey="mon-espace.latestResults.date">
              Test effectué le
            </Trans>
          </span>{' '}
          {new Date(simulation?.date)?.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      <MetricSlider
        carboneTotal={simulation.computedResults.carbone.bilan}
        waterTotal={simulation.computedResults.eau.bilan}
        className="mb-0 h-auto"
        isStatic
        isSharePage
      />
      <CarboneTotalChart
        className="mt-10 block md:hidden"
        total={simulation.computedResults.carbone.bilan}
        shouldShowOnlyGauge
      />

      <SeeDetailLink className="flex md:hidden" simulationId={simulation.id} />
    </div>
  )
}
