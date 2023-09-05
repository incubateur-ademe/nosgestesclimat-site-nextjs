import { NGCRule, NGCRules } from '@/types/model'

export const getIsActionAmountExceeded = (
  dottedName: string,
  rules: NGCRules,
  actionChoices: Record<string, boolean>
) => {
  return (
    Object.entries(rules).find(([key, r]: [key: string, r: NGCRule]) => {
      const isExceedingAmount = r?.action?.dépasse
      console.log(isExceedingAmount)
      return (
        isExceedingAmount &&
        isExceedingAmount.includes(dottedName) &&
        (actionChoices ? actionChoices[key] : true)
      )
    }) != null
  )
}
