// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { DottedName } from '@/publicodes-state/types'

export const quizClickPass = ['trackEvent', 'Quiz', 'Click Pass']

export const quizClickPrevious = ['trackEvent', 'Quiz', 'Click Previous']

export const quizClickAnswer = (answer: DottedName) => [
  'trackEvent',
  'Quiz',
  'Click Answer',
  answer,
]

export const quizValidateCorrectAnswer = (answer: DottedName) => [
  'trackEvent',
  'Quiz',
  'Validate Correct Answer',
  answer,
]

export const quizValidateAlmostCorrectAnswer = (answer: DottedName) => [
  'trackEvent',
  'Quiz',
  'Validate Almost Correct Answer',
  answer,
]

export const quizValidateWrongAnswer = (answer: DottedName) => [
  'trackEvent',
  'Quiz',
  'Validate Wrong Answer',
  answer,
]
