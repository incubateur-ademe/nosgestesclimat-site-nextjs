import type {
  DottedName,
  NGCRule,
  NGCRules,
} from '@incubateur-ademe/nosgestesclimat'
import { utils } from 'publicodes'

export const getRuleTitle = (
  rule: NGCRule & { dottedName: DottedName; titre?: string }
) => {
  return rule?.titre ?? utils.nameLeaf(rule.dottedName)
}

export const getRuleTitleFromRules = (
  rules: Partial<NGCRules>,
  dottedName: DottedName
): string => {
  const rule = rules[dottedName]
  return (rule?.titre as string) ?? utils.nameLeaf(dottedName)
}
