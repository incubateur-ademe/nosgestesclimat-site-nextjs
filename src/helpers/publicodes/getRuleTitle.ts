import { NGCRule } from '@/publicodes-state/types'

export const getRuleTitle = (
  rule: NGCRule & { dottedName: string; titre: string }
) => {
  if (!rule) return ''

  return (
    rule?.titre ??
    rule?.dottedName?.split(' . ')[rule?.dottedName.split(' . ').length - 1]
  )
}
