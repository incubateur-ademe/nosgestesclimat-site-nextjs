import { DottedName } from '@/publicodes-state/types'
import { NGCRuleNode } from '@incubateur-ademe/nosgestesclimat'
import { getRuleSumRules } from './getRuleSumRules'

// This helper allows us to get the list of subcategories without relying directly
// on a context hook
export function getSubcategoriesFromRule({
  category,
  getRule,
}: {
  category: DottedName
  getRule: (dottedName: DottedName) => NGCRuleNode | null
}): DottedName[] | undefined {
  const rule = getRule(category)

  if (!rule) return []

  return getRuleSumRules(rule)
}
