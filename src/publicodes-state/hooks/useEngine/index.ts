import { getSubcategories } from '@/helpers/publicodes/getSubcategories'
import getNamespace from '@/publicodes-state/helpers/getNamespace'
import { DottedName, NodeValue } from '@incubateur-ademe/nosgestesclimat'
import { useCallback, useContext } from 'react'
import { SimulationContext } from '../../providers/simulationProvider/context'
import { Metric } from '../../types'

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
    parsedRules,
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

  const getCategory = (dottedName: DottedName): DottedName =>
    getNamespace(dottedName, 1) ?? ('' as DottedName)

  const checkIfValid = (dottedName: DottedName): boolean =>
    safeGetRule(dottedName) ? true : false

  return {
    engine,
    getValue,
    getNumericValue,
    getCategory,
    getSubcategories: (dottedName: DottedName) =>
      getSubcategories({
        dottedName,
        getRule: safeGetRule,
        parsedRules: parsedRules ?? {},
      }),
    checkIfValid,
    safeEvaluate: safeEvaluate,
    safeGetRule,
  }
}
