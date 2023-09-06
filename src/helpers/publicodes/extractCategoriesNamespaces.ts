import { NGCRule, NGCRuleNode, NGCRulesNodes } from '@/types/model'
import { getRuleSumNodes } from './getRuleSumNodes'

export const extractCategoriesNamespaces = (
  rules: NGCRulesNodes,
  getValue: (dottedName: string) => NGCRule,
  parentRule = 'bilan'
) => {
  const rule = getValue(parentRule) as NGCRuleNode

  const sumNodes = getRuleSumNodes(rules, rule)

  if (sumNodes == undefined) {
    // NOTE(@EmileRolley): needed to handle custom 'services sociétaux' rule that is not a sum
    // in international models.
    return []
  }

  const categories = sumNodes.map((dottedName: string) => {
    const categoryName = dottedName.split(' . ')[0]

    const node = getValue(categoryName)

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

  return categories
}
