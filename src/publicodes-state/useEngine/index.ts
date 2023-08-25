import { useContext } from 'react'
import simulationContext from '../simulationProvider/context'

export default function useEngine() {
  const { engine }: any = useContext(simulationContext)

  const getValue = (dottedName: string) => engine.evaluate(dottedName).nodeValue

  return {
    getValue,
  }
}
