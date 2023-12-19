import { DottedName } from '@/publicodes-state/types'

/**
 * Returns the namespace of a rule. A level can be specified to get a specific
 * part of the namespace.
 *
 * @param {DottedName} rule - The dotted name of the rule, it expects to be a valid
 * dotted name.
 * @param {number} level - The level of the namespace, by default it is 1.
 *
 * @example
 * getNamespace('contrat salarié . ancienneté . ancienneté') // 'contrat salarié'
 * getNamespace('contrat salarié . ancienneté . ancienneté', 2) // 'contrat salarié . ancienneté'
 * getNamespace('contrat salarié', 3) // 'contrat salarié'
 * getNamespace(null) // null
 *
 */
export default function getNamespace(
  rule: DottedName | undefined | null,
  level: number = 1
): string | undefined {
  if (rule === undefined || rule === null) {
    return undefined
  }
  const splittedRule = rule.split(' . ')

  if (splittedRule.length < level) {
    return rule
  }
  if (level === 1) {
    return splittedRule[0]
  }
  if (level > 1) {
    return splittedRule.slice(0, level).join(' . ')
  }
}
