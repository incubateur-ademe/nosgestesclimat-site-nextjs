// Gathered from nosgestesclimat-site
const filteredDottedNames = [
  'divers . publicité',
  'services sociétaux . pression locale',
  'services sociétaux . voter',
  'divers . aider les autres',
  'divers . partage NGC',
  'transport . voiture . aide km',
  'divers . autres produits',
]

export const filterRelevantMissingVariables = (missingVariables: any) => {
  return missingVariables.filter((dottedName: string) => {
    return !filteredDottedNames.includes(dottedName)
  })
}
