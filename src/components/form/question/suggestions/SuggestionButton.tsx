import { baseClassNames, sizeClassNames } from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import {
  getBgCategoryColor,
  getHoverBgCategoryColor,
  getTextCategoryColor,
} from '@/helpers/getCategoryColorClass'
import { useForm } from '@/publicodes-state'
import { FormattedSuggestion, SuggestionType } from '@/publicodes-state/types'
import { capitalizeString } from '@/utils/capitalizeString'
import { twMerge } from 'tailwind-merge'

const checkClassNames = {
  checked: 'border-white before:bg-white',
  unchecked: 'border-primary-700',
}

type Props = {
  suggestion: FormattedSuggestion
  type: Exclude<SuggestionType, 'multiple'>
  handleSuggestionAdd: (suggestion: FormattedSuggestion) => void
  handleSuggestionRemove: (suggestion: FormattedSuggestion) => void
  isSelected: boolean
}

export default function SuggestionButton({
  suggestion,
  type,
  handleSuggestionAdd,
  handleSuggestionRemove,
  isSelected,
}: Props) {
  const { currentCategory } = useForm()

  const status = isSelected ? 'checked' : 'unchecked'

  return (
    <button
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
      )}
      onClick={() => {
        if (type === 'checkbox' && isSelected) {
          handleSuggestionRemove(suggestion)
          return
        }
        handleSuggestionAdd(suggestion)
      }}>
      {type === 'checkbox' && (
        <span
          className={twMerge(
            'relative flex h-4 w-4 items-center justify-center rounded border-2 text-sm before:absolute before:left-0.5 before:top-0.5 before:h-2 before:w-2 before:rounded-sm before:p-1 md:text-base',
            checkClassNames[status]
          )}
        />
      )}
      <Emoji className="flex items-center gap-1 leading-none">
        {capitalizeString(suggestion.label)}
      </Emoji>
    </button>
  )
}
