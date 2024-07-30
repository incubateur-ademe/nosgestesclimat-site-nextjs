import { DottedName, Rule } from '@/publicodes-state/types'
import { utils } from 'publicodes'

export const getRuleTitle = (
  rule: Rule & { dottedName: DottedName; titre?: string }
) => {
  return rule?.titre ?? utils.nameLeaf(rule.dottedName)
}
