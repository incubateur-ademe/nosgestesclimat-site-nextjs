import getNamespace from '@/publicodes-state/helpers/getNamespace'
import { useContext } from 'react'
import simulationContext from '../../providers/simulationProvider/context'
import { DottedName, NodeValue } from '../../types'

/**
 * A hook that make available some basic functions on the engine (and the engine itself).
 *
 * It should only be used when it is needed to compare rules between them. If not, useRule should be used
 */
export default function useEngine() {
  const { engine, safeEvaluate, safeGetRule, updateSituation } =
    useContext(simulationContext)

  const getValue = (dottedName: string): NodeValue =>
    safeEvaluate(dottedName)?.nodeValue

  const getNumericValue = (dottedName: string): number => {
    const nodeValue = safeEvaluate(dottedName)?.nodeValue
    return Number(nodeValue) === nodeValue ? nodeValue : 0
  }

  const getCategory = (dottedName: DottedName): string =>
    getNamespace(dottedName, 1) ?? ''

  const getSubcategories = (dottedName: string): string[] =>
    safeGetRule(dottedName)?.rawNode?.formule?.somme

  const checkIfValid = (dottedName: string): boolean =>
    safeGetRule(dottedName) ? true : false

  return {
    engine,
    getValue,
    getNumericValue,
    getCategory,
    getSubcategories,
    checkIfValid,
    updateSituation,
  }
}
