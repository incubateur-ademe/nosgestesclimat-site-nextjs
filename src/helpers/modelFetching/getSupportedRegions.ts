import { SupportedRegions } from '@/publicodes-state/types'
import supportedRegions from '@incubateur-ademe/nosgestesclimat/public/supportedRegions.json'

/**
 * This function is used to get the supported regions. It can be called directly from a server component.
 */
export function getSupportedRegions(): SupportedRegions {
  return supportedRegions
}
