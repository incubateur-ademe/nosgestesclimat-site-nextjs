import { useContext } from 'react'
import simulationContext from '../simulationProvider/context'

export default function useEngine() {
  const { safeEvaluate, rules, safeGetRule }: any =
    useContext(simulationContext)

  const getValue = (dottedName: string) => safeEvaluate(dottedName).nodeValue

  const checkIfValid = (dottedName: string) => safeGetRule(dottedName).rawNode

  const getRuleObject = (dottedName: string) => {
    return { ...safeEvaluate(dottedName), ...safeGetRule(dottedName) }
  }

  return {
    getValue,
    getRuleObject,
    checkIfValid,
    rules,
  }
}
