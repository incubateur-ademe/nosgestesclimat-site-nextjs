import { useContext } from 'react'
import simulationContext from '../simulationProvider/context'

export default function useEngine() {
  const { safeEvaluate, safeGetRule }: any = useContext(simulationContext)

  const getValue = (dottedName: string) => safeEvaluate(dottedName).nodeValue

  const checkIfValid = (dottedName: string) => safeGetRule(dottedName).rawNode

  return {
    getValue,
    checkIfValid,
  }
}
