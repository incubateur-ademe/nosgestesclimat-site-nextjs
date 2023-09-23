'use client'

import { useContext, useState } from 'react'

import userContext from '../userProvider/context'
import useActions from './useActions'
import useNorthStar from './useNorthStar'
import useSimulations from './useSimulations'
import useTutorials from './useTutorials'
import useUserDetails from './useUserDetails'

/**
 * A hook to get and set every info about a user
 *
 * Maybe it shouldn't be in publicodes-state
 */
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
    /**
     * A setter for updating the user current region
     */
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
    /**
     * Update the specified north star rating
     */
    updateNorthStarRatings,
    /**
     * A list of every simulations of the user (and their associated informations)
     */
    simulations,
    /**
     * Delete a the specified simulation
     */
    deleteSimulation,
    /**
     * Return the current simulation ID (if there is one)
     */
    currentSimulationId,
    /**
     * Set the current simulation ID
     */
    setCurrentSimulationId,
    /**
     * Update the situation of the current simulation (by adding the passed situation to the existing situation)
     */
    updateSituationOfCurrentSimulation,
    /**
     * Add a folded step to the list of folded step of the current simulation
     */
    updateFoldedStepsOfCurrentSimulation,
    /**
     * Replace the actions choices of the current simulation by the one passed
     */
    updateCurrentSimulationActionChoices,
    /**
     * Return the current simulation object
     */
    getCurrentSimulation,
    /**
     * Create a new simulation (with the situation and the persona passed if applicable), set it as current and return its ID
     */
    initSimulation,
    toggleActionChoice,
    rejectAction,
    groupToRedirectToAfterTest,
    setGroupToRedirectToAfterTest,
  }
}
