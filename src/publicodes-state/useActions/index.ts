'use client'

import { useContext, useMemo } from 'react'
import { useEngine } from '..'
import simulationContext from '../simulationProvider/context'

type ActionObject = {
  dottedName: string
  value: number
}
export default function useActions() {
  const { engine } = useContext(simulationContext)

  const { getValue } = useEngine()

  const orderedActions = useMemo<string[]>(
    () =>
      engine
        .getRule('actions')
        .rawNode.formule.somme.map((action: string) => ({
          dottedName: action,
          value: getValue(action),
        }))
        .sort((a: ActionObject, b: ActionObject) =>
          a.value > b.value ? -1 : 1
        )
        .map((actionObject: ActionObject) => actionObject.dottedName),
    [engine, getValue]
  )

  return { orderedActions }
}
