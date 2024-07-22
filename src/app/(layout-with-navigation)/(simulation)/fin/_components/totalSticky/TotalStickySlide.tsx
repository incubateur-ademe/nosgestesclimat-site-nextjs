import Trans from '@/components/translation/Trans'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { getColorAtPosition } from '@/helpers/getColorOfGradient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import { Metric } from '@/publicodes-state/types'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import HeadingButtons from '../metricSlider/heading/HeadingButtons'

type Props = {
  metric: Metric
}

const duration = {
  carbone: <Trans>de CO₂e par an</Trans>,
  eau: <Trans>d'eau par jour</Trans>,
}
export default function TotalStickySlide({ metric }: Props) {
  const locale = useLocale()
  const { t } = useClientTranslation()

  const { numericValue } = useRule('bilan', metric)

  const originPosition = (numericValue / 1000 / 12) * 100

  const position = useMemo(() => {
    if (originPosition <= 0) {
      return 0
    }
    if (originPosition >= 100) {
      return 100
    }
    return originPosition
  }, [originPosition])

  const color = getColorAtPosition(position / 100)
  const cssColor = `rgba(${color['r']},${color['g']},${color['b']},${color['a']})`

  const { formattedValue, unit } = formatFootprint(numericValue, {
    t,
    locale,
    metric,
  })
  return (
    <div
      className={twMerge(
        'flex items-center justify-between rounded-xl border-2 border-primary-50 bg-gray-100 px-4 py-2 lg:rounded-tl-none',
        metric === 'eau' && '!text-water'
      )}
      style={{ color: cssColor }}>
      <div>
        <strong className="block text-4xl font-black leading-none lg:inline short:text-3xl">
          {formattedValue}
        </strong>
        <span className="block text-base font-medium lg:inline">
          {' '}
          <Trans>{unit}</Trans> {duration[metric]}
        </span>
      </div>
      <HeadingButtons size="sm" endPage />
    </div>
  )
}
