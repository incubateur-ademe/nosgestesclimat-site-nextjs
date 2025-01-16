import type { DottedName } from '@abc-transitionbascarbone/near-modele'

export function getSubcatsOfCategory(
  category: DottedName,
  subcategories: DottedName[] | undefined
): DottedName[] {
  return (
    subcategories?.filter((subcategory) => subcategory?.startsWith(category)) ??
    []
  )
}
