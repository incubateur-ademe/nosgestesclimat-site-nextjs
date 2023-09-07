import { useContext } from 'react'
import simulationContext from '../simulationProvider/context'

export default function useEngine() {
<<<<<<< HEAD
  const { safeEvaluate, safeGetRule }: any = useContext(simulationContext)
=======
  const { safeEvaluate, rules, safeGetRule }: any =
    useContext(simulationContext)
>>>>>>> main

  const getValue = (dottedName: string) => safeEvaluate(dottedName).nodeValue

  const checkIfValid = (dottedName: string) => safeGetRule(dottedName).rawNode

<<<<<<< HEAD
  return {
    getValue,
    checkIfValid,
=======
  const getRuleObject = (dottedName: string) => {
    return { ...safeEvaluate(dottedName), ...safeGetRule(dottedName) }
  }

  return {
    getValue,
    getRuleObject,
    checkIfValid,
    rules,
>>>>>>> main
  }
}
