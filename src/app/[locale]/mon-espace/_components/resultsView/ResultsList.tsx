import Trans from '@/components/translation/trans/TransServer'
import { MON_ESPACE_RESULTS_DETAIL_PATH } from '@/constants/urls/paths'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { Locale } from '@/i18nConfig'
import type { Simulation } from '@/publicodes-state/types'
import Link from 'next/link'

type Props = {
  locale: Locale
  simulations: Simulation[]
}

export default async function ResultsList({ locale, simulations }: Props) {
  const { t } = await getServerTranslation({ locale })

  return (
    <div className="mb-16">
      <h2>
        <Trans locale={locale} i18nKey="mon-espace.resultsList.title">
          Tous mes résultats
        </Trans>
      </h2>

      <ul className="flex flex-col gap-2">
        {simulations
          // Filter out the latest simulation, as it is already displayed in the LatestResults component
          .filter((_, index) => index !== 0)
          .map((simulation) => {
            const { formattedValue, unit } = formatCarbonFootprint(
              simulation.computedResults.carbone.bilan
            )
            return (
              <li key={simulation.id}>
                <article className="flex flex-col items-baseline gap-2 rounded-lg border border-slate-200 px-6 py-4 md:flex-row">
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline">
                    <h1 className="mb-0 text-base font-bold md:text-lg">
                      {t(
                        'mon-espace.resultsList.result.title',
                        'Résultats du {{date}} :',
                        {
                          date: new Date(simulation.date).toLocaleDateString(
                            locale,
                            {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            }
                          ),
                        }
                      )}
                    </h1>

                    <span className="mr-6 inline-block text-base md:text-lg">
                      {formattedValue} {unit}{' '}
                      <Trans
                        locale={locale}
                        i18nKey="mon-espace.resultsList.result.unit">
                        CO₂e / an
                      </Trans>
                    </span>
                  </div>

                  <Link
                    className={'text-primary-700 underline'}
                    href={MON_ESPACE_RESULTS_DETAIL_PATH.replace(
                      ':simulationId',
                      simulation.id
                    )}>
                    <Trans
                      locale={locale}
                      i18nKey="mon-espace.resultsList.result.viewDetail">
                      Voir le détail
                    </Trans>
                  </Link>
                </article>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
