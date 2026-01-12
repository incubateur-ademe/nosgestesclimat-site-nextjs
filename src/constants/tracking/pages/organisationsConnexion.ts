// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

// Figma comment #90
export const organisationsConnexionClickCode = [
  'trackEvent',
  'Organisations Connexion',
  'Click Renvoyer le code',
]
export const organisationsLoginComplete = [
  'trackEvent',
  'Organisations Login',
  'Verification code validé',
]

export const captureOrganisationsLoginComplete = {
  eventName: 'Organisations Login - Verification code validé',
}
