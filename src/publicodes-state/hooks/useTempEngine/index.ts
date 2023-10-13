import { useContext } from 'react'
import simulationContext from '../../providers/simulationProvider/context'

/**
 * FIXME: This is temporary and should be put to death as soon as possible
 */
export default function useTempEngine() {
  const { safeEvaluate, rules, safeGetRule } =
    useContext(simulationContext) ?? {}

  const getRuleObject = (dottedName: string): any => {
    return { ...safeEvaluate(dottedName), ...safeGetRule(dottedName) }
  }

  return {
    getRuleObject,
    rules,
  }
}
