import Trans from '@/components/translation/Trans'
import { defaultMetric } from '@/constants/metric'
import Emoji from '@/design-system/utils/Emoji'
import {
  getBackgroundLightColor,
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useCurrentSimulation, useRule } from '@/publicodes-state'
import { Metric } from '@/publicodes-state/types'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { twMerge } from 'tailwind-merge'

const colorClassName = ['200', '100', '50']

type Props = {
  action: DottedName
  index: number
  metric?: Metric
}

export default function Action({
  action,
  index,
  metric = defaultMetric,
}: Props) {
  const { actionChoices } = useCurrentSimulation()

  const isActionChoosen = actionChoices[action] === true

  const { numericValue: total } = useRule('bilan', metric)

  const { icons, title, numericValue, category } = useRule(action, metric)

  const hasNoValue = numericValue === 0

  const percent = Math.round((numericValue / total) * 100)
  return (
    <div
      className={twMerge(
        'max-w-80 flex-1 flex-col justify-between rounded-xl border-2 px-3 pb-4 pt-6 lg:flex',
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
        <div className="mb-2 flex flex-1 items-center justify-center">
          <Emoji className="inline-flex justify-center">{icons}</Emoji>
        </div>
        <div className="text-center text-sm font-bold leading-tight lg:text-base">
          {title}
        </div>
      </div>
      {!hasNoValue && (
        <div className="text-center text-base leading-tight">
          <span className="block text-2xl font-black text-secondary-700">
            {percent || 1} %
          </span>
          <Trans> de votre empreinte</Trans>
        </div>
      )}
    </div>
  )
}
