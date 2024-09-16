'use client'

import { questionClickSuggestion } from '@/constants/tracking/question'
import { useRule } from '@/publicodes-state'
import { FormattedSuggestion, SuggestionType } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { DottedName, NodeValue } from '@incubateur-ademe/nosgestesclimat'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SuggestionButton from './suggestions/SuggestionButton'
import SuggestionInput from './suggestions/SuggestionInput'

type Props = {
  question: DottedName
  value: NodeValue
  setValue: (value: NodeValue | Record<string, NodeValue>) => void
  type?: SuggestionType
}

export default function Suggestions({
  question,
  value,
  setValue,
  type = 'radio',
}: Props) {
  const { suggestions } = useRule(question)
  console.log('suggestions', type)
  // This is an array containing every selected suggestion.
  // If a suggestion is selected multiple times, it will appear multiple times in this array
  const [selectedSuggestions, setSelectedSuggestions] = useState<
    FormattedSuggestion[]
  >([])

  /**
   * Handles the selection (or addition) of a suggestion.
   * Behave differently depending on the type (and value) of the suggestions.
   */
  const handleSuggestionAdd = useCallback(
    (suggestion: FormattedSuggestion) => {
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
        case 'multiple':
          // For checkbox and multiple type, add the suggestion to the selected suggestions
          setSelectedSuggestions((prevSelectedSuggestions) => [
            ...prevSelectedSuggestions.filter(
              (prevSelectedSuggestion) => prevSelectedSuggestion.value
            ),
            suggestion,
          ])
          break
        case 'radio':
        default:
          // For radio type, replace the selected suggestion with the current suggestion
          setSelectedSuggestions([suggestion])
          break
      }
    },
    [question, type]
  )

  /**
   * Handles the deletion of a selected suggestion.
   * It removes one instance of the suggestion from the selected suggestions.
   *
   * @param suggestion - The suggestion to be deleted.
   */
  const handleSuggestionRemove = useCallback(
    (suggestion: FormattedSuggestion) => {
      setSelectedSuggestions((prevSelectedSuggestions) => {
        let isRemoved = false

        return prevSelectedSuggestions.filter((prevSelectedSuggestion) => {
          if (isRemoved) return true

          if (prevSelectedSuggestion.value === suggestion.value) {
            isRemoved = true
            return false
          }

          return true
        })
      })
    },
    []
  )

  /**
   * The value of the selected suggestions.
   * If it is a radio type, it will return the value of the selected suggestion.
   * If it is a checkbox or multiple type, it will return the sum of the values of the selected suggestions.
   * So checkbox and multiple suggestions should only be used with question type === 'number'.
   */
  const valueOfSelectedSuggestions = useMemo(() => {
    if (type === 'radio') {
      return selectedSuggestions.length
        ? selectedSuggestions[0].value
        : undefined
    }
    return selectedSuggestions.reduce(
      (acc, suggestion) => acc + (suggestion.value as number),
      0
    )
  }, [selectedSuggestions, type])

  /**
   * When the selected suggestions value change, we update the value (and tempValue if necessary) of the question.
   */
  useEffect(() => {
    if (selectedSuggestions.length) {
      valueOfSelectedSuggestionsRef.current = valueOfSelectedSuggestions
      setValue(valueOfSelectedSuggestions)
    }
  }, [setValue, valueOfSelectedSuggestions, selectedSuggestions])

  console.log('valueOfSelectedSuggestions', valueOfSelectedSuggestions)
  /**
   * When the value of the question change, we reset the selected suggestions.
   */
  const valueOfSelectedSuggestionsRef = useRef(valueOfSelectedSuggestions)
  useEffect(() => {
    if (value && value !== valueOfSelectedSuggestionsRef.current) {
      setSelectedSuggestions([])
    }
  }, [value])

  if (!suggestions?.length) return

  return (
    <div className="mb-6 flex flex-wrap justify-start gap-x-3.5 gap-y-4 text-sm">
      {suggestions.map((suggestion) =>
        type === 'multiple' ? (
          <SuggestionInput
            key={suggestion.label}
            suggestion={suggestion}
            numberOfSelections={
              selectedSuggestions.filter(
                (selectedSuggestion) =>
                  selectedSuggestion.label === suggestion.label
              ).length
            }
            handleSuggestionAdd={handleSuggestionAdd}
            handleSuggestionRemove={handleSuggestionRemove}
          />
        ) : (
          <SuggestionButton
            key={suggestion.label}
            suggestion={suggestion}
            type={type}
            isSelected={
              selectedSuggestions.filter(
                (selectedSuggestion) =>
                  selectedSuggestion.label === suggestion.label
              ).length
                ? true
                : false
            }
            handleSuggestionAdd={handleSuggestionAdd}
            handleSuggestionRemove={handleSuggestionRemove}
          />
        )
      )}
    </div>
  )
}
