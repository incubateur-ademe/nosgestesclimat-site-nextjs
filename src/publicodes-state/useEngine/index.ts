import { useContext } from 'react'
import simulationContext from '../simulationProvider/context'
import { NodeValue } from '../types'

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

  const getCategory = (dottedName: string): string => dottedName.split(' . ')[0]

  const checkIfValid = (dottedName: string): boolean =>
    safeGetRule(dottedName) ? true : false

  return {
    engine,
    getValue,
    getNumericValue,
    getCategory,
    checkIfValid,
    updateSituation,
  }
}
