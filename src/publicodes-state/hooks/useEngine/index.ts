import { getDisposableEngine } from '@/publicodes-state/helpers/getDisposableEngine'
import getNamespace from '@/publicodes-state/helpers/getNamespace'
import { useCallback, useContext } from 'react'
import { SimulationContext } from '../../providers/simulationProvider/context'
import {
  ComputedResults,
  DottedName,
  Metric,
  NGCEvaluatedNode,
  NodeValue,
  Situation,
} from '../../types'

/**
 * A hook that make available some basic functions on the engine (and the engine itself).
 *
 * It should only be used when it is needed to compare rules between them. If not, useRule should be used
 */
type Props = {
  metric?: Metric
}
export default function useEngine({ metric }: Props = {}) {
  const {
    engine,
    safeEvaluate: mainEngineSafeEvaluate,
    safeGetRule,
    rules,
    categories,
  } = useContext(SimulationContext)

  const getValue = (dottedName: DottedName): NodeValue =>
    mainEngineSafeEvaluate(dottedName)?.nodeValue

  const getNumericValue = useCallback(
    (
      dottedName: DottedName,
      safeEvaluate: (
        dottedName: DottedName,
        metric?: Metric
      ) => NGCEvaluatedNode | null = mainEngineSafeEvaluate
    ): number => {
      const nodeValue = safeEvaluate(dottedName, metric)?.nodeValue
      return Number(nodeValue) === nodeValue ? nodeValue : 0
    },
    [mainEngineSafeEvaluate, metric]
  )

  const getCategory = (dottedName: DottedName): string =>
    getNamespace(dottedName, 1) ?? ''

  const getSubcategories = (dottedName: DottedName): string[] =>
    safeGetRule(dottedName)?.rawNode?.formule?.somme

  const checkIfValid = (dottedName: DottedName): boolean =>
    safeGetRule(dottedName) ? true : false

  const getComputedResults = useCallback(
    (situation: Situation) => {
      const { safeEvaluate } = getDisposableEngine({
        rules,
        situation,
      })

      return categories.reduce(
        (acc, category) => {
          acc.categories[category] = getNumericValue(category, safeEvaluate)
          return acc
        },
        {
          categories: {},
          bilan: getNumericValue('bilan'),
        } as ComputedResults
      )
    },
    [categories, getNumericValue, rules]
  )

  return {
    engine,
    getValue,
    getNumericValue,
    getCategory,
    getSubcategories,
    checkIfValid,
    safeEvaluate: mainEngineSafeEvaluate,
    safeGetRule,
    getComputedResults,
  }
}
