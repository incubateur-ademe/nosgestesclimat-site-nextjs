import { Points, ValueObject } from '@/types/groups'

export const getUserCategoryFootprintsSortedByVariation = ({
  userFootprintByCategoriesAndSubcategories,
}: {
  userFootprintByCategoriesAndSubcategories: Record<string, ValueObject>
}) => {
  return Object.entries(userFootprintByCategoriesAndSubcategories)
    .filter(
      ([key, resultObject]) =>
        !resultObject?.isCategory &&
        resultObject?.value &&
        // We don't want to display the "services publics" category
        key !== 'services publics'
    )
    .map(([key, resultObject]) => ({ key, resultObject }))
    .sort((a, b) => {
      if (a?.resultObject?.value === b?.resultObject?.value) {
        return 0
      }

      return (b?.resultObject?.variation || 0) >
        (a?.resultObject?.variation || 0)
        ? -1
        : 1
    }) as Points[]
}
