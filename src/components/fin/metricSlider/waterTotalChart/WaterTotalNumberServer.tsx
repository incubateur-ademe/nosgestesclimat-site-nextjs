import Trans from '@/components/translation/trans/TransServer'
import { eauMetric } from '@/constants/model/metric'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import type { Locale } from '@/i18nConfig'

type Props = { total: number; locale: Locale }
export default async function WaterTotalNumberServer({ total, locale }: Props) {
  const { formattedValue, unit } = formatFootprint(total, {
    metric: eauMetric,
    localize: false,
  })

  // We round the value to the nearest hundred
  const realFormattedValue = (
    Math.round(Number(formattedValue) / 100) * 100
  ).toLocaleString('fr-FR')

  return (
    <div className="flex origin-top items-center justify-center pt-8 md:pt-12">
      <div className="text-water text-center leading-0 font-medium whitespace-nowrap">
        <span className="mb flex items-baseline justify-center gap-1">
          <strong className="text-xl leading-none font-black md:text-4xl lg:text-6xl">
            {realFormattedValue}
          </strong>
           
          <span className="text-lg md:text-3xl lg:text-4xl lg:leading-tight">
            {unit}
          </span>
        </span>
        <span className="text-default block text-center text-xs md:-mt-3 md:text-lg lg:text-xl">
          <Trans locale={locale}>d'eau par jour</Trans>
        </span>
      </div>
    </div>
  )
}
