import supportedRegions from '@incubateur-ademe/nosgestesclimat/public/supportedRegions.json' with { type: 'json' }
import type { Model, ModelRegion } from '../../models/model.ts'

const SUPPORTED_REGIONS = new Set(
  Object.keys(supportedRegions) as ModelRegion[]
)

/**
 * Only the region is check because it would not be ideal to load all possible
 * versions upfront. A version that turns out not to exist fails when its rules
 * are fetched.
 */
export function isModelSupported(model: Model): boolean {
  return SUPPORTED_REGIONS.has(model.region)
}
