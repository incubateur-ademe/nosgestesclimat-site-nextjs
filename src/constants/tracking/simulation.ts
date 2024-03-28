// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { DottedName } from '@/publicodes-state/types'

export const simulationCategoryStarted = (category: DottedName) => [
  'trackEvent',
  'Simulation',
  'Category Started',
  category,
]

export const simulationCategoryCompleted = (category: DottedName) => [
  'trackEvent',
  'Simulation',
  'Category Completed',
  category,
]

export const simulationSimulationStarted = [
  'trackEvent',
  'Simulation',
  'Simulation First answer',
]

export const simulationSimulationHalfCompleted = [
  'trackEvent',
  'Simulation',
  'Simulation Half completed',
]

export const simulationSimulationCompleted = [
  'trackEvent',
  'Simulation',
  'Simulation Completed',
]
