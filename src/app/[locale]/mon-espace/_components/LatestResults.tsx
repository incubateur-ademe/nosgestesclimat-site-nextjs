import MetricSlider from '@/components/fin/MetricSlider'
import Gauge from '@/components/fin/metricSlider/carboneTotalChart/Gauge'
import Trans from '@/components/translation/trans/TransServer'
import { MON_ESPACE_RESULTS_DETAIL_PATH } from '@/constants/urls/paths'
import {
  baseClassNames,
  colorClassNames,
  sizeClassNames,
} from '@/design-system/buttons/Button'
import Separator from '@/design-system/layout/Separator'
import { getRules } from '@/helpers/modelFetching/getRules'
import type { Locale } from '@/i18nConfig'
import EngineProvider from '@/publicodes-state/providers/engineProvider/provider'
import type { Simulation } from '@/publicodes-state/types'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default async function LatestResults({
  locale,
  simulation,
}: {
  locale: Locale
  simulation: Simulation
}) {
  if (!simulation) {
    return null
  }

  const rules = await getRules({ locale })

  return (
    <div className="border-primary-200 rounded-lg border-1 bg-white px-6 py-8">
      <div className="mb-8">
        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          <h2 className="mb-0 text-2xl font-medium md:text-3xl">
            <Trans locale={locale} i18nKey="mon-espace.latestResults.title">
              Derniers résultats d'empreinte
            </Trans>
          </h2>

          <Link
            className={twMerge(
              baseClassNames,
              colorClassNames.secondary,
              sizeClassNames.md,
              'hidden gap-2 md:flex'
            )}
            href={MON_ESPACE_RESULTS_DETAIL_PATH.replace(
              ':simulationId',
              simulation.id
            )}>
            <span aria-hidden className="text-2xl leading-none">
              →
            </span>
            <Trans
              locale={locale}
              i18nKey="mon-espace.latestResults.viewDetail">
              Voir le détail
            </Trans>
          </Link>
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

      <EngineProvider rules={rules}>
        <MetricSlider
          carboneTotal={simulation.computedResults.carbone.bilan}
          waterTotal={simulation.computedResults.eau.bilan}
          className="mb-0 h-auto"
          isStatic
          isSharePage
        />
        {/* Bloc Gauge dédié en mobile uniquement (hors du MetricSlider) */}
        <div className="mt-4 block md:hidden">
          <Gauge total={simulation.computedResults.carbone.bilan} />
        </div>
      </EngineProvider>

      <Link
        className={twMerge(
          baseClassNames,
          colorClassNames.secondary,
          sizeClassNames.md,
          'mt-20 flex gap-2 md:hidden'
        )}
        href={MON_ESPACE_RESULTS_DETAIL_PATH.replace(
          ':simulationId',
          simulation.id
        )}>
        <span aria-hidden className="text-2xl leading-none">
          →
        </span>
        <Trans locale={locale} i18nKey="mon-espace.latestResults.viewDetail">
          Voir le détail
        </Trans>
      </Link>
    </div>
  )
}
