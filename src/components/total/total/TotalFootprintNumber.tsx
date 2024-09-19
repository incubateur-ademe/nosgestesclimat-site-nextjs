import Trans from '@/components/translation/Trans'
import { defaultMetric } from '@/constants/metric'
import Loader from '@/design-system/layout/Loader'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useActions, useRule, useSimulation } from '@/publicodes-state'
import { Metric } from '@/publicodes-state/types'

type Props = {
  metric?: Metric
}

const duration = {
  carbone: <Trans>de CO₂e par an</Trans>,
  eau: <Trans>d'eau par jour</Trans>,
}
export default function TotalFootprintNumber({
  metric = defaultMetric,
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
    <div className="flex items-end gap-2" aria-live="polite">
      {shouldDisplayTotalWithoutActions && (
        <strong className="mr-4 block font-black leading-none text-slate-500 line-through lg:inline lg:text-4xl short:text-3xl">
          {!isInitialized ? '--' : formatedTotalFootprintValue}
        </strong>
      )}
      {isInitialized ? (
        <strong className="block text-3xl font-black leading-none lg:inline lg:text-4xl short:text-3xl">
          {formattedValue}
        </strong>
      ) : (
        <div className="px-2">
          <Loader color="dark" size="sm" />
        </div>
      )}
      <span className="block text-xs font-medium leading-none lg:inline lg:text-base">
        {' '}
        <Trans>{unit}</Trans> <br className="lg:hidden" />
        {duration[metric]}
      </span>
    </div>
  )
}
