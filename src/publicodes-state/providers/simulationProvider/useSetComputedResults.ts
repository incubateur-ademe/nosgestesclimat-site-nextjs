import { useCurrentSimulation } from '@/publicodes-state'
import { useEffect, useMemo, useRef } from 'react'
import { ComputedResults, DottedName, NGCEvaluatedNode } from '../../types'

type Props = {
  categories: string[]
  safeEvaluate: (ruleName: DottedName) => NGCEvaluatedNode | null
  isInitialized: boolean
}
export function useSetComputedResults({
  categories,
  safeEvaluate,
  isInitialized,
}: Props) {
  const { situation, updateCurrentSimulation } = useCurrentSimulation()

  // little helper function to get the numeric value of a dottedName
  const getNumericValue = useMemo(
    () => (dottedName: DottedName) => {
      const nodeValue = safeEvaluate(dottedName)?.nodeValue
      return Number(nodeValue) === nodeValue ? nodeValue : 0
    },
    [safeEvaluate]
  )

  // Set the computed results object (after engine init only)
  const computedResults: ComputedResults = useMemo(
    () => {
      if (!isInitialized) return { categories: {}, bilan: 0 }

      return categories.reduce(
        (acc, category) => {
          acc.categories[category] = getNumericValue(category)
          return acc
        },
        { categories: {}, bilan: getNumericValue('bilan') } as ComputedResults
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categories, getNumericValue, situation, isInitialized]
  )

  // Update the simulation with the computed results (only if the computed results have changed)
  const prevComputedResults = useRef<ComputedResults>({
    bilan: 0,
    categories: {},
  })
  useEffect(() => {
    if (prevComputedResults.current === computedResults) return

    updateCurrentSimulation({ computedResults })

    prevComputedResults.current = computedResults
  }, [computedResults, updateCurrentSimulation])
}
