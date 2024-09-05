import Emoji from '@/design-system/utils/Emoji'
import { formatFootprint } from '@/helpers/formatters/formatFootprint'
import {
  getBackgroundLightColor,
  getBorderColor,
  getBorderLightColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useForm, useRule } from '@/publicodes-state'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { twMerge } from 'tailwind-merge'

type Props = {
  category: DottedName
}

export default function Category({ category }: Props) {
  const locale = useLocale()
  const { t } = useClientTranslation()

  const {
    remainingQuestionsByCategories,
    currentCategory,
    questionsByCategories,
  } = useForm()

  const { title, icons, numericValue } = useRule(category)

  const completion =
    (questionsByCategories[category].length -
      remainingQuestionsByCategories[category].length) /
    questionsByCategories[category].length

  const isCompleted = completion === 1
  const isStarted = completion > 0
  const isCurrent = currentCategory === category

  const { formattedValue, unit } = formatFootprint(numericValue, {
    t,
    locale,
  })

  return (
    <div
      className={twMerge(
        'relative mb-0 flex w-full items-center justify-between gap-4 overflow-hidden rounded-xl border-2 bg-white px-2 py-2 transition-colors',
        isStarted || isCurrent ? getTextDarkColor(category) : 'text-slate-600',

        isCurrent
          ? getBorderColor(category)
          : isStarted
            ? getBorderLightColor(category)
            : 'border-slate-200'
      )}>
      <div
        className={twMerge(
          'absolute bottom-0 left-0 right-0 top-0 origin-left transition-transform duration-200',
          isCurrent
            ? getBackgroundLightColor(category)
            : getBackgroundLightColor(category)
        )}
        style={{ transform: `scaleX(${completion})` }}
      />
      <div className="relative flex items-center font-medium">
        <Emoji
          className={twMerge(
            isStarted || isCurrent ? 'opacity-100' : 'opacity-50',
            'mr-2 transition-opacity'
          )}>
          {icons}
        </Emoji>
        <span>{title}</span>{' '}
      </div>
      <span
        className={twMerge(
          'relative block rounded-xl border-2 bg-white px-3 py-1 font-black transition-opacity',
          getBorderColor(category),
          getTextDarkColor(category),
          isCompleted ? 'visible opacity-100' : 'invisible opacity-0'
        )}>
        {formattedValue} {unit}
      </span>
    </div>
  )
}
