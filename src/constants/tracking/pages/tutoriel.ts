// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

// Figma comment #27
export const tutorielClickPrecedent = [
  'trackEvent',
  'Tutoriel',
  'Click Précédent',
]

// Figma comment #28
export const tutorielClickSuivant = (timeSpentOnPage: number) => [
  'trackEvent',
  'Tutoriel',
  'Click Suivant',
  null,
  timeSpentOnPage,
]

// Figma comment #29
export const tutorielClickQuestion = (question: string) => [
  'trackEvent',
  'Tutoriel',
  'Click Question',
  question,
]

// Figma comment #30
export const tutorielClickFaq = ['trackEvent', 'Tutoriel', 'Click FAQ']
