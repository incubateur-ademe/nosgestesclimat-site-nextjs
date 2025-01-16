'use client'

import { questionClickSuggestion } from '@/constants/tracking/question'
import { baseClassNames, sizeClassNames } from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import {
  getBgCategoryColor,
  getBorderCategoryColor,
  getCategoryFocusRingClassName,
  getHoverBgCategoryColor,
  getHoverBorderCategoryColor,
  getTextCategoryColor,
} from '@/helpers/getCategoryColorClass'
import { useForm, useRule } from '@/publicodes-state'
import { capitalizeString } from '@/utils/capitalizeString'
import { trackEvent } from '@/utils/matomo/trackEvent'
import type { DottedName, NodeValue } from '@abc-transitionbascarbone/near-modele'
import { twMerge } from 'tailwind-merge'

type Props = {
  question: DottedName
  setValue: (value: NodeValue | Record<string, NodeValue>) => void
}

export default function Suggestions({ question, setValue }: Props) {
  const { suggestions } = useRule(question)

  const { currentCategory } = useForm()

  if (!suggestions?.length) return

  return (
    <div className="mb-6 flex flex-wrap justify-start gap-x-2 gap-y-2.5 text-sm">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.label}
          data-cypress-id={`suggestion-${suggestion.value}`}
          className={twMerge(
            'text-xs font-medium transition-colors md:text-sm',
            baseClassNames,
            sizeClassNames.sm,
            getBgCategoryColor(currentCategory, '200'),
            getBorderCategoryColor(currentCategory, '200'),
            getTextCategoryColor(currentCategory, '900'),
            getHoverBgCategoryColor(currentCategory, '300'),
            getHoverBorderCategoryColor(currentCategory, '300'),
            getCategoryFocusRingClassName(currentCategory ?? '')
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
