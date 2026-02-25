import { carboneMetric } from '@/constants/model/metric'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { Locale } from '@/i18nConfig'
import type { Metric } from '@/publicodes-state/types'
import type { ReactNode } from 'react'

interface Props {
  locale: Locale
  value: number
  metric?: Metric
  unitSuffix: ReactNode
}
export default async function FootprintBlock({
  locale,
  value,
  metric = carboneMetric,
  unitSuffix,
}: Props) {
  const { t } = await getServerTranslation({ locale })

  const { formattedValue, unit } = formatFootprint(value, {
    locale: locale as string,
    metric,
  })

  return (
    <div className="bg-primary-50 mb-12 rounded-2xl p-8">
      <h1>
        <span className="block text-lg font-normal">
          {t('simulation.title', 'Vous émettez environ', {
            value: formattedValue,
            unit,
          })}
        </span>

        <span className="text-primary-600 title-lg font-bold!">
          {formattedValue} {unit} {unitSuffix}
        </span>
      </h1>
    </div>
  )
}
