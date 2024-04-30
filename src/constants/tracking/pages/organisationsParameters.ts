// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

// Figma comment #100
export const organisationsParametersUpdateInformations = [
  'trackEvent',
  'Organisations Paramètres',
  'Update Informations',
]

// Figma comment #101
export const organisationsParametersLogout = [
  'trackEvent',
  'Organisations Paramètres',
  'Logout',
]

// Figma comment #117
export const organisationsParametersToggleAdditionnalQuestionsPostCode = (
  isEnabled: boolean
) => [
  'trackEvent',
  'Organisations Paramètres',
  isEnabled ? 'Enable Additionnal Questions' : 'Disable Additionnal Questions',
  'Enable or disable Postal Code',
]

// Figma comment #117
export const organisationsParametersToggleAdditionnalQuestionsBirthdate = (
  isEnabled: boolean
) => [
  'trackEvent',
  'Organisations Paramètres',
  isEnabled ? 'Enable Additionnal Questions' : 'Disable Additionnal Questions',
  'Enable or disable Birthdate',
]
