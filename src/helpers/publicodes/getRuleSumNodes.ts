import { NGCRuleNode, NGCRulesNodes } from '@/publicodes-state/types'

export function getRuleSumNodes(
  rules: NGCRulesNodes,
  rule: NGCRuleNode
): string[] | undefined {
  const formula = rule.rawNode.formule

  if (!formula || !formula.somme) {
    return undefined
  }

  return formula.somme
    ?.map((name: string) => {
      try {
        return `${rule.dottedName} . ${name}`
      } catch (e) {
        return null
      }
    })
    .filter(Boolean)
}
