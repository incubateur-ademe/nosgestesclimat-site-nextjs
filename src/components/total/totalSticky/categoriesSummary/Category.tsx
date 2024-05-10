import Emoji from '@/design-system/utils/Emoji'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import {
  getBackgroundLightColor,
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useForm, useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
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

  const { formattedValue, unit } = formatCarbonFootprint(numericValue, {
    t,
    locale,
  })

  return (
    <div
      className={twMerge(
        'relative mb-0 flex w-full items-center justify-between gap-4 border-b-2 px-4 py-3 transition-colors',
        getTextDarkColor(category),
        getBackgroundLightColor(category),
        currentCategory === category
          ? getBorderColor(category)
          : 'border-primary-50'
      )}>
      <div
        className={twMerge(
          'absolute bottom-0 left-0 right-0 top-0 origin-left transition-transform duration-100',
          getBackgroundLightColor(category).replace('-100', '-200')
        )}
        style={{ transform: `scaleX(${completion})` }}
      />
      <div className="relative flex items-center font-medium">
        <Emoji className="mr-2">{icons}</Emoji>
        <span>{title}</span>{' '}
      </div>
      <span
        className={twMerge(
          'relative block rounded-xl border-2 bg-white px-3 py-1 font-black transition-opacity',
          getBorderColor(category),
          getTextDarkColor(category),
          completion === 1 ? 'visible opacity-100' : 'invisible opacity-0'
        )}>
        {formattedValue} {unit}
      </span>
    </div>
  )
}
