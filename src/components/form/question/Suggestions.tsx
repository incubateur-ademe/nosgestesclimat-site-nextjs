'use client'

import { questionClickSuggestion } from '@/constants/tracking/question'
import Button from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import { capitalizeString } from '@/utils/capitalizeString'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { DottedName, NodeValue } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  question: DottedName
  setValue: (value: NodeValue | Record<string, NodeValue>) => void
}

export default function Suggestions({ question, setValue }: Props) {
  const { suggestions } = useRule(question)

  if (!suggestions?.length) return

  return (
    <div className="mb-6 flex flex-wrap justify-start gap-x-2 gap-y-2.5 text-sm">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.label}
          data-cypress-id="suggestion"
          size="xs"
          className="text-xs font-normal md:text-sm"
          onClick={() => {
            trackEvent(
              questionClickSuggestion({ question, answer: suggestion.label })
            )
            setValue(suggestion.value)
          }}>
          <Emoji className="flex items-center gap-1 leading-none">
            {capitalizeString(suggestion.label)}
          </Emoji>
        </Button>
      ))}
    </div>
  )
}
