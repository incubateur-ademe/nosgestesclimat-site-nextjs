import { useContext } from 'react'
import simulationContext from '../simulationProvider/context'

export default function useEngine() {
  const { safeEvaluate, safeGetRule }: any = useContext(simulationContext)

  const getValue = (dottedName: string) => safeEvaluate(dottedName).nodeValue

  const isValid = (dottedName: string) => safeGetRule(dottedName).rawNode

  return {
    getValue,
    isValid,
  }
}
