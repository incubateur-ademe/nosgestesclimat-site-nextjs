'use client'

import { NodeValue } from '@/publicodes-state/types'
import { useContext, useMemo } from 'react'
import { useEngine } from '../..'
import simulationContext from '../../providers/simulationProvider/context'

type EvaluatedAction = {
  dottedName: string
  value: NodeValue
}

/**
 * A hook to help with the actions display and processing.
 *
 * Not really used for now but will be essential when we redo the actions page
 */
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
        .sort((a: EvaluatedAction, b: EvaluatedAction) => {
          if (typeof a.value === 'number' && typeof b.value === 'number') {
            return a.value - b.value
          }
          // NOTE(@EmileRolley): what should be done if the values are not numbers?
        })
        .map((actionObject: EvaluatedAction) => actionObject.dottedName),
    [engine, getValue]
  )

  return {
    /**
     * Every relevant actions, ordered by value
     */
    orderedActions,
  }
}
