import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { EvaluatedNode, PublicodesExpression } from 'publicodes'
import type { MissingVariables } from '../types'

type Props = {
  dottedName: DottedName
  safeEvaluate: (rule: PublicodesExpression) => EvaluatedNode | null
  rawMissingVariables: MissingVariables
}

export const shouldNotBeIgnored = ({
  dottedName,
  safeEvaluate,
  rawMissingVariables,
}: Props) => {
  const isApplicable =
    safeEvaluate({ 'est applicable': dottedName })?.nodeValue === true

  const isInMissingVariables =
    Object.keys(rawMissingVariables).includes(dottedName)
  // even if the question is disabled, we want to display it if it's a missing variable
  // (this is the case for boolean question whose value is a condition for the parent).
  return isInMissingVariables || isApplicable
}
