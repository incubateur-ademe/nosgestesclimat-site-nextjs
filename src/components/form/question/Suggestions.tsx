'use client'

import { questionClickSuggestion } from '@/constants/tracking/question'
import { useRule } from '@/publicodes-state'
import { Suggestion } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { DottedName, NodeValue } from '@incubateur-ademe/nosgestesclimat'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SuggestionButton from './suggestions/SuggestionButton'

type Props = {
  question: DottedName
  value: NodeValue
  setValue: (value: NodeValue | Record<string, NodeValue>) => void
  type?: 'radio' | 'checkbox'
}

export default function Suggestions({
  question,
  value,
  setValue,
  type = 'radio',
}: Props) {
  const { suggestions } = useRule(question)

  const [selectedSuggestions, setSelectedSuggestions] = useState<Suggestion[]>(
    []
  )

  const handleSuggestionClick = useCallback(
    (suggestion: Suggestion) => {
      trackEvent(
        questionClickSuggestion({ question, answer: suggestion.label })
      )

      // If the suggestion is zero, we want to select it and unselect all the others
      if (!suggestion.value) {
        setSelectedSuggestions([suggestion])
        return
      }

      switch (type) {
        case 'checkbox':
          setSelectedSuggestions((prevSelectedSuggestions) => [
            ...prevSelectedSuggestions.filter(
              (prevSelectedSuggestion) => prevSelectedSuggestion.value
            ),
            suggestion,
          ])
          break
        case 'radio':
        default:
          setSelectedSuggestions([suggestion])
          break
      }
    },
    [question, setValue, type]
  )

  const handleSuggestionDelete = useCallback((suggestion: Suggestion) => {
    setSelectedSuggestions((prevSelectedSuggestions) =>
      prevSelectedSuggestions.filter(
        (prevSelectedSuggestion) =>
          prevSelectedSuggestion.label !== suggestion.label
      )
    )
  }, [])

  const valueOfSelectedSuggestions = useMemo(
    () =>
      selectedSuggestions.reduce(
        (acc, suggestion) => acc + suggestion.value,
        0
      ),
    [selectedSuggestions]
  )

  useEffect(() => {
    if (selectedSuggestions.length) {
      valueOfSelectedSuggestionsRef.current = valueOfSelectedSuggestions
      setValue(valueOfSelectedSuggestions)
    }
  }, [setValue, valueOfSelectedSuggestions, selectedSuggestions])

  const valueOfSelectedSuggestionsRef = useRef(valueOfSelectedSuggestions)
  useEffect(() => {
    if (value && value !== valueOfSelectedSuggestionsRef.current) {
      setSelectedSuggestions([])
    }
  }, [value])

  if (!suggestions?.length) return

  return (
    <div className="mb-6 flex flex-wrap justify-start gap-x-3.5 gap-y-4 text-sm">
      {suggestions.map((suggestion) => (
        <SuggestionButton
          key={suggestion.label}
          suggestion={suggestion}
          type={type}
          numberOfSelections={
            selectedSuggestions.filter(
              (selectedSuggestion) =>
                selectedSuggestion.label === suggestion.label
            ).length
          }
          handleSuggestionClick={handleSuggestionClick}
          handleSuggestionDelete={handleSuggestionDelete}
        />
      ))}
    </div>
  )
}
