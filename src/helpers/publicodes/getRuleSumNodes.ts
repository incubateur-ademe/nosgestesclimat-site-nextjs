import { NGCRuleNode, NGCRulesNodes } from '@/types/model'

const formatCategoryName = (category: string) => {
  switch (category) {
    case 'logement . impact':
      return 'logement'
    case 'transport . empreinte':
      return 'transport'
    default:
      return category
  }
}

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
        return `${formatCategoryName(rule.dottedName)} . ${name}`
      } catch (e) {
        return null
      }
    })
    .filter(Boolean)
}
