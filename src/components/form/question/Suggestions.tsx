'use client'

import { questionClickSuggestion } from '@/constants/tracking/question'
import { useRule } from '@/publicodes-state'
import { FormattedSuggestion } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { DottedName, NodeValue } from '@incubateur-ademe/nosgestesclimat'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SuggestionButton from './suggestions/SuggestionButton'
import SuggestionInput from './suggestions/SuggestionInput'

type Props = {
  question: DottedName
  value: NodeValue
  setValue: (value: NodeValue | Record<string, NodeValue>) => void
}

export default function Suggestions({ question, value, setValue }: Props) {
  const { suggestions, suggestionsType } = useRule(question)

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

      switch (suggestionsType) {
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
    [question, suggestionsType]
  )

  /**
   * Handles the deletion of a selected suggestion.
   * It removes one instance of the suggestion from the selected suggestions.
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
    if (suggestionsType === 'radio') {
      return selectedSuggestions.length
        ? selectedSuggestions[0].value
        : undefined
    }

    return (
      Math.round(
        selectedSuggestions.reduce(
          (acc, suggestion) => acc + (suggestion.value as number),
          0
        ) * 100
      ) / 100
    )
  }, [selectedSuggestions, suggestionsType])

  const delayTimerRef = useRef<NodeJS.Timeout>()
  const [canResetSuggestions, setCanResetSuggestions] = useState(true)
  /**
   * When the selected suggestions value change, we update the value (and tempValue if necessary) of the question.
   */
  useEffect(() => {
    if (selectedSuggestions.length) {
      setValue(valueOfSelectedSuggestions)

      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current)
      }
      delayTimerRef.current = setTimeout(
        () => setCanResetSuggestions(true),
        100
      )
      setCanResetSuggestions(false)
    }
  }, [setValue, valueOfSelectedSuggestions, selectedSuggestions])

  useEffect(() => {
    return () => {
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current)
      }
    }
  }, [])

  /**
   * When the value of the question change, we reset the selected suggestions.
   * We need to add a small delay to avoid resetting the suggestions right after they have been selected.
   */
  const valueRef = useRef(value)
  useEffect(() => {
    if (canResetSuggestions && value !== valueRef.current) {
      setSelectedSuggestions([])
    }
    valueRef.current = value
  }, [value, canResetSuggestions])

  if (!suggestions?.length) return

  return (
    <div className="mb-6 flex flex-wrap justify-start gap-x-3.5 gap-y-4 text-sm">
      {suggestions.map((suggestion) =>
        suggestionsType === 'multiple' && suggestion.value !== 0 ? (
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
            type={suggestionsType === 'multiple' ? 'radio' : suggestionsType}
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
