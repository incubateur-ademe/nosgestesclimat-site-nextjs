const filteredDottedNames = [
  'divers . publicité',
  'services sociétaux . pression locale',
  'services sociétaux . voter',
  'divers . aider les autres',
  'divers . partage NGC',
]

export const filterRelevantMissingVariables = (missingVariables: any) => {
  return missingVariables.filter((dottedName: string) => {
    return !filteredDottedNames.includes(dottedName)
  })
}
