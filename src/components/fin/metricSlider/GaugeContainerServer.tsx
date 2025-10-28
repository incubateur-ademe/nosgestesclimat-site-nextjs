import { getServerTranslation } from '@/helpers/getServerTranslation'
import AnimatedArrowServer from './carboneTotalChart/AnimatedArrowServer'
import GaugeServer from './carboneTotalChart/GaugeServer'

export default async function GaugeContainerServer({
  total,
  locale,
  currentValueInTons,
  maxValue,
  formattedValue,
  unit,
  percentage,
  position,
  cssColor,
}: {
  total: number
  locale: string
  currentValueInTons: number
  maxValue: number
  formattedValue: string
  unit: string
  percentage: number
  position: number
  cssColor: string
}) {
  const { t } = await getServerTranslation({ locale })
  return (
    <div
      className="mt-4 w-full"
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
  )
}
