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
  'Simulateur',
  'Open Info',
  question,
]

// Figma comment #45
export const questionCloseInfo = ({ question }: Props) => [
  'trackEvent',
  'Simulateur',
  'Close Info',
  question,
]

// Figma comment #49
export const questionClickSuivant = ({
  question,
  timeSpentOnQuestion,
}: Props) => [
  'trackEvent',
  'Simulateur',
  'Click Suivant',
  question,
  String(timeSpentOnQuestion),
]

// Figma comment #49
export const questionClickPass = ({ question, timeSpentOnQuestion }: Props) => [
  'trackEvent',
  'Simulateur',
  'Click Je ne sais pas',
  question,
  String(timeSpentOnQuestion),
]

// Figma comment #48
export const questionClickPrevious = ({ question }: Props) => [
  'trackEvent',
  'Simulateur',
  'Click Précédent',
  question,
]

// Figma comment #47
export const questionToggleAnswerInfo = ({ question }: Props) => [
  'trackEvent',
  'Simulateur',
  'Toggle Answer info',
  question,
]

// Figma comment #46
export const questionChooseAnswer = ({ question, mosaicValue }: Props) => [
  'trackEvent',
  'Simulateur',
  'Choose Answer',
  question,
  String(mosaicValue),
]

// Figma comment #51
export const questionTypeAnswer = ({ question, mosaicValue }: Props) => [
  'trackEvent',
  'Simulateur',
  'Type Answer',
  question,
  String(mosaicValue),
]

// Figma comment #50
export const questionClickSuggestion = ({ question }: Props) => [
  'trackEvent',
  'Simulateur',
  'Click Suggestion',
  question,
]

// Figma comment #52
export const questionOpenHelp = ({ question }: Props) => [
  'trackEvent',
  'Simulateur',
  'Open Help',
  question,
]

// Figma comment #52
export const questionCloseHelp = ({ question }: Props) => [
  'trackEvent',
  'Simulateur',
  'Close Help',
  question,
]

// Figma comment #53
export const questionAddHelp = ({ question }: Props) => [
  'trackEvent',
  'Simulateur',
  'Add Help',
  question,
]

// Figma comment #54
export const questionDeleteHelp = ({ question }: Props) => [
  'trackEvent',
  'Simulateur',
  'Delete Help',
  question,
]

// Figma comment #55
export const questionTypeHelp = ({ question }: Props) => [
  'trackEvent',
  'Simulateur',
  'Type Help',
  question,
]

// Figma comment #56
export const questionUpdateAltQuestion = ({ question }: Props) => [
  'trackEvent',
  'Simulateur',
  'Update Alt Question',
  question,
]
