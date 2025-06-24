import { MUST_NOT_ASK_QUESTIONS } from '@/publicodes-state/constants/questions'
import { checkIfDottedNameShouldNotBeIgnored } from '@/publicodes-state/helpers/checkIfDottedNameShouldNotBeIgnored'
import type { MissingVariables } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { EvaluatedNode, PublicodesExpression } from 'publicodes'

export const filterRelevantMissingVariables = ({
  missingVariables,
  extendedFoldedSteps,
  everyQuestions,
  safeEvaluate,
  rawMissingVariables,
}: {
  missingVariables: DottedName[]
  extendedFoldedSteps: DottedName[]
  everyQuestions: DottedName[]
  safeEvaluate: (rule: PublicodesExpression) => EvaluatedNode | null
  rawMissingVariables: MissingVariables
}) => {
  return missingVariables.filter((dottedName: DottedName) => {
    const isFolded = extendedFoldedSteps.indexOf(dottedName) >= 0
    const isMustNotAskQuestion = MUST_NOT_ASK_QUESTIONS?.has(dottedName)
    const isRelevantQuestion = everyQuestions.includes(dottedName)

    const isApplicable = checkIfDottedNameShouldNotBeIgnored({
      dottedName,
      safeEvaluate,
      rawMissingVariables,
    })

    return (
      !isFolded && !isMustNotAskQuestion && isRelevantQuestion && isApplicable
    )
  })
}
