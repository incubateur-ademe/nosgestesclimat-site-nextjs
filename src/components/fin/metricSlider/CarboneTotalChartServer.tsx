import Trans from '@/components/translation/trans/TransServer'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { getColorAtPosition } from '@/helpers/getColorOfGradient'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import type { Locale } from '@/i18nConfig'
import AnimatedArrowServer from './carboneTotalChart/AnimatedArrowServer'
import GaugeServer from './carboneTotalChart/GaugeServer'

type Props = {
  total: number
  locale: Locale
}
export default async function CarboneTotalChartServer({
  total,
  locale,
}: Props) {
  const { t } = await getServerTranslation({ locale })

  const { formattedValue, unit } = formatCarbonFootprint(total, {
    t,
    locale,
    localize: true,
  })

  const originPosition = (total / 1000 / 12) * 100

  const position =
    originPosition <= 0 ? 0 : originPosition >= 100 ? 100 : originPosition

  const color = getColorAtPosition(position / 100)
  const cssColor = `rgba(${color['r']},${color['g']},${color['b']},${color['a']})`

  const targetValue = 2 // tonnes par an (objectif 2050)
  const maxValue = 12 // tonnes par an (échelle maximale)
  const currentValueInTons = total / 1000
  const percentage = Math.min((currentValueInTons / maxValue) * 100, 100)

  const gaugeDescription = t(
    'endPage.carboneChart.gaugeDescription',
    `Graphique montrant votre empreinte carbone de ${formattedValue} ${unit} par an, soit ${Math.round(percentage)}% de l'échelle maximale. L'objectif 2050 est de ${targetValue} tonnes par an.`
  )

  return (
    <div
      className="relative mx-auto mt-2 flex w-full flex-col items-center justify-center md:mt-4"
      role="img"
      aria-label={gaugeDescription}
      aria-live="polite"
      aria-atomic="true">
      <div
        className="pt-8 text-center font-medium whitespace-nowrap md:pt-12"
        style={{ color: cssColor }}
        aria-hidden="true">
        <p className="mb-0 leading-none md:mb-1">
          <strong className="bottom-7 text-xl leading-none font-black md:text-4xl lg:bottom-7 lg:text-6xl">
            {formattedValue}
          </strong>
           
          <span className="text-lg md:text-3xl lg:text-4xl lg:leading-tight">
            {unit}
          </span>
        </p>

        <p className="text-default -mt-1 mb-0 text-center md:-mt-3">
          <span className="text-xs md:text-lg lg:text-xl">
            <Trans locale={locale}>de</Trans> CO₂e{' '}
            <Trans locale={locale}>par an</Trans>
          </span>
        </p>
      </div>

      <div
        className="mt-4 hidden w-full md:block"
        role="progressbar"
        aria-valuenow={currentValueInTons}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        aria-valuetext={`${formattedValue} ${unit} par an, ${Math.round(percentage)}% de l'échelle maximale`}
        aria-label={t(
          'endPage.carboneChart.progressBarLabel',
          'Barre de progression de votre empreinte carbone'
        )}>
        <AnimatedArrowServer position={position} color={cssColor} />
        <GaugeServer total={total} locale={locale} />
      </div>
    </div>
  )
}
