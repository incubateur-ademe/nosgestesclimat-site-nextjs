import { useContext } from 'react'
import simulationContext from '../simulationProvider/context'

export default function useTempEngine() {
  const { safeEvaluate, rules, safeGetRule } = useContext(simulationContext)

  const getRuleObject = (dottedName: string): any => {
    return { ...safeEvaluate(dottedName), ...safeGetRule(dottedName) }
  }

  return {
    getRuleObject,
    rules,
  }
}
