import { DottedName } from '@/publicodes-state/types'

// Gathered from nosgestesclimat-site
const filteredDottedNames: DottedName[] = [
  'divers . publicité',
  'services sociétaux . pression locale',
  'services sociétaux . voter',
  'divers . aider les autres',
  'divers . partage NGC',
  'transport . infolettre',
]

export const filterRelevantMissingVariables = (
  missingVariablesKeys: DottedName[],
  extendedFoldedSteps: DottedName[]
) => {
  return missingVariablesKeys.filter((dottedName: DottedName) => {
    const isFolded = extendedFoldedSteps.indexOf(dottedName) >= 0
    const isManuallyExcluded = !filteredDottedNames?.includes(dottedName)
    return isManuallyExcluded && !isFolded
  })
}
