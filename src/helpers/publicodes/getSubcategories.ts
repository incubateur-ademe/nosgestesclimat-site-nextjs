import { DottedName, NGCRuleNode } from '@incubateur-ademe/nosgestesclimat'
import { getRuleSumRules } from './getRuleSumRules'

export function getSubcategories({
  category,
  getRuleObject,
}: {
  category: DottedName
  getRuleObject: (dottedName: DottedName) => NGCRuleNode
}): DottedName[] | undefined {
  const rule = getRuleObject(category)

  return getRuleSumRules(rule)
}
