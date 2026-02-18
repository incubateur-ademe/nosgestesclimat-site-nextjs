import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { Locale } from '@/i18nConfig'
import Trans from '../translation/trans/TransServer'

interface Props {
  locale: Locale
  value: number
}
export default async function CarbonFootprint({ locale, value }: Props) {
  const { t } = await getServerTranslation({ locale })

  const { formattedValue, unit } = formatCarbonFootprint(value, {
    locale: locale as string,
  })
  return (
    <div className="bg-primary-50 rounded-2xl p-8">
      <h1>
        <span className="block text-lg font-normal">
          {t('simulation.title', 'Vous émettez environ', {
            value: formattedValue,
            unit,
          })}
        </span>

        <span className="text-primary-600 text-3xl font-bold">
          {formattedValue} {unit}{' '}
          <Trans locale={locale as string} i18nKey="common.co2eAn">
            CO₂e / an
          </Trans>
        </span>
      </h1>
    </div>
  )
}
