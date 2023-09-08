'use client'

import { v4 as uuidv4 } from 'uuid'
import { ActionChoices, Simulation, Situation } from '../types'

type Props = {
  simulations: Simulation[]
  setSimulations: (
    simulations: Simulation[] | ((prevSimulation: Simulation[]) => void)
  ) => void
  currentSimulationId: string
  setCurrentSimulationId: (id: string) => void
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
  }: { situation?: Situation; persona?: string } = {}) => {
    const id = uuidv4()

    setSimulations((prevSimulations: Simulation[]) => [
      ...prevSimulations,
      {
        id,
        date: new Date().toISOString(),
        situation,
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

  const getCurrentSimulation = (): Simulation | undefined =>
    simulations.find(
      (simulation: Simulation) => simulation.id === currentSimulationId
    )

  const deleteSimulation = (deletedSimulationId: string) => {
    setSimulations((prevSimulations: Simulation[]) =>
      [...prevSimulations].filter(
        (simulation: Simulation) => simulation.id !== deletedSimulationId
      )
    )
  }

  return {
    simulations,
    currentSimulation: simulations.find(
      (simulation: Simulation) => simulation.id === currentSimulationId
    ),
    currentSimulationId,
    updateSituationOfCurrentSimulation,
    updateCurrentSimulationActionChoices,
    initSimulation,
    deleteSimulation,
    getCurrentSimulation,
  }
}
