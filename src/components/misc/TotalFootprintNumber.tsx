import Trans from '@/components/translation/Trans'
import { defaultMetric } from '@/constants/metric'
import Loader from '@/design-system/layout/Loader'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useActions, useRule, useSimulation } from '@/publicodes-state'
import type { Metric } from '@/publicodes-state/types'
import { twMerge } from 'tailwind-merge'

type Sizes = 'md' | 'lg'

type Props = {
  metric?: Metric
  className?: string
  size?: Sizes
}

const duration = {
  carbone: <Trans>de CO₂e par an</Trans>,
  eau: <Trans>d'eau par jour</Trans>,
}
export default function TotalFootprintNumber({
  metric = defaultMetric,
  className,
  size = 'md',
}: Props) {
  const locale = useLocale()
  const { t } = useClientTranslation()

  const { isInitialized } = useSimulation()

  const { numericValue: totalFootprintValue } = useRule('bilan', metric)

  const { totalChosenActionsValue } = useActions()

  const totalFootprintValueMinusActions =
    totalFootprintValue - totalChosenActionsValue

  const { formattedValue, unit } = formatFootprint(
    totalFootprintValueMinusActions,
    {
      t,
      locale,
      metric,
    }
  )

  const { formattedValue: formatedTotalFootprintValue } = formatFootprint(
    totalFootprintValue,
    {
      t,
      locale,
      metric,
    }
  )

  const shouldDisplayTotalWithoutActions =
    totalFootprintValue !== totalFootprintValueMinusActions

  return (
    <div
      className={twMerge('flex flex-col gap-1 md:gap-0', className)}
      aria-live="polite"
      data-cypress-id="total-footprint-number">
      {shouldDisplayTotalWithoutActions && (
        <strong
          className={twMerge(
            'mr-4 block font-black leading-none text-slate-500 line-through md:text-xl',
            size === 'lg' && 'text-xl md:text-3xl'
          )}>
          {!isInitialized ? '--' : formatedTotalFootprintValue}
        </strong>
      )}
      {isInitialized ? (
        <strong
          className={twMerge(
            'block text-lg font-black leading-none md:text-2xl',
            size === 'lg' && 'text-xl md:text-4xl'
          )}>
          {formattedValue}{' '}
          <span
            className={twMerge(
              'text-xs font-medium',
              size === 'lg' && 'text-sm md:text-base'
            )}>
            {unit}
          </span>
        </strong>
      ) : (
        <div className="px-2">
          <Loader color="dark" size="sm" />
        </div>
      )}
      <span
        className={twMerge(
          'block text-xs font-medium leading-none lg:inline lg:text-sm',
          size === 'lg' && 'text-sm md:text-base'
        )}>
        <span className="hidden xs:inline">{duration[metric]}</span>
      </span>
    </div>
  )
}
