// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { DottedName } from '@/publicodes-state/types'

// Figma comment #120
export const quizClickPass = ['trackEvent', 'Quiz', 'Click Pass']

// Figma comment #119
export const quizClickPrevious = ['trackEvent', 'Quiz', 'Click Previous']

// Figma comment #118
export const quizClickAnswer = (answer: DottedName) => [
  'trackEvent',
  'Quiz',
  'Click Answer',
  answer,
]

// Figma comment #120
export const quizValidateCorrectAnswer = (answer: DottedName) => [
  'trackEvent',
  'Quiz',
  'Validate Correct Answer',
  `Validate Correct Answer ${answer}`,
]

// Figma comment #120
export const quizValidateAlmostCorrectAnswer = (answer: DottedName) => [
  'trackEvent',
  'Quiz',
  'Validate Almost Correct Answer',
  `Validate Almost Correct Answer ${answer}`,
]

// Figma comment #120
export const quizValidateWrongAnswer = (answer: DottedName) => [
  'trackEvent',
  'Quiz',
  'Validate Wrong Answer',
  `Validate Wrong Answer ${answer}`,
]
