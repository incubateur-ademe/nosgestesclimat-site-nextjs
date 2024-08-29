import { DottedName } from '@incubateur-ademe/nosgestesclimat'

// Gathered from nosgestesclimat-site
const filteredDottedNames: DottedName[] = [
  'divers . publicité',
  'services sociétaux . pression locale',
  'services sociétaux . voter',
  'divers . aider les autres',
  'divers . partage NGC',
  'transport . infolettre',
  'métrique',
  'déforestation',
  'logement . électricité verte',
]

export const filterRelevantMissingVariables = ({
  missingVariables,
  extendedFoldedSteps,
}: {
  missingVariables: DottedName[]
  extendedFoldedSteps: DottedName[]
}) => {
  return missingVariables.filter((dottedName: DottedName) => {
    const isFolded = extendedFoldedSteps.indexOf(dottedName) >= 0
    const isManuallyExcluded = !filteredDottedNames?.includes(dottedName)
    return isManuallyExcluded && !isFolded
  })
}
