import { useCurrentSimulation, useRule } from '@/publicodes-state'
import type { Situation } from '@/publicodes-state/types'
import { useDebounce } from '@/utils/debounce'
import type { NodeValue } from '@incubateur-ademe/nosgestesclimat'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat/types/dottedNames'
import { useEffect, useState } from 'react'

function ouiNonToBoolean(value: unknown): unknown {
  if (value === 'oui') return true
  if (value === 'non') return false
  return value
}

export function useMosaicState({
  questionsOfMosaic,
  question,
}: {
  questionsOfMosaic: DottedName[]
  question: DottedName
}) {
  const rule = useRule(question)
  const { situation } = useCurrentSimulation()

  const setValuesLater = useDebounce(rule.setValue, 800)
  const setValuesNow = useDebounce(rule.setValue, 0)

  const aucunKey = questionsOfMosaic.find((key) => key.includes('aucun'))

  const stateFromSituation: (
    situation: Situation
  ) => Partial<Record<DottedName, boolean | undefined | number>> = () =>
    Object.fromEntries(
      questionsOfMosaic.map((question) => [
        question,
        situation[question] === null
          ? undefined
          : ouiNonToBoolean(situation[question]),
      ])
    )

  const [state, setState] = useState(stateFromSituation(situation))

  useEffect(() => {
    const newState = Object.fromEntries(
      Object.entries(stateFromSituation(situation)).map(([key, value]) => {
        if (state[key as DottedName] === null && value === 0) {
          return [key, null]
        }
        return [key, value]
      })
    )
    setState(newState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [situation])

  const handleSetValue = (
    dottedName: DottedName,
    value: boolean | number | undefined
  ) => {
    let newState = { ...state }

    if (
      // Case 1.a If aucun is set
      (dottedName.includes('aucun') && value === true) ||
      // Case 1.b Or if all values are undefined
      Object.values(state).every((value) => value === undefined)
    ) {
      // Then we initialize all values to null
      newState = Object.fromEntries(
        questionsOfMosaic.map((question) => [question, null])
      )
    }

    newState[dottedName] = value

    // Case 2. If some value is not (null, 0, false or undefined) then aucun is set to false
    if (
      aucunKey &&
      state[aucunKey] &&
      Object.entries(newState).some(([k, v]) => k != aucunKey && !!v)
    ) {
      newState[aucunKey] = false
    }

    setState(newState)

    const newSituation: Record<string, NodeValue> = newState

    // Case 3 If value is set to undefined (input cleared), it means « non applicable » (0 or false)
    if (value === undefined) {
      newSituation[dottedName] = null
    }

    ;(typeof value === 'number' ? setValuesLater : setValuesNow)(newSituation, {
      questionDottedName: question,
    })
  }
  return { values: state, setValue: handleSetValue }
}
