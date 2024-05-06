import { DottedName } from '@/publicodes-state/types'
import { NGCRule } from '@incubateur-ademe/nosgestesclimat'
import { utils } from 'publicodes'

export const getRuleTitle = (
  rule: NGCRule & { dottedName: DottedName; titre?: string }
) => {
  return rule?.titre ?? utils.nameLeaf(rule.dottedName)
}
