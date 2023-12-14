import { DottedName } from '@/publicodes-state/types'

/**
 * Returns the namespace of a dotted name.
 *
 * @param {string} rule - The dotted name of the rule, it expects to be a valid
 * dotted name.
 *
 * @example
 * getNamespace('contrat salarié . ancienneté') // 'contrat salarié'
 * getNamespace('contrat salarié') // 'contrat salarié'
 * getNamespace(null) // null
 *
 */
export default function getNamespace(
  rule?: DottedName | null
): string | undefined {
  return !rule ? undefined : rule.split(' . ')[0]
}
