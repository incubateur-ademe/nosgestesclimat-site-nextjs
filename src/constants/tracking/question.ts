// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { DottedName, NodeValue } from '@/publicodes-state/types'

type Props = {
  question: DottedName
  answer?: DottedName | NodeValue | string
  mosaicValue?: NodeValue | string
  timeSpentOnQuestion?: number
}
// Figma comment #45
export const questionOpenInfo = ({ question }: Props) => [
  'trackEvent',
  question,
  'Open Info',
]

// Figma comment #45
export const questionCloseInfo = ({ question }: Props) => [
  'trackEvent',
  question,
  'Close Info',
]

// Figma comment #49
export const questionClickSuivant = ({
  question,
  answer,
  timeSpentOnQuestion,
}: Props) => [
  'trackEvent',
  question,
  'Click Suivant',
  String(answer),
  String(timeSpentOnQuestion),
]

// Figma comment #49
export const questionClickPass = ({ question, timeSpentOnQuestion }: Props) => [
  'trackEvent',
  question,
  'Click Je ne sais pas',
  null,
  String(timeSpentOnQuestion),
]

// Figma comment #48
export const questionClickPrevious = ({ question }: Props) => [
  'trackEvent',
  question,
  'Click Précédent',
]

// Figma comment #47
export const questionToggleAnswerInfo = ({ question, answer }: Props) => [
  'trackEvent',
  question,
  'Toggle Answer info',
  answer,
]

// Figma comment #46
export const questionChooseAnswer = ({
  question,
  answer,
  mosaicValue,
}: Props) => [
  'trackEvent',
  question,
  'Choose Answer',
  String(answer),
  String(mosaicValue),
]

// Figma comment #51
export const questionTypeAnswer = ({
  question,
  answer,
  mosaicValue,
}: Props) => [
  'trackEvent',
  question,
  'Type Answer',
  String(answer),
  String(mosaicValue),
]

// Figma comment #50
export const questionClickSuggestion = ({ question, answer }: Props) => [
  'trackEvent',
  question,
  'Click Suggestion',
  String(answer),
]

// Figma comment #52
export const questionOpenHelp = ({ question }: Props) => [
  'trackEvent',
  question,
  'Open Help',
]

// Figma comment #52
export const questionCloseHelp = ({ question }: Props) => [
  'trackEvent',
  question,
  'Close Help',
]

// Figma comment #53
export const questionAddHelp = ({ question }: Props) => [
  'trackEvent',
  question,
  'Add Help',
]

// Figma comment #54
export const questionDeleteHelp = ({ question }: Props) => [
  'trackEvent',
  question,
  'Delete Help',
]

// Figma comment #55
export const questionTypeHelp = ({ question }: Props) => [
  'trackEvent',
  question,
  'Type Help',
]

// Figma comment #56
export const questionUpdateAltQuestion = ({ question, answer }: Props) => [
  'trackEvent',
  question,
  'Update Alt Question',
  answer,
]
