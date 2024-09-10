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
  type: 'radio' | 'checkbox'
  handleSuggestionClick: (suggestion: FormattedSuggestion) => void
  handleSuggestionDelete: (suggestion: FormattedSuggestion) => void
  numberOfSelections: number
}

export default function SuggestionButton({
  suggestion,
  type,
  handleSuggestionClick,
  handleSuggestionDelete,
  numberOfSelections,
}: Props) {
  const { currentCategory } = useForm()

  const isSelected = numberOfSelections > 0

  return (
    <div className="relative">
      <button
        data-cypress-id="suggestion"
        className={twMerge(
          'relative text-xs font-medium transition-colors md:text-sm',
          baseClassNames,
          sizeClassNames.sm,
          getBgCategoryColor(currentCategory, isSelected ? '900' : '200'),
          isSelected
            ? 'text-white'
            : getTextCategoryColor(currentCategory, '900'),
          getHoverBgCategoryColor(currentCategory, isSelected ? '700' : '300')
        )}
        onClick={() => {
          handleSuggestionClick(suggestion)
        }}>
        <Emoji className="flex items-center gap-1 leading-none">
          {capitalizeString(suggestion.label)}
        </Emoji>
      </button>
      {isSelected && suggestion.value !== 0 && type === 'checkbox' && (
        <>
          {numberOfSelections > 1 && (
            <div
              className={twMerge(
                'absolute -bottom-2 -left-1 flex h-6 min-w-6 items-center justify-center rounded-full border-2 bg-white text-xs',
                getBorderCategoryColor(currentCategory, '700'),
                getTextCategoryColor(currentCategory, '700')
              )}>
              {numberOfSelections}
            </div>
          )}
          <button
            className={twMerge(
              'absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full text-xs',
              getBgCategoryColor(currentCategory, '200'),
              getTextCategoryColor(currentCategory, '900'),
              getHoverBgCategoryColor(currentCategory, '300')
            )}
            onClick={() => handleSuggestionDelete(suggestion)}>
            x
          </button>
        </>
      )}
    </div>
  )
}
