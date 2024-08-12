import { defaultMetric, metrics } from '@/constants/metric'
import { getSubcategoriesFromRule } from '@/helpers/publicodes/getSubcategoriesFromRule'
import { useCurrentSimulation } from '@/publicodes-state'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  ComputedResults,
  ComputedResultsFootprint,
  Metric,
  NGCEvaluatedNode,
  NGCRuleNode,
  DottedName as OldDottedName,
} from '../../types'

type Props = {
  categories: OldDottedName[]
  isEngineInitialized: boolean
  safeEvaluate: (
    ruleName: OldDottedName,
    metric: Metric
  ) => NGCEvaluatedNode | null
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
}
export function useSetComputedResults({
  categories,
  safeEvaluate,
  isEngineInitialized,
  safeGetRule,
}: Props) {
  const { situation, updateCurrentSimulation } = useCurrentSimulation()

  // little helper function to get the numeric value of a dottedName (it is a copy of the one in useEngine)
  const getNumericValue = useCallback(
    (dottedName: OldDottedName, metric: Metric): number => {
      // If the engine is not initialized, we return 0
      if (!isEngineInitialized) return 0

      const nodeValue = safeEvaluate(dottedName, metric)?.nodeValue
      return Number(nodeValue) === nodeValue ? nodeValue : 0
    },
    [safeEvaluate, isEngineInitialized]
  )

  // Set the computed results object (after engine init only)
  const computedResults: ComputedResults = useMemo(
    () =>
      metrics.reduce((acc, metric) => {
        acc[metric] = categories.reduce(
          (acc, category) => {
            acc.categories[category] = getNumericValue(category, metric)

            const subcategories = getSubcategoriesFromRule({
              category,
              getRule: ((dottedName: DottedName) =>
                safeGetRule(dottedName)) as any,
            })

            console.log(subcategories)

            if (!subcategories) return acc

            acc.subcategories[category] = subcategories.reduce(
              (subAcc, subcategory) => {
                subAcc[subcategory] = getNumericValue(subcategory, metric)

                return subAcc
              },
              {} as { [key in OldDottedName]: number }
            )

            return acc
          },
          {
            categories: {},
            subcategories: {},
            bilan: getNumericValue('bilan', metric),
          } as ComputedResultsFootprint
        )
        return acc
      }, {} as ComputedResults),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categories, getNumericValue, situation]
  )

  // Update the simulation with the computed results (only if the computed results have changed)
  const prevComputedResults = useRef<ComputedResults>(computedResults)
  useEffect(() => {
    if (prevComputedResults.current === computedResults) return

    updateCurrentSimulation({ computedResults })

    prevComputedResults.current = computedResults
  }, [computedResults, updateCurrentSimulation])

  const isInitialized = useMemo(
    () => computedResults[defaultMetric].bilan !== 0,
    [computedResults]
  )

  return { isInitialized }
}
