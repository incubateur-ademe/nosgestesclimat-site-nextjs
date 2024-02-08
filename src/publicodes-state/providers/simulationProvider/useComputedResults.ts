import { useEffect, useMemo, useRef } from 'react'
import {
  ComputedResults,
  DottedName,
  NGCEvaluatedNode,
  Situation,
} from '../../types'

type Props = {
  situation: Situation
  categories: string[]
  safeEvaluate: (ruleName: DottedName) => NGCEvaluatedNode | null
  updateSimulation: (simulation: { computedResults?: ComputedResults }) => void
}
export function useComputedResults({
  situation,
  categories,
  safeEvaluate,
  updateSimulation,
}: Props) {
  // little helper function to get the numeric value of a dottedName
  const getNumericValue = useMemo(
    () => (dottedName: DottedName) => {
      const nodeValue = safeEvaluate(dottedName)?.nodeValue
      return Number(nodeValue) === nodeValue ? nodeValue : 0
    },
    [safeEvaluate]
  )

  // Set the computed results object
  const computedResults: ComputedResults = useMemo(
    () =>
      categories.reduce(
        (acc, category) => {
          acc.categories[category] = getNumericValue(category)
          return acc
        },
        { categories: {}, bilan: getNumericValue('bilan') } as ComputedResults
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categories, getNumericValue, situation]
  )

  // Update the simulation with the computed results (only if the computed results have changed)
  const prevComputedResults = useRef<ComputedResults>(computedResults)
  useEffect(() => {
    if (prevComputedResults.current === computedResults) return

    updateSimulation({ computedResults })

    prevComputedResults.current = computedResults
  }, [computedResults, updateSimulation])

  return { computedResults }
}
