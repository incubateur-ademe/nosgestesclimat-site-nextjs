import { DottedName, NGCRule } from '@/publicodes-state/types'
import { utils } from 'publicodes'

export const getRuleTitle = (
  rule: NGCRule & { dottedName: DottedName; titre?: string }
) => {
  return rule?.titre ?? utils.nameLeaf(rule.dottedName)
}
