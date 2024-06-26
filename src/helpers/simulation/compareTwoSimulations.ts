import { Simulation } from '@/publicodes-state/types'

/**
 * Takes two Simulations and returns true if they are different, false otherwise.
 * (It is a deep comparison taking into account all the properties of the Simulation object)
 */
export function compareTwoSimulations(
  simulation1: Simulation,
  simulation2: Simulation
) {
  let hasChanged = false

  if (simulation1.id !== simulation2.id) {
    hasChanged = true
  }
  if (simulation1.date !== simulation2.date) {
    hasChanged = true
  }
  for (const key in simulation1.situation) {
    if (simulation1.situation[key] !== simulation2.situation[key]) {
      hasChanged = true
      break
    }
  }
  if (simulation1.foldedSteps.length !== simulation2.foldedSteps.length) {
    hasChanged = true
  } else {
    for (let i = 0; i < simulation1.foldedSteps.length; i++) {
      if (simulation1.foldedSteps[i] !== simulation2.foldedSteps[i]) {
        hasChanged = true
        break
      }
    }
  }
  for (const key in simulation1.actionChoices) {
    if (simulation1.actionChoices[key] !== simulation2.actionChoices[key]) {
      hasChanged = true
      break
    }
  }
  if (simulation1.persona !== simulation2.persona) {
    hasChanged = true
  }
  if (simulation1.computedResults.bilan !== simulation2.computedResults.bilan) {
    hasChanged = true
  }
  for (const key in simulation1.computedResults.categories) {
    if (
      simulation1.computedResults.categories[key] !==
      simulation2.computedResults.categories[key]
    ) {
      hasChanged = true
      break
    }
  }
  if (simulation1.progression !== simulation2.progression) {
    hasChanged = true
  }
  if (
    simulation1.defaultAdditionalQuestionsAnswers !==
    simulation2.defaultAdditionalQuestionsAnswers
  ) {
    hasChanged = true
  }
  if (
    (simulation1.groups?.length ?? 0) !== (simulation2?.groups?.length ?? 0)
  ) {
    hasChanged = true
  } else {
    for (let i = 0; i < (simulation1.groups?.length ?? 0); i++) {
      if (simulation1.groups?.[i] !== simulation2.groups?.[i]) {
        hasChanged = true
        break
      }
    }
  }
  if ((simulation1.polls?.length ?? 0) !== (simulation2?.polls?.length ?? 0)) {
    hasChanged = true
  } else {
    for (let i = 0; i < (simulation1.polls?.length ?? 0); i++) {
      if (simulation1.polls?.[i] !== simulation2.polls?.[i]) {
        hasChanged = true
        break
      }
    }
  }
  if (simulation1.savedViaEmail !== simulation2.savedViaEmail) {
    hasChanged = true
  }

  return hasChanged
}
