'use client'

import { useContext } from 'react'

import userContext from '../userProvider/context'
import useSimulations from './useSimulations'

export default function useUser() {
  const {
    user,
    setUser,
    simulations,
    setSimulations,
    currentSimulation,
    setCurrentSimulation,
  }: any = useContext(userContext)

  const updateName = (name: string) =>
    setUser((prevUser: any) => ({ ...prevUser, name }))

  const updateEmail = (email: string) =>
    setUser((prevUser: any) => ({ ...prevUser, email }))

  const { updateSituationOfCurrentSimulation, initSimulation } = useSimulations(
    {
      simulations,
      setSimulations,
      currentSimulation,
      setCurrentSimulation,
    }
  )

  return {
    user,
    updateName,
    updateEmail,
    simulations,
    currentSimulation,
    setCurrentSimulation,
    updateSituationOfCurrentSimulation,
    initSimulation,
  }
}
