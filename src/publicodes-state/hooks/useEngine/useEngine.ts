import getNamespace from '@/publicodes-state/helpers/getNamespace'
import getSomme from '@/publicodes-state/helpers/getSomme'
import type { DottedName, NodeValue } from '@incubateur-ademe/nosgestesclimat'
import { useCallback, useContext } from 'react'
import { SimulationContext } from '../../providers/simulationProvider/context'
import type { Metric } from '../../types'

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

  const getCategory = (dottedName: DottedName): DottedName =>
    getNamespace(dottedName, 1) ?? ('' as DottedName)

  const checkIfValid = (dottedName: DottedName): boolean =>
    safeGetRule(dottedName) ? true : false

  const getSubcategories = useCallback(
    (dottedName: DottedName) =>
      (getSomme(safeGetRule(dottedName)?.rawNode) || []).map(
        (subCategory) =>
          `${dottedName as string} . ${subCategory as string}` as DottedName
      ),
    [safeGetRule]
  )

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
