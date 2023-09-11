import { Points, ValueObject } from '@/types/groups'

const sortByDifference = (a: Points, b: Points) => {
  if (a?.resultObject?.value === b?.resultObject?.value) {
    return 0
  }

  return Math.abs(b?.resultObject?.difference || 0) <
    Math.abs(a?.resultObject?.difference || 0)
    ? -1
    : 1
}

export const getUserCategoryFootprintsSortedByDifference = ({
  userFootprintByCategoriesAndSubcategories,
}: {
  userFootprintByCategoriesAndSubcategories: Record<string, ValueObject>
}) => {
  const filteredResult = Object.entries(
    userFootprintByCategoriesAndSubcategories
  ).filter(
    ([key, resultObject]) =>
      !resultObject?.isCategory &&
      resultObject?.value !== undefined &&
      resultObject?.value !== null &&
      !isNaN(resultObject?.value) &&
      // We don't want to display the "services publics" category
      key !== 'services publics'
  )

  const formattedResult = filteredResult.map(([key, resultObject]) => ({
    key,
    resultObject,
  }))

  const positiveDifferenceCategories = formattedResult.filter(
    ({ resultObject }) =>
      resultObject?.difference && resultObject?.difference < 0
  ) as Points[]

  const negativeDifferenceCategories = formattedResult.filter(
    ({ resultObject }) =>
      resultObject?.difference && resultObject?.difference > 0
  ) as Points[]

  return {
    positiveDifferenceCategoriesSorted:
      positiveDifferenceCategories.sort(sortByDifference),
    negativeDifferenceCategoriesSorted:
      negativeDifferenceCategories.sort(sortByDifference),
  }
}
