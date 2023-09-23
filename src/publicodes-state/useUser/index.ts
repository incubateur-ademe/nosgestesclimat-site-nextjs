'use client'

import { useContext, useState } from 'react'

import userContext from '../userProvider/context'
import useActions from './useActions'
import useNorthStar from './useNorthStar'
import useSimulations from './useSimulations'
import useTutorials from './useTutorials'
import useUserDetails from './useUserDetails'

export default function useUser() {
  const [groupToRedirectToAfterTest, setGroupToRedirectToAfterTest] =
    useState<any>(undefined)

  const {
    user,
    setUser,
    tutorials,
    setTutorials,
    simulations,
    setSimulations,
    currentSimulationId,
    setCurrentSimulationId,
  } = useContext(userContext)

  const { updateName, updateEmail, updateRegion } = useUserDetails({ setUser })

  const {
    initSimulation,
    deleteSimulation,
    updateSituationOfCurrentSimulation,
    updateFoldedStepsOfCurrentSimulation,
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
    /**
     * All the information about the user (for now: name, email, region and north star rating)
     */
    user,
    /**
     * A setter for updating the user name (not used for now)
     */
    updateName,
    /**
     * A setter for updating the user email
     */
    updateEmail,
    /** A setter for updating the user current region */
    updateRegion,
    /**
     * A list of all tutorials seen by the user (that we do not need to show)
     */
    tutorials,
    /**
     * Set a tutorial to not seen (it should be displayed)
     */
    showTutorial,
    /**
     * Set a tutorial to seen (it should not be displayed)
     */
    hideTutorial,
    updateNorthStarRatings,
    simulations,
    deleteSimulation,
    currentSimulationId,
    setCurrentSimulationId,
    updateSituationOfCurrentSimulation,
    updateFoldedStepsOfCurrentSimulation,
    updateCurrentSimulationActionChoices,
    getCurrentSimulation,
    initSimulation,
    toggleActionChoice,
    rejectAction,
    groupToRedirectToAfterTest,
    setGroupToRedirectToAfterTest,
  }
}
