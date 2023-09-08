import { NGCRule, NGCRuleNode, NGCRulesNodes } from '@/types/model'
import { getRuleSumNodes } from './getRuleSumNodes'

export const extractCategoriesObjects = (
  rules: NGCRulesNodes,
  getRuleObject: (dottedName: string) => NGCRule,
  parentRule = 'bilan'
) => {
  const rule = getRuleObject(parentRule) as NGCRuleNode

  const categories = getRuleSumNodes(rules, rule)

  if (!categories) {
    // NOTE(@EmileRolley): needed to handle custom 'services sociétaux' rule that is not a sum
    // in international models.
    return []
  }

  return categories.map((dottedName: string) => {
    const categoryName = dottedName.split(' . ')[0]

    const node = getRuleObject(categoryName)

    const { icônes, couleur } = rules[categoryName] as unknown as {
      icônes: string
      couleur: string
    }

    return {
      ...node,
      icons: icônes,
      color: couleur,
    }
  })
}
