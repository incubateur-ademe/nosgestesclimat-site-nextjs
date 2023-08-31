import { useContext } from 'react'
import simulationContext from '../simulationProvider/context'

export default function useEngine() {
  const { safeEvaluate }: any = useContext(simulationContext)

  const getValue = (dottedName: string) => safeEvaluate(dottedName).nodeValue

  return {
    getValue,
  }
}
