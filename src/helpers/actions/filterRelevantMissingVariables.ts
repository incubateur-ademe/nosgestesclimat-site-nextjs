import { MUST_NOT_ASK_QUESTIONS } from '@/publicodes-state/constants/questions'
import { checkIfDottedNameShouldNotBeIgnored } from '@/publicodes-state/helpers/checkIfDottedNameShouldNotBeIgnored'
import type { MissingVariables, SafeEvaluate } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

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
  safeEvaluate: SafeEvaluate
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
