import Trans from '@/components/translation/Trans'
import Emoji from '@/design-system/utils/Emoji'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import {
  getBackgroundLightColor,
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useCurrentSimulation, useRule } from '@/publicodes-state'
import { DottedName, Metric } from '@/publicodes-state/types'
import { twMerge } from 'tailwind-merge'

const colorClassName = ['200', '100', '50']

type Props = {
  action: DottedName
  index: number
  metric?: Metric
}

export default function Action({ action, index, metric = 'carbone' }: Props) {
  const locale = useLocale()
  const { t } = useClientTranslation()

  const { actionChoices } = useCurrentSimulation()

  const isActionChoosen = actionChoices[action] === true

  const { numericValue: total } = useRule(
    metric === 'eau' ? 'bilan . par jour' : 'bilan',
    metric
  )

  const { icons, title, numericValue, category } = useRule(action, metric)

  const valueAdjustedForTimeline =
    metric === 'eau' ? numericValue / 365 : numericValue
  console.log(action, valueAdjustedForTimeline)

  const hasNoValue = valueAdjustedForTimeline === 0

  const { formattedValue, unit } = formatFootprint(valueAdjustedForTimeline, {
    locale,
    t,
    metric,
  })

  const percent = Math.round((valueAdjustedForTimeline / total) * 100)
  return (
    <div
      className={twMerge(
        'max-w-80 flex-1 flex-col justify-between rounded-xl border-2 px-3 py-4 md:flex',
        colorClassName[index],
        getTextDarkColor(category),
        isActionChoosen
          ? 'bg-green-100'
          : getBackgroundLightColor(category).replace(
              '100',
              colorClassName[index]
            ),
        isActionChoosen ? 'border-green-600' : getBorderColor(category),
        index === 2 ? 'hidden' : 'flex'
      )}>
      <div className="mb-4">
        <div className="mb-4 flex flex-1 items-center justify-between">
          <Emoji className="inline-flex justify-center">{icons}</Emoji>
          {!hasNoValue && (
            <div
              className={twMerge(
                'whitespace-nowrap rounded-xl border-2 bg-white px-3 py-2 text-xs font-black leading-none lg:text-sm',
                getBorderColor(category)
              )}>
              - {formattedValue} {unit}
            </div>
          )}
        </div>
        <div className="mb-3 text-center text-sm font-bold leading-tight lg:text-base">
          {title}
        </div>
      </div>
      {!hasNoValue && (
        <div className="text-center text-sm">
          <span className="font-black text-secondary-700">{percent} %</span>
          <Trans> de votre empreinte</Trans>
        </div>
      )}
    </div>
  )
}
