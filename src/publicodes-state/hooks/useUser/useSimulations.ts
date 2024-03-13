'use client'

import { Dispatch, SetStateAction, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ActionChoices, Simulation, Situation } from '../../types'

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
  }: {
    situation?: Situation
    persona?: string
    foldedSteps?: string[]
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

  const getCurrentSimulation = (): Simulation | undefined =>
    simulations.find(
      (simulation: Simulation) => simulation.id === currentSimulationId
    )

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
    updateSituationOfCurrentSimulation,
    updateProgressionOfCurrentSimulation,
    updateFoldedStepsOfCurrentSimulation,
    updateCurrentSimulationActionChoices,
    initSimulation,
    addSimulation,
    deleteSimulation,
  }
}
