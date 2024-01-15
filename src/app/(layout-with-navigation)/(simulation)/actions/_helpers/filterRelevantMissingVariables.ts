import { DottedName } from '@/publicodes-state/types'

// Gathered from nosgestesclimat-site
const filteredDottedNames: DottedName[] = [
  'divers . publicité',
  'services sociétaux . pression locale',
  'services sociétaux . voter',
  'divers . aider les autres',
  'divers . partage NGC',
  'transport . voiture . aide km',
  'divers . autres produits',
]

export const filterRelevantMissingVariables = (missingVariables: any) => {
  return missingVariables.filter((dottedName: DottedName) => {
    return !filteredDottedNames.includes(dottedName)
  })
}
