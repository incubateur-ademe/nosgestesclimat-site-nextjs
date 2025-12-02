import MetricSlider from '@/components/fin/MetricSlider'
import AnimatedArrow from '@/components/fin/metricSlider/carboneTotalChart/AnimatedArrow'
import Gauge from '@/components/fin/metricSlider/carboneTotalChart/Gauge'
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
  const { t } = await getServerTranslation({ locale })

  // @TODO : Refactor this logic to avoid repetition in CarboneTotalChart
  const originPosition =
    (simulation.computedResults.carbone.bilan / 1000 / 12) * 100

  const position = (() => {
    if (originPosition <= 0) {
      return 0
    }
    if (originPosition >= 100) {
      return 100
    }
    return originPosition
  })()

  if (!simulation) {
    return null
  }

  const { formattedValue, unit } = formatCarbonFootprint(
    simulation.computedResults.carbone.bilan,
    {
      localize: false,
    }
  )

  const percentage = Math.min(
    (simulation.computedResults.carbone.bilan / 12) * 100,
    100
  )

  const color = getColorAtPosition(position / 100)
  const cssColor = `rgba(${color['r']},${color['g']},${color['b']},${color['a']})`

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

      <MetricSlider
        carboneTotal={simulation.computedResults.carbone.bilan}
        waterTotal={simulation.computedResults.eau.bilan}
        className="mb-0 h-auto"
        isStatic
        isSharePage
      />
      <div
        className="my-8 w-full"
        role="progressbar"
        aria-valuenow={simulation.computedResults.carbone.bilan}
        aria-valuemin={0}
        aria-valuemax={12}
        aria-valuetext={`${formattedValue} ${unit} par an, ${Math.round(percentage)}% de l'échelle maximale`}
        aria-label={t(
          'endPage.carboneChart.progressBarLabel',
          'Barre de progression de votre empreinte carbone'
        )}>
        <AnimatedArrow
          className="-bottom-8"
          position={position}
          color={cssColor}
        />
        <Gauge total={simulation.computedResults.carbone.bilan} />
      </div>

      <Link
        className={twMerge(
          baseClassNames,
          colorClassNames.secondary,
          sizeClassNames.md,
          'mt-24 flex gap-2 md:hidden'
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
