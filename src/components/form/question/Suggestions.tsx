'use client'

import { aucunLabels } from '@/constants/aucunLabels'
import { questionClickSuggestion } from '@/constants/tracking/question'
import { baseClassNames, sizeClassNames } from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import {
  getBgCategoryColor,
  getBorderCategoryColor,
  getHoverBgCategoryColor,
  getHoverBorderCategoryColor,
  getTextCategoryColor,
} from '@/helpers/getCategoryColorClass'
import { useForm } from '@/publicodes-state'
import { FormattedSuggestion } from '@/publicodes-state/types'
import { capitalizeString } from '@/utils/capitalizeString'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { DottedName, NodeValue } from '@incubateur-ademe/nosgestesclimat'
import { twMerge } from 'tailwind-merge'

type Props = {
  question: DottedName
  suggestions: FormattedSuggestion[]
  setValue: (value: NodeValue | Record<string, NodeValue>) => void
}

export default function Suggestions({
  question,
  suggestions,
  setValue,
}: Props) {
  const { currentCategory } = useForm()

  const filteredSuggestions = suggestions.filter(
    (suggestion) => !aucunLabels.includes(suggestion.label)
  )

  if (filteredSuggestions.length === 0) {
    return null
  }

  return (
    <div className="mb-6 flex flex-wrap justify-start gap-x-2 gap-y-2.5 text-sm">
      {filteredSuggestions.map((suggestion) => (
        <button
          key={suggestion.label}
          data-cypress-id="suggestion"
          className={twMerge(
            'text-xs font-medium transition-colors md:text-sm',
            baseClassNames,
            sizeClassNames.sm,
            getBgCategoryColor(currentCategory, '200'),
            getBorderCategoryColor(currentCategory, '200'),
            getTextCategoryColor(currentCategory, '900'),
            getHoverBgCategoryColor(currentCategory, '300'),
            getHoverBorderCategoryColor(currentCategory, '300')
          )}
          onClick={() => {
            trackEvent(
              questionClickSuggestion({ question, answer: suggestion.label })
            )
            setValue(suggestion.value)
          }}>
          <Emoji className="flex items-center gap-1 leading-none">
            {capitalizeString(suggestion.label)}
          </Emoji>
        </button>
      ))}
    </div>
  )
}
