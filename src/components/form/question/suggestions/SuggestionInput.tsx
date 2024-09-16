import { baseClassNames, sizeClassNames } from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import {
  getBgCategoryColor,
  getBorderCategoryColor,
  getHoverBgCategoryColor,
  getTextCategoryColor,
} from '@/helpers/getCategoryColorClass'
import { useForm } from '@/publicodes-state'
import { FormattedSuggestion } from '@/publicodes-state/types'
import { capitalizeString } from '@/utils/capitalizeString'
import { twMerge } from 'tailwind-merge'

type Props = {
  suggestion: FormattedSuggestion
  handleSuggestionAdd: (suggestion: FormattedSuggestion) => void
  handleSuggestionRemove: (suggestion: FormattedSuggestion) => void
  numberOfSelections: number
}

export default function SuggestionButton({
  suggestion,
  handleSuggestionAdd,
  handleSuggestionRemove,
  numberOfSelections,
}: Props) {
  const { currentCategory } = useForm()

  const isSelected = numberOfSelections > 0

  return (
    <div
      data-cypress-id="suggestion"
      className={twMerge(
        baseClassNames,
        sizeClassNames.sm,
        'relative flex gap-2 px-4 text-xs font-medium transition-colors md:text-sm',
        getBgCategoryColor(currentCategory, isSelected ? '900' : '200'),
        isSelected
          ? 'text-white'
          : getTextCategoryColor(currentCategory, '900'),
        getHoverBgCategoryColor(currentCategory, isSelected ? '700' : '300')
      )}>
      <button onClick={() => handleSuggestionRemove(suggestion)}>-</button>

      <Emoji className="flex items-center gap-1 leading-none">
        {capitalizeString(suggestion.label)}
      </Emoji>
      <button onClick={() => handleSuggestionAdd(suggestion)}>+</button>
      {isSelected && suggestion.value !== 0 && (
        <div
          className={twMerge(
            'absolute -right-1 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border-2 bg-white text-xs',
            getBorderCategoryColor(currentCategory, '700'),
            getTextCategoryColor(currentCategory, '700')
          )}>
          {numberOfSelections}
        </div>
      )}
    </div>
  )
}
