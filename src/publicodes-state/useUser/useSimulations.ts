'use client'

import { v4 as uuidv4 } from 'uuid'

type Props = {
  simulations: Object[]
  setSimulations: Function
  currentSimulation: string
  setCurrentSimulation: Function
}
export default function useSimulations({
  simulations,
  setSimulations,
  currentSimulation,
  setCurrentSimulation,
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
    setCurrentSimulation(id)
    return id
  }

  const updateSituationOfCurrentSimulation = (situationToAdd: any) => {
    if (currentSimulation) {
      setSimulations((prevSimulation: any) => [
        ...prevSimulation.filter(
          (simulation: any) => simulation.id !== currentSimulation
        ),
        {
          ...prevSimulation.find(
            (simulation: any) => simulation.id === currentSimulation
          ),
          situation: {
            ...prevSimulation.find(
              (simulation: any) => simulation.id === currentSimulation
            ).situation,
            ...situationToAdd,
          },
        },
      ])
    }
  }

  return {
    simulations,
    currentSimulation,
    updateSituationOfCurrentSimulation,
    initSimulation,
  }
}
