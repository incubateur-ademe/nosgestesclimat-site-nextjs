import Button, {
  baseClassNames,
  sizeClassNames,
} from '@/design-system/inputs/Button'
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
        'relative flex gap-3 px-4 text-xs font-medium transition-colors md:text-sm lg:gap-2',
        getBgCategoryColor(currentCategory, '200'),
        getTextCategoryColor(currentCategory, '900'),
        getHoverBgCategoryColor(currentCategory, '200')
      )}>
      <Emoji className="flex items-center gap-1 leading-none">
        {capitalizeString(suggestion.label)}
      </Emoji>
      <Button
        onClick={() => handleSuggestionRemove(suggestion)}
        size="xs"
        className="h-5 w-5 items-center justify-center p-0">
        <span className="mb-[1px] block">-</span>
      </Button>
      <Button
        onClick={() => handleSuggestionAdd(suggestion)}
        size="xs"
        className="h-5 w-5 items-center justify-center p-0">
        <span className="mb-[1px] block">+</span>
      </Button>
      {isSelected && suggestion.value !== 0 && (
        <div
          className={twMerge(
            'absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border-2 bg-white text-xs',
            getBorderCategoryColor(currentCategory, '700'),
            getTextCategoryColor(currentCategory, '700')
          )}>
          {numberOfSelections}
        </div>
      )}
    </div>
  )
}
