import type { ExtendedSituation } from '@incubateur-ademe/nosgestesclimat'
import initialExtendedSituation from '@incubateur-ademe/nosgestesclimat/public/initialExtendedSituation.json'

/**
 * This function is used to get the initial extended situation. It can be called directly from a server component.
 */
export function getInitialExtendedSituation(): ExtendedSituation {
  return initialExtendedSituation
}
