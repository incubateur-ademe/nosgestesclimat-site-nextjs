'use client'

import { Dispatch, SetStateAction, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  ActionChoices,
  Simulation,
  Situation,
  UpdateSimulationProps,
} from '../../types'

type Props = {
  simulations: Simulation[]
  setSimulations: Dispatch<SetStateAction<Simulation[]>>
  currentSimulationId: string
  setCurrentSimulationId: Dispatch<SetStateAction<string>>
}
export default function useSimulations({
  simulations,
  setSimulations,
  currentSimulationId,
  setCurrentSimulationId,
}: Props) {
  const resetAideSaisie = () => {
    localStorage.removeItem('transport . voiture . km')
    localStorage.removeItem(
      'transport . avion . court courrier . heures de vol'
    )
    localStorage.removeItem(
      'transport . avion . moyen courrier . heures de vol'
    )
    localStorage.removeItem('transport . avion . long courrier . heures de vol')
  }

  const initSimulation = ({
    situation = {},
    persona,
    foldedSteps = [],
    defaultAdditionalQuestionsAnswers,
    poll,
    group,
  }: {
    situation?: Situation
    persona?: string
    foldedSteps?: string[]
    defaultAdditionalQuestionsAnswers?: Record<string, string>
    poll?: string
    group?: string
  } = {}) => {
    const id = uuidv4()

    resetAideSaisie()

    setSimulations((prevSimulations: Simulation[]) => [
      ...prevSimulations,
      {
        id,
        date: new Date().toISOString(),
        situation,
        foldedSteps,
        actionChoices: {},
        persona,
        defaultAdditionalQuestionsAnswers,
        poll,
        group,
      },
    ])

    setCurrentSimulationId(id)

    return id
  }

  const updateCurrentSimulation = useCallback(
    ({
      situationToAdd,
      situationKeysToRemove,
      foldedStepToAdd,
      actionChoices,
      defaultAdditionalQuestionsAnswers,
      computedResults,
      progression,
      poll,
      group,
      savedViaEmail,
    }: UpdateSimulationProps) => {
      if (!currentSimulationId) return

      setSimulations((prevSimulations: Simulation[]) => {
        const simulationToUpdateFound = prevSimulations.find(
          (simulation: Simulation) => simulation.id === currentSimulationId
        )

        if (!simulationToUpdateFound) return prevSimulations

        const simulationToUpdate = { ...simulationToUpdateFound }

        if (situationToAdd !== undefined) {
          simulationToUpdate.situation = {
            ...simulationToUpdate.situation,
            ...situationToAdd,
          }
        }

        if (situationKeysToRemove !== undefined) {
          const situation = { ...simulationToUpdate.situation }
          for (const key of situationKeysToRemove) {
            delete situation[key]
          }
          simulationToUpdate.situation = situation
        }

        if (
          foldedStepToAdd !== undefined &&
          !simulationToUpdate.foldedSteps.includes(foldedStepToAdd)
        ) {
          simulationToUpdate.foldedSteps = [
            ...(simulationToUpdate.foldedSteps || []),
            foldedStepToAdd,
          ]
        }

        if (actionChoices !== undefined) {
          simulationToUpdate.actionChoices = actionChoices
        }

        if (defaultAdditionalQuestionsAnswers !== undefined) {
          simulationToUpdate.defaultAdditionalQuestionsAnswers =
            defaultAdditionalQuestionsAnswers
        }

        if (computedResults !== undefined) {
          simulationToUpdate.computedResults = computedResults
        }

        if (progression !== undefined) {
          simulationToUpdate.progression = progression
        }

        if (poll !== undefined) {
          simulationToUpdate.poll = poll
        }

        if (group !== undefined) {
          simulationToUpdate.group = group
        }

        if (savedViaEmail !== undefined) {
          simulationToUpdate.savedViaEmail = savedViaEmail
        }

        return [
          ...prevSimulations.filter(
            (simulation: Simulation) => simulation.id !== currentSimulationId
          ),
          simulationToUpdate,
        ]
      })
    },
    [currentSimulationId, setSimulations]
  )

  const updateSituationOfCurrentSimulation = useCallback(
    (situationToAdd: Situation) => {
      if (currentSimulationId) {
        setSimulations((prevSimulations: Simulation[]) => {
          const simulationUpdated = prevSimulations.find(
            (simulation: Simulation) => simulation.id === currentSimulationId
          )

          if (!simulationUpdated) return prevSimulations // TODO: should throw error
          return [
            ...prevSimulations.filter(
              (simulation: Simulation) => simulation.id !== currentSimulationId
            ),
            {
              ...simulationUpdated,
              situation: {
                ...simulationUpdated?.situation,
                ...situationToAdd,
              },
            },
          ]
        })
      }
    },
    [currentSimulationId, setSimulations]
  )

  const updateFoldedStepsOfCurrentSimulation = useCallback(
    (foldedStepToAdd: string) => {
      if (!currentSimulationId) return

      setSimulations((prevSimulations: Simulation[]) => {
        const simulationToUpdateFound = prevSimulations.find(
          (simulation: Simulation) => simulation.id === currentSimulationId
        )

        if (!simulationToUpdateFound) return prevSimulations

        const simulationToUpdate = { ...simulationToUpdateFound }

        if (
          foldedStepToAdd !== undefined &&
          !simulationToUpdate.foldedSteps.includes(foldedStepToAdd)
        ) {
          simulationToUpdate.foldedSteps = [
            ...(simulationToUpdate.foldedSteps || []),
            foldedStepToAdd,
          ]
        }

        return [
          ...prevSimulations.filter(
            (simulation: Simulation) => simulation.id !== currentSimulationId
          ),
          simulationToUpdate,
        ]
      })
    },
    [currentSimulationId, setSimulations]
  )

  const updateCurrentSimulationActionChoices = (
    actionChoices: ActionChoices
  ) => {
    const updatedSimulations = simulations.map((simulation) => {
      if (simulation.id === currentSimulationId) {
        return {
          ...simulation,
          actionChoices,
        }
      }
      return simulation
    })
    setSimulations(updatedSimulations)
  }

  const addSimulation = (simulation: Simulation) => {
    // Avoid duplicating simulations
    if (simulations.find((s) => s.id === simulation.id)) return

    setSimulations((prevSimulations: Simulation[]) => [
      ...prevSimulations,
      simulation,
    ])
    setCurrentSimulationId(simulation.id)
  }

  const deleteSimulation = (deletedSimulationId: string) => {
    setSimulations((prevSimulations: Simulation[]) =>
      [...prevSimulations].filter(
        (simulation: Simulation) => simulation.id !== deletedSimulationId
      )
    )
  }

  type GetCurrentSimulationProps = {
    deepCopy: boolean
  }
  const getCurrentSimulationPropsDefault = {
    deepCopy: false,
  }
  const getCurrentSimulation = ({
    deepCopy = false,
  }: GetCurrentSimulationProps = getCurrentSimulationPropsDefault):
    | Simulation
    | undefined => {
    const simulation = simulations.find(
      (simulation: Simulation) => simulation.id === currentSimulationId
    )
    if (!simulation) return undefined

    return deepCopy ? JSON.parse(JSON.stringify(simulation)) : { ...simulation }
  }
  const updateProgressionOfCurrentSimulation = useCallback(
    (progression: number) => {
      if (currentSimulationId) {
        setSimulations((prevSimulations: Simulation[]) => {
          const simulationUpdated = prevSimulations.find(
            (simulation: Simulation) => simulation.id === currentSimulationId
          )

          if (!simulationUpdated) return prevSimulations

          return [
            ...prevSimulations.filter(
              (simulation: Simulation) => simulation.id !== currentSimulationId
            ),
            {
              ...simulationUpdated,
              progression,
            },
          ]
        })
      }
    },
    [currentSimulationId, setSimulations]
  )

  return {
    simulations,
    currentSimulation: getCurrentSimulation(),
    getCurrentSimulation,
    currentSimulationId,
    updateCurrentSimulation,
    updateSituationOfCurrentSimulation,
    updateProgressionOfCurrentSimulation,
    updateFoldedStepsOfCurrentSimulation,
    updateCurrentSimulationActionChoices,
    initSimulation,
    addSimulation,
    deleteSimulation,
  }
}
