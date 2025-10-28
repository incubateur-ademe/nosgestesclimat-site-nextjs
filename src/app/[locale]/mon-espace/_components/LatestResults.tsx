import MetricSliderServer from '@/components/fin/MetricSliderServer'
import Trans from '@/components/translation/trans/TransServer'
import { MON_ESPACE_RESULTS_DETAIL_PATH } from '@/constants/urls/paths'
import {
  baseClassNames,
  colorClassNames,
  sizeClassNames,
} from '@/design-system/buttons/Button'
import Separator from '@/design-system/layout/Separator'
import type { Locale } from '@/i18nConfig'
import type { Simulation } from '@/publicodes-state/types'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

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
        <div className="flex justify-between">
          <h2 className="text-3xl font-medium">
            <Trans locale={locale} i18nKey="mon-espace.latestResults.title">
              Derniers résultats d'empreinte
            </Trans>
          </h2>

          <Link
            className={twMerge(
              baseClassNames,
              colorClassNames.secondary,
              sizeClassNames.md,
              'flex gap-2'
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

        <Separator />

        <p className="mb-0 font-bold">
          <Trans locale={locale} i18nKey="mon-espace.latestResults.date">
            Test effectué le
          </Trans>{' '}
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
    </div>
  )
}
