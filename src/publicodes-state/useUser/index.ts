'use client'

import { useContext } from 'react'

import userContext from '../userProvider/context'
import useActions from './useActions'
import useNorthStar from './useNorthStar'
import useSimulations from './useSimulations'
import useTutorials from './useTutorials'
import useUserDetails from './useUserDetails'

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

  const { updateName, updateEmail, updateRegion } = useUserDetails({ setUser })

  const {
    updateSituationOfCurrentSimulation,
    initSimulation,
    deleteSimulation,
    updateCurrentSimulationActionChoices,
    getCurrentSimulation,
  } = useSimulations({
    simulations,
    setSimulations,
    currentSimulationId,
    setCurrentSimulationId,
  })

  const { toggleActionChoice, rejectAction } = useActions({
    getCurrentSimulation,
    updateCurrentSimulationActionChoices,
  })

  const { hideTutorial, showTutorial } = useTutorials({ setTutorials })

  const { updateNorthStarRatings } = useNorthStar({ setUser })

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
    updateCurrentSimulationActionChoices,
    getCurrentSimulation,
    updateSituationOfCurrentSimulation,
    initSimulation,
    toggleActionChoice,
    rejectAction,
  }
}
