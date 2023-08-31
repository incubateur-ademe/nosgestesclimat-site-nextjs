'use client'

import { useContext } from 'react'

import { NorthStarType, NorthStarValue } from '@/types/northstar'
import { Simulation } from '@/types/simulation'
import userContext from '../userProvider/context'
import useSimulations from './useSimulations'

export default function useUser() {
  const {
    user,
    setUser,
    tutorials,
    setTutorials,
    simulations,
    setSimulations,
    currentSimulationId,
    setCurrentSimulationId,
  }: any = useContext(userContext)

  const updateName = (name: string) =>
    setUser((prevUser: any) => ({ ...prevUser, name }))

  const updateEmail = (email: string) =>
    setUser((prevUser: any) => ({ ...prevUser, email }))

  const hideTutorial = (tutorial: string) =>
    setTutorials((prevTutorials: any) => ({
      ...prevTutorials,
      [tutorial]: true,
    }))

  const showTutorial = (tutorial: string) =>
    setTutorials((prevTutorials: any) => ({
      ...prevTutorials,
      [tutorial]: false,
    }))

  const updateRegion = (region: { code: string; name: string }) =>
    setUser((prevUser: any) => ({ ...prevUser, region }))

  const updateNorthStarRatings = ({
    type,
    value,
  }: {
    type: NorthStarType
    value: NorthStarValue
  }) =>
    setUser((prevUser: any) => ({
      ...prevUser,
      northStarRatings: {
        ...(prevUser?.northStarRatings || {}),
        [type]: value,
      },
    }))

  const getCurrentSimulation = () =>
    simulations.find((simulation: any) => simulation.id === currentSimulationId)

  const { updateSituationOfCurrentSimulation, initSimulation } = useSimulations(
    {
      simulations,
      setSimulations,
      currentSimulationId,
      setCurrentSimulationId,
    }
  )

  const deleteSimulation = (deletedSimulationId: string) => {
    setSimulations((prevSimulations: any) =>
      [...prevSimulations].filter(
        (simulation: Simulation) => simulation.id !== deletedSimulationId
      )
    )
  }

  return {
    user,
    updateName,
    updateEmail,
    updateRegion,
    tutorials,
    showTutorial,
    hideTutorial,
    updateNorthStarRatings,
    simulations,
    deleteSimulation,
    currentSimulationId,
    setCurrentSimulationId,
    getCurrentSimulation,
    updateSituationOfCurrentSimulation,
    initSimulation,
  }
}
