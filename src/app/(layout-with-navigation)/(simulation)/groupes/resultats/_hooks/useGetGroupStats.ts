import { Member, Points, Results, ValueObject } from '@/types/groups'
import { getUserCategoryFootprintsSortedByDifference } from './_helpers/getUserCategoryFootprintsSortedByDifference'
import { useGetGroupAndUserFootprints } from './useGetGroupAndUserFootprints'

const getDifferenceInPercent = ({
  value,
  mean,
}: {
  value: number
  mean: number
}) => {
  return ((value - mean) / mean) * 100
}

export const useGetGroupStats = ({
  groupMembers,
  userId,
  isSynced,
}: {
  groupMembers: Member[] | undefined
  userId: string | null
  isSynced: boolean
}) => {
  const {
    groupFootprintByCategoriesAndSubcategories,
    userFootprintByCategoriesAndSubcategories,
  } = useGetGroupAndUserFootprints({
    groupMembers,
    userId,
    isSynced,
  }) as any

  if (!groupMembers || !userId || !isSynced) return null

  const results = {
    userFootprintByCategoriesAndSubcategories: {} as Record<
      string,
      ValueObject
    >,
    groupFootprintByCategoriesAndSubcategories: {} as Record<
      string,
      ValueObject
    >,
    pointsForts: {} as Points[],
    pointsFaibles: {} as Points[],
  }

  results.groupFootprintByCategoriesAndSubcategories = {
    ...groupFootprintByCategoriesAndSubcategories,
  }
  results.userFootprintByCategoriesAndSubcategories = {
    ...userFootprintByCategoriesAndSubcategories,
  }

  // Calculate the mean for the group for each category
  Object.keys(groupFootprintByCategoriesAndSubcategories).forEach((key) => {
    // Calculate mean for the group for each category
    results.groupFootprintByCategoriesAndSubcategories[key].mean =
      results.groupFootprintByCategoriesAndSubcategories[key].value /
      groupMembers.length
  })

  // Calculate the current user variation between its value and the group mean for each category
  // and subcategory
  Object.keys(results.userFootprintByCategoriesAndSubcategories).forEach(
    (key) => {
      results.userFootprintByCategoriesAndSubcategories[key].difference =
        getDifferenceInPercent({
          value: results.userFootprintByCategoriesAndSubcategories[key].value,
          mean:
            results.groupFootprintByCategoriesAndSubcategories[key]?.mean || 0,
        })
    }
  )

  const {
    positiveDifferenceCategoriesSorted,
    negativeDifferenceCategoriesSorted,
  } = getUserCategoryFootprintsSortedByDifference({
    userFootprintByCategoriesAndSubcategories:
      results.userFootprintByCategoriesAndSubcategories,
  })

  results.pointsForts = positiveDifferenceCategoriesSorted.slice(0, 2)
  results.pointsFaibles = negativeDifferenceCategoriesSorted.slice(0, 3)

  return results as Results
}
