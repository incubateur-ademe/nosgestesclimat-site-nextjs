import Trans from '@/components/translation/Trans'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { getColorAtPosition } from '@/helpers/getColorOfGradient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import { Metric } from '@/publicodes-state/types'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  metric: Metric
  isVisible?: boolean
}

const duration = {
  carbone: <Trans>de CO₂e par an</Trans>,
  eau: <Trans>d'eau par jour</Trans>,
}
export default function SmallTotal({ metric, isVisible }: Props) {
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
        'absolute left-0 top-2 flex w-full items-end justify-center gap-1.5 transition-opacity delay-150 duration-700',
        isVisible
          ? 'opacity-100 delay-200 duration-500'
          : 'opacity-0 delay-0 duration-300',
        metric === 'eau' && '!text-water'
      )}
      style={{ color: cssColor }}>
      <strong
        className={twMerge('text-4xl font-black leading-none short:text-3xl')}>
        {formattedValue}
      </strong>
      <span className="block text-base font-medium lg:inline">
        {' '}
        <Trans>{unit}</Trans> {duration[metric]}
      </span>
    </div>
  )
}
