'use client'

import { carboneMetric } from '@/constants/metric'
import getSomme from '@/publicodes-state/helpers/getSomme'
import { Metric } from '@/publicodes-state/types'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useContext, useMemo } from 'react'
import { useEngine } from '../..'
import { SimulationContext } from '../../contexts/simulationContext/context'
import useCurrentSimulation from '../simulation/useCurrentSimulation'

type Props = {
  metric: Metric
}
type ActionObject = {
  dottedName: DottedName
  value: number
}
/**
 * A hook to help with the actions display and processing.
 *
 * Not really used for now but will be essential when we redo the actions page
 */
export default function useActions(
  { metric }: Props = { metric: carboneMetric }
) {
  const { engine } = useContext(SimulationContext)

  const { getNumericValue } = useEngine({ metric })

  const { actionChoices } = useCurrentSimulation()

  const actions = useMemo(() => {
    if (engine === null) return []

    const actionsRule = engine.getRule('actions')
    const somme = getSomme(actionsRule.rawNode)

    if (!somme) {
      console.error('No actions found')
      return []
    }

    return somme
  }, [engine])

  const orderedActions = useMemo(() => {
    return actions
      .map((action) => ({
        dottedName: action,
        value: getNumericValue(action),
      }))
      .sort((a: ActionObject, b: ActionObject) => (a.value > b.value ? -1 : 1))
      .map((actionObject: ActionObject) => actionObject.dottedName)
  }, [actions, getNumericValue])

  const { chosenActions, declinedActions } =
    Object.keys(actionChoices ?? {}).reduce(
      (accActions, currentAction) => {
        const actionChoice = actionChoices[currentAction]

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

  const totalChosenActionsValue: number = useMemo(
    () =>
      chosenActions.reduce(
        (acc, action) => acc + getNumericValue(action as DottedName),
        0
      ),
    [chosenActions, getNumericValue]
  )

  return {
    actions,
    orderedActions,
    chosenActions,
    declinedActions,
    totalChosenActionsValue,
  }
}
