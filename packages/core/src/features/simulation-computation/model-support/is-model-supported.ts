import { ModelRegionSchema, type Model } from '../../models/types/model.ts'

const SUPPORTED_REGIONS = new Set(ModelRegionSchema.options)

/**
 * Only the region is check because it would not be ideal to load all possible
 * versions upfront. A version that turns out not to exist fails when its rules
 * are fetched.
 */
export function isModelSupported(model: Model): boolean {
  return SUPPORTED_REGIONS.has(model.region)
}
