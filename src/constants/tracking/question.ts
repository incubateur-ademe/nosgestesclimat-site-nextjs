// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { DottedName, NodeValue } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  question: DottedName
  answer?: DottedName | NodeValue | string
  mosaicValue?: NodeValue | string
  timeSpentOnQuestion?: number
}
// Figma comment #45
export const questionOpenInfo = ({ question }: Props) => [
  'trackEvent',
  'Calculateur',
  'Open Info',
  question,
]

// Figma comment #45
export const questionCloseInfo = ({ question }: Props) => [
  'trackEvent',
  'Calculateur',
  'Close Info',
  question,
]

// Figma comment #49
export const questionClickSuivant = ({
  question,
  timeSpentOnQuestion,
}: Props) => [
  'trackEvent',
  'Calculateur',
  'Click Suivant',
  question,
  String(timeSpentOnQuestion),
]

// Figma comment #49
export const questionClickPass = ({ question, timeSpentOnQuestion }: Props) => [
  'trackEvent',
  'Calculateur',
  'Click Je ne sais pas',
  question,
  String(timeSpentOnQuestion),
]

// Figma comment #48
export const questionClickPrevious = ({ question }: Props) => [
  'trackEvent',
  'Calculateur',
  'Click Précédent',
  question,
]

// Figma comment #47
export const questionToggleAnswerInfo = ({ question }: Props) => [
  'trackEvent',
  'Calculateur',
  'Toggle Answer info',
  question,
]

// Figma comment #46
export const questionChooseAnswer = ({ question, mosaicValue }: Props) => [
  'trackEvent',
  'Calculateur',
  'Choose Answer',
  question,
  String(mosaicValue),
]

// Figma comment #51
export const questionTypeAnswer = ({ question, mosaicValue }: Props) => [
  'trackEvent',
  'Calculateur',
  'Type Answer',
  question,
  String(mosaicValue),
]

// Figma comment #50
export const questionClickSuggestion = ({ question }: Props) => [
  'trackEvent',
  'Calculateur',
  'Click Suggestion',
  question,
]

// Figma comment #52
export const questionOpenHelp = ({ question }: Props) => [
  'trackEvent',
  'Calculateur',
  'Open Help',
  question,
]

// Figma comment #52
export const questionCloseHelp = ({ question }: Props) => [
  'trackEvent',
  'Calculateur',
  'Close Help',
  question,
]

// Figma comment #53
export const questionAddHelp = ({ question }: Props) => [
  'trackEvent',
  'Calculateur',
  'Add Help',
  question,
]

// Figma comment #54
export const questionDeleteHelp = ({ question }: Props) => [
  'trackEvent',
  'Calculateur',
  'Delete Help',
  question,
]

// Figma comment #55
export const questionTypeHelp = ({ question }: Props) => [
  'trackEvent',
  'Calculateur',
  'Type Help',
  question,
]

// Figma comment #56
export const questionUpdateAltQuestion = ({ question }: Props) => [
  'trackEvent',
  'Calculateur',
  'Update Alt Question',
  question,
]
