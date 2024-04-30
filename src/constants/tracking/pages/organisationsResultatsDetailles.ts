// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

// Figma comment #102
export const organisationsResultatsDetaillesFilterByAge = (range: string) => [
  'trackEvent',
  'Organisations Resultats Détaillés',
  'Filter by age',
  `Filter by age ${range}`,
]

// Figma comment #103
export const organisationsResultatsDetaillesFilterByPostalCode = (
  postalCode: string
) => [
  'trackEvent',
  'Organisations Resultats Détaillés',
  'Filter by postal code',
  `Filter by postal code ${postalCode}`,
]

// Figma comment #104
export const organisationsResultatsDetaillesClickInfos = [
  'trackEvent',
  'Organisations Resultats Détaillés',
  'Click Infos',
]
