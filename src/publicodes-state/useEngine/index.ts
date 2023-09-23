import { useContext } from 'react'
import simulationContext from '../simulationProvider/context'
import { NodeValue } from '../types'

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

  const getSubcategories = (dottedName: string) => {
    const evaluation = safeEvaluate(dottedName)
    return (
      evaluation?.rawNode?.valeur?.somme || evaluation?.rawNode?.formule?.somme
    )
  }

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
