'use client'

import { Dispatch, SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ActionChoices, Simulation, Situation } from '../types'

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
  const initSimulation = ({
    situation = {},
    persona,
    foldedSteps = [],
  }: {
    situation?: Situation
    persona?: string
    foldedSteps?: string[]
  } = {}) => {
    const id = uuidv4()

    setSimulations((prevSimulations: Simulation[]) => [
      ...prevSimulations,
      {
        id,
        date: new Date().toISOString(),
        situation,
        foldedSteps,
        actionChoices: {},
        persona,
        foldedSteps: []
      },
    ])

    setCurrentSimulationId(id)

    return id
  }

  const updateSituationOfCurrentSimulation = (situationToAdd: Situation) => {
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
  }

  const updateFoldedStepsOfCurrentSimulation = (foldedStep: string) => {
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
            foldedSteps: [...simulationUpdated.foldedSteps, foldedStep],
          },
        ]
      })
    }
  }

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

  const deleteSimulation = (deletedSimulationId: string) => {
    setSimulations((prevSimulations: Simulation[]) =>
      [...prevSimulations].filter(
        (simulation: Simulation) => simulation.id !== deletedSimulationId
      )
    )
  }

  const getCurrentSimulation = (): Simulation | undefined =>
    simulations.find(
      (simulation: Simulation) => simulation.id === currentSimulationId
    )

  return {
    simulations,
    currentSimulation: getCurrentSimulation(),
    getCurrentSimulation,
    currentSimulationId,
    updateSituationOfCurrentSimulation,
    updateFoldedStepsOfCurrentSimulation,
    updateCurrentSimulationActionChoices,
    initSimulation,
    deleteSimulation,
  }
}
