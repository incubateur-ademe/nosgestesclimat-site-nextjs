import GaugeContainerServer from '@/components/fin/metricSlider/GaugeContainerServer'
import MetricSliderServer from '@/components/fin/MetricSliderServer'
import Trans from '@/components/translation/trans/TransServer'
import { MON_ESPACE_RESULTS_DETAIL_PATH } from '@/constants/urls/paths'
import {
  baseClassNames,
  colorClassNames,
  sizeClassNames,
} from '@/design-system/buttons/Button'
import Separator from '@/design-system/layout/Separator'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { getColorAtPosition } from '@/helpers/getColorOfGradient'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { Locale } from '@/i18nConfig'
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

  // Calculate gauge parameters for mobile display
  const { t } = await getServerTranslation({ locale })
  const { formattedValue, unit } = formatCarbonFootprint(
    simulation.computedResults.carbone.bilan,
    {
      t,
      locale,
      localize: true,
    }
  )

  const total = simulation.computedResults.carbone.bilan
  const originPosition = (total / 1000 / 12) * 100
  const position =
    originPosition <= 0 ? 0 : originPosition >= 100 ? 100 : originPosition

  const color = getColorAtPosition(position / 100)
  const cssColor = `rgba(${color['r']},${color['g']},${color['b']},${color['a']})`

  const targetValue = 2 // tonnes par an (objectif 2050)
  const maxValue = 12 // tonnes par an (échelle maximale)
  const currentValueInTons = total / 1000
  const percentage = Math.min((currentValueInTons / maxValue) * 100, 100)

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

      <MetricSliderServer
        carboneTotal={simulation.computedResults.carbone.bilan}
        waterTotal={simulation.computedResults.eau.bilan}
        locale={locale}
        className="mb-0 h-auto"
      />

      <div className="mt-4 block md:hidden">
        <div
          className="relative mx-auto mt-2 flex w-full flex-col items-center justify-center md:mt-4"
          role="img"
          aria-label={t(
            'mon-espace.latestResults.gaugeDescription',
            "Graphique montrant votre empreinte carbone de {{currentValue}} {{unit}} par an, soit {{percentage}}% de l'échelle maximale. L'objectif 2050 est de {{targetValue}} tonnes par an.",
            {
              currentValue: formattedValue,
              unit,
              percentage: Math.round(percentage),
              targetValue: 2,
              interpolation: { escapeValue: false },
            }
          )}
          aria-live="polite"
          aria-atomic="true">
          <GaugeContainerServer
            total={total}
            locale={locale}
            currentValueInTons={currentValueInTons}
            maxValue={maxValue}
            formattedValue={formattedValue}
            unit={unit ?? ''}
            percentage={percentage}
            position={position}
            cssColor={cssColor}
          />
        </div>
      </div>

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
