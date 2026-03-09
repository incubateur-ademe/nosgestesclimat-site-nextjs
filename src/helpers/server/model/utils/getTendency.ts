import type { Tendency } from '../simulations'

export const getTendency = ({
  previousCarbonFootprint,
  currentCarbonFootprint,
}: {
  previousCarbonFootprint?: number
  currentCarbonFootprint: number
}): Tendency | undefined => {
  if (
    !previousCarbonFootprint ||
    previousCarbonFootprint === currentCarbonFootprint
  ) {
    return undefined
  }

  if (previousCarbonFootprint < currentCarbonFootprint) return 'increase'
  return 'decrease'
}
