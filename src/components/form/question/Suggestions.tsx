'use client'

import { questionClickSuggestion } from '@/constants/tracking/question'
import Button from '@/design-system/inputs/Button'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { capitalizeString } from '@/utils/capitalizeString'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  question: DottedName
  setValue: (value: number) => void
}

export default function Suggestions({ question, setValue }: Props) {
  const { suggestions } = useRule(question)

  if (!suggestions?.length) return
  return (
    <div className="mb-4 flex flex-wrap justify-end gap-2 text-sm">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.label}
          data-cypress-id="suggestion"
          size="sm"
          className="text-xs font-normal md:text-sm"
          onClick={() => {
            trackEvent(
              questionClickSuggestion({ question, answer: suggestion.label })
            )
            setValue(suggestion.value)
          }}>
          {capitalizeString(suggestion.label)}
        </Button>
      ))}
    </div>
  )
}
