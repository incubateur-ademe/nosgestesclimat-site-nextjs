export const tutorielClickPrecedent = [
  'trackEvent',
  'Tutoriel',
  'Click Précédent',
]

export const tutorielClickSuivant = (timeSpentOnPage: number) => [
  'trackEvent',
  'Tutoriel',
  'Click Suivant',
  null,
  timeSpentOnPage,
]

export const tutorielClickQuestion = (question: string) => [
  'trackEvent',
  'Tutoriel',
  'Click Question',
  question,
]

export const tutorielClickFaq = ['trackEvent', 'Tutoriel', 'Click FAQ']
