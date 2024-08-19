import {
  CategoriesAndSubcategoriesFootprintsType,
  PointsFortsFaiblesType,
} from '@/types/groups'

type Props = {
  currentUserCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
}

const sortByDifference = (
  a: PointsFortsFaiblesType,
  b: PointsFortsFaiblesType
) => {
  return Math.abs(b?.resultObject?.difference || 0) <
    Math.abs(a?.resultObject?.difference || 0)
    ? -1
    : 1
}

export const getUserCategoryFootprintsSortedByDifference = ({
  currentUserCategoriesAndSubcategoriesFootprints,
}: Props) => {
  const filteredResult = Object.entries(
    currentUserCategoriesAndSubcategoriesFootprints
  ).filter(
    ([key, resultObject]) =>
      !resultObject?.isCategory &&
      resultObject?.value !== undefined &&
      resultObject?.value !== null &&
      !isNaN(resultObject?.value) &&
      // We don't want to display the "services publics" category
      key !== 'services publics'
  )

  const formattedResult: PointsFortsFaiblesType[] = filteredResult.map(
    ([key, resultObject]) => ({
      key,
      resultObject,
    })
  )

  const positiveDifferenceCategories = formattedResult.filter(
    ({ resultObject }) =>
      !!resultObject?.difference && resultObject?.difference < 0
  )

  const negativeDifferenceCategories = formattedResult.filter(
    ({ resultObject }) =>
      !!resultObject?.difference && resultObject?.difference > 0
  )

  return {
    positiveDifferenceCategoriesSorted: positiveDifferenceCategories.sort(
      (a, b) => sortByDifference(a, b)
    ),
    negativeDifferenceCategoriesSorted: negativeDifferenceCategories.sort(
      (a, b) => sortByDifference(a, b)
    ),
  }
}
