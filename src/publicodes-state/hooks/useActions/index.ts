'use client'

import { DottedName } from '@/publicodes-state/types'
import { useContext, useMemo } from 'react'
import { useEngine, useUser } from '../..'
import simulationContext from '../../providers/simulationProvider/context'

type ActionObject = {
  dottedName: DottedName
  value: number
}
/**
 * A hook to help with the actions display and processing.
 *
 * Not really used for now but will be essential when we redo the actions page
 */
export default function useActions() {
  const { engine } = useContext(simulationContext)

  const { getValue } = useEngine()

  const { getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

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

  const { chosenActions, declinedActions } =
    Object.keys(currentSimulation?.actionChoices ?? {})?.reduce(
      (accActions, currentAction) => {
        const actionChoice = currentSimulation?.actionChoices[currentAction]

        if (actionChoice) {
          {
            accActions.chosenActions = [
              ...accActions.chosenActions,
              currentAction,
            ]
          }
        } else {
          accActions.declinedActions = [
            ...accActions.declinedActions,
            currentAction,
          ]
        }

        return accActions
      },
      { chosenActions: [], declinedActions: [] } as {
        chosenActions: string[]
        declinedActions: string[]
      }
    ) || 0

  return {
    /**
     * Every relevant actions, ordered by value
     */
    orderedActions,
    chosenActions,
    declinedActions,
  }
}
