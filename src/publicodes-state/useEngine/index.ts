import { useContext } from 'react'
import simulationContext from '../simulationProvider/context'
import { NodeValue } from '../types'
export default function useEngine() {
  const { safeEvaluate, safeGetRule } = useContext(simulationContext)

  const getValue = (dottedName: string): NodeValue | null =>
    safeEvaluate(dottedName)?.nodeValue

  const getCategory = (dottedName: string): string => dottedName.split(' . ')[0]

  const checkIfValid = (dottedName: string): boolean =>
    safeGetRule(dottedName) ? true : false

  return {
    getValue,
    getCategory,
    checkIfValid,
  }
}
