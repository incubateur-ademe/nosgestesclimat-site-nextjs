import { DottedName } from '../types'

export function getNumericValue(
  dottedName: DottedName,
  safeEvaluate: (ruleName: DottedName) => any
) {
  const nodeValue = safeEvaluate(dottedName)?.nodeValue
  return Number(nodeValue) === nodeValue ? nodeValue : 0
}
