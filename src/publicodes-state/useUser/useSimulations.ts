'use client'

import { v4 as uuidv4 } from 'uuid'

type Props = {
  simulations: any[]
  setSimulations: any
  currentSimulationId: string
  setCurrentSimulationId: any
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
  }: { situation?: any; persona?: string } = {}) => {
    const id = uuidv4()
    setSimulations((prevSimulations: any[]) => [
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

  const updateSituationOfCurrentSimulation = (situationToAdd: any) => {
    if (currentSimulationId) {
      setSimulations((prevSimulation: any) => [
        ...prevSimulation.filter(
          (simulation: any) => simulation.id !== currentSimulationId
        ),
        {
          ...prevSimulation.find(
            (simulation: any) => simulation.id === currentSimulationId
          ),
          situation: {
            ...prevSimulation.find(
              (simulation: any) => simulation.id === currentSimulationId
            ).situation,
            ...situationToAdd,
          },
        },
      ])
    }
  }

  return {
    simulations,
    currentSimulationId,
    updateSituationOfCurrentSimulation,
    initSimulation,
  }
}
