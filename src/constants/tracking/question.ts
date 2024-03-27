import { DottedName } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  question: DottedName
  answer?: DottedName | number | string
  numPreviousAnswer?: number
  timeSpentOnQuestion?: number
}
export const questionOpenInfo = ({ question }: Props) => [
  'trackEvent',
  question,
  'Open Info',
]

export const questionClickSuivant = ({
  question,
  answer,
  timeSpentOnQuestion,
}: Props) => [
  'trackEvent',
  question,
  'Click Suivant',
  answer,
  timeSpentOnQuestion,
]

export const questionClickPass = ({
  question,
  answer,
  timeSpentOnQuestion,
}: Props) => [
  'trackEvent',
  question,
  'Click Je ne sais pas',
  answer,
  timeSpentOnQuestion,
]

export const questionClickPrevious = ({ question }: Props) => [
  'trackEvent',
  question,
  'Click Précédent',
]

export const questionChooseAnswer = ({
  question,
  answer,
  numPreviousAnswer,
}: Props) => [
  'trackEvent',
  question,
  'Choose Answer',
  answer,
  numPreviousAnswer,
]

export const questionTypeAnswer = ({ question, answer }: Props) => [
  'trackEvent',
  question,
  'Type Answer',
  answer,
]

export const questionClickSuggestion = ({ question, answer }: Props) => [
  'trackEvent',
  question,
  'Click Suggestion',
  answer,
]

export const questionOpenHelp = ({ question }: Props) => [
  'trackEvent',
  question,
  'Open Help',
]
export const questionCloseHelp = ({ question }: Props) => [
  'trackEvent',
  question,
  'Close Help',
]

export const questionAddHelp = ({ question }: Props) => [
  'trackEvent',
  question,
  'Add Help',
]

export const questionDeleteHelp = ({ question }: Props) => [
  'trackEvent',
  question,
  'Delete Help',
]

export const questionTypeHelp = ({ question }: Props) => [
  'trackEvent',
  question,
  'Type Help',
]

export const questionUpdateAltQuestion = ({ question, answer }: Props) => [
  'trackEvent',
  question,
  'Update Alt Question',
  answer,
]
