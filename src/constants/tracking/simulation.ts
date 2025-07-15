// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

// Triggered when we see the first question of the category
export const simulationCategoryStarted = (category: DottedName) => [
  'trackEvent',
  'Simulation',
  'Category Started',
  `Category started ${category}`,
]

// Triggered when we see the last question of the category (so not really completed)
export const simulationCategoryCompleted = (category: DottedName) => [
  'trackEvent',
  'Simulation',
  'Category Completed',
  `Category completed ${category}`,
]

// Triggered when we answer the first question of the simulation
export const simulationSimulationStarted = [
  'trackEvent',
  'Simulation',
  'Simulation First answer',
]

// Triggered when we answered half of the questions of the simulation (can trigger multiple times if we add some questions after)
export const simulationSimulationHalfCompleted = [
  'trackEvent',
  'Simulation',
  'Simulation Half completed',
]

// Triggered when we answered all the questions of the simulation AND navigate to the end page.
// The bilan is the result of the simulation rounded to the ton
export const simulationSimulationCompleted = (bilan: number) => [
  'trackEvent',
  'Simulation',
  'Simulation Completed',
  null,
  String(Math.round((bilan ?? 0) / 100) / 10),
]

export const simulationSimulationTime = (time: number) => [
  'trackEvent',
  'Simulation',
  'Simulation Time',
  null,
  String(time),
]

// GTM Event for simulation completion
export const gtmSimulationCompleted = {
  event: 'end-form',
}

export const gtmSimulationStarted = {
  event: 'start-form',
}
