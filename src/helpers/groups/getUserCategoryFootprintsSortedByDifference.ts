import { Points, ValueObject } from '@/types/groups'

const sortByDifference = (a: Points, b: Points, isReverse?: boolean) => {
  if (a?.resultObject?.value === b?.resultObject?.value) {
    return Math.abs(a?.resultObject?.difference ?? 0) <
      Math.abs(b?.resultObject?.difference ?? 0)
      ? 1
      : -1
  }

  return Math.abs(b?.resultObject?.value || 0) <
    Math.abs(a?.resultObject?.value || 0)
    ? isReverse
      ? 1
      : -1
    : isReverse
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

  console.log(positiveDifferenceCategories)

  const negativeDifferenceCategories = formattedResult.filter(
    ({ resultObject }) =>
      resultObject?.difference && resultObject?.difference > 0
  ) as Points[]

  return {
    positiveDifferenceCategoriesSorted: positiveDifferenceCategories.sort(
      (a, b) => sortByDifference(a, b, true)
    ),
    negativeDifferenceCategoriesSorted: negativeDifferenceCategories.sort(
      (a, b) => sortByDifference(a, b)
    ),
  }
}
