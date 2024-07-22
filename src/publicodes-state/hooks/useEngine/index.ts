import getNamespace from '@/publicodes-state/helpers/getNamespace'
import { useCallback, useContext } from 'react'
import { SimulationContext } from '../../providers/simulationProvider/context'
import { DottedName, Metric, NodeValue } from '../../types'

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
    safeEvaluate: safeEvaluate,
    safeGetRule,
  } = useContext(SimulationContext)

  const getValue = (dottedName: DottedName): NodeValue =>
    safeEvaluate(dottedName)?.nodeValue

  const getNumericValue = useCallback(
    (dottedName: DottedName): number => {
      const nodeValue = safeEvaluate(dottedName, metric)?.nodeValue
      return Number(nodeValue) === nodeValue ? nodeValue : 0
    },
    [safeEvaluate, metric]
  )

  const getCategory = (dottedName: DottedName): string =>
    getNamespace(dottedName, 1) ?? ''

  const getSubcategories = (dottedName: DottedName): string[] =>
    safeGetRule(dottedName)?.rawNode?.formule?.somme

  const checkIfValid = (dottedName: DottedName): boolean =>
    safeGetRule(dottedName) ? true : false

  return {
    engine,
    getValue,
    getNumericValue,
    getCategory,
    getSubcategories,
    checkIfValid,
    safeEvaluate: safeEvaluate,
    safeGetRule,
  }
}
