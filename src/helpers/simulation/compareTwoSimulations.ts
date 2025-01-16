import { defaultMetric } from '@/constants/metric'
import type { Simulation } from '@/publicodes-state/types'
import type { DottedName } from '@abc-transitionbascarbone/near-modele'

/**
 * Takes two Simulations and returns true if they are different, false otherwise.
 * (It is a deep comparison taking into account all the properties of the Simulation object)
 */
export function compareTwoSimulations(
  simulation1: Simulation,
  simulation2: Simulation
) {
  if (simulation1.id !== simulation2.id) {
    return true
  }
  if (simulation1.date !== simulation2.date) {
    return true
  }
  for (const key in simulation1.situation) {
    if (
      simulation1.situation[key as DottedName] !==
      simulation2.situation[key as DottedName]
    ) {
      return true
    }
  }
  if (simulation1.foldedSteps.length !== simulation2.foldedSteps.length) {
    return true
  } else {
    for (let i = 0; i < simulation1.foldedSteps.length; i++) {
      if (simulation1.foldedSteps[i] !== simulation2.foldedSteps[i]) {
        return true
      }
    }
  }
  for (const key in simulation1.actionChoices) {
    if (
      simulation1.actionChoices[key as DottedName] !==
      simulation2.actionChoices[key as DottedName]
    ) {
      return true
    }
  }
  if (simulation1.persona !== simulation2.persona) {
    return true
  }
  if (
    simulation1.computedResults[defaultMetric].bilan !==
    simulation2.computedResults[defaultMetric].bilan
  ) {
    return true
  }
  for (const key in simulation1.computedResults[defaultMetric].categories) {
    if (
      simulation1.computedResults[defaultMetric].categories[
        key as DottedName
      ] !==
      simulation2.computedResults[defaultMetric].categories[key as DottedName]
    ) {
      return true
    }
  }
  if (simulation1.progression !== simulation2.progression) {
    return true
  }
  if (
    simulation1.defaultAdditionalQuestionsAnswers !==
    simulation2.defaultAdditionalQuestionsAnswers
  ) {
    return true
  }
  if (
    (simulation1.groups?.length ?? 0) !== (simulation2?.groups?.length ?? 0)
  ) {
    return true
  } else {
    for (let i = 0; i < (simulation1.groups?.length ?? 0); i++) {
      if (simulation1.groups?.[i] !== simulation2.groups?.[i]) {
        return true
      }
    }
  }
  if ((simulation1.polls?.length ?? 0) !== (simulation2?.polls?.length ?? 0)) {
    return true
  } else {
    for (let i = 0; i < (simulation1.polls?.length ?? 0); i++) {
      if (simulation1.polls?.[i] !== simulation2.polls?.[i]) {
        return true
      }
    }
  }

  return false
}
