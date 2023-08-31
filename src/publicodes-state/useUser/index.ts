'use client'

import { useContext } from 'react'

import { Simulation } from '@/types/simulation'
import userContext from '../userProvider/context'
import useSimulations from './useSimulations'

export default function useUser() {
  const {
    user,
    setUser,
    simulations,
    setSimulations,
    currentSimulationId,
    setCurrentSimulationId,
  }: any = useContext(userContext)

  const updateName = (name: string) =>
    setUser((prevUser: any) => ({ ...prevUser, name }))

  const updateEmail = (email: string) =>
    setUser((prevUser: any) => ({ ...prevUser, email }))

  const updateRegion = (region: { code: string; name: string }) =>
    setUser((prevUser: any) => ({ ...prevUser, region }))

  const deleteSimulation = (deletedSimulationId: string) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      simulations: prevUser.simulations.filter(
        (simulation: Simulation) => simulation.id !== deletedSimulationId
      ),
    }))
  }

  const { updateSituationOfCurrentSimulation, initSimulation } = useSimulations(
    {
      simulations,
      setSimulations,
      currentSimulationId,
      setCurrentSimulationId,
    }
  )

  return {
    user,
    updateName,
    updateEmail,
    updateRegion,
    simulations,
    deleteSimulation,
    currentSimulationId,
    setCurrentSimulationId,
    updateSituationOfCurrentSimulation,
    initSimulation,
  }
}
