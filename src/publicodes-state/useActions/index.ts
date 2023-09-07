'use client'

import { useContext, useMemo } from 'react'
import { useEngine } from '..'
import sumulationContext from '../simulationProvider/context'

export default function useActions() {
  const { engine }: any = useContext(sumulationContext)

  const { getValue } = useEngine()

  const orderedActions = useMemo<string[]>(
    () =>
      engine
        .getRule('actions')
        .rawNode.formule.somme.map((action: string) => ({
          dottedName: action,
          value: getValue(action),
        }))
        .sort((a: any, b: any) => (a.value > b.value ? -1 : 1))
        .map((actionObject: any) => actionObject.dottedName),
    [engine, getValue]
  )

  return { orderedActions }
}
