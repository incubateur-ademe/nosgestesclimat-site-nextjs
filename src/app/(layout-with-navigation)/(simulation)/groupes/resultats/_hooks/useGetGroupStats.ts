import { Member, Points, Results, ValueObject } from '@/types/groups'
import { getUserCategoryFootprintsSortedByVariation } from './_helpers/getUserCategoryFootprintsSortedByVariation'
import { useGetGroupAndUserFootprints } from './useGetGroupAndUserFootprints'

const getVariation = ({ value, mean }: { value: number; mean: number }) => {
  return ((value - (mean || 0)) / (mean || 1)) * 100
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

  results.groupFootprintByCategoriesAndSubcategories =
    groupFootprintByCategoriesAndSubcategories
  results.userFootprintByCategoriesAndSubcategories =
    userFootprintByCategoriesAndSubcategories

  // Calculate the mean for the group for each category
  Object.keys(groupFootprintByCategoriesAndSubcategories).forEach((key) => {
    // Calculate mean for the group for each category
    results.groupFootprintByCategoriesAndSubcategories[key].mean =
      groupFootprintByCategoriesAndSubcategories[key].value /
      groupMembers.length
  })

  // Calculate the current user variation between its value and the group mean for each category
  // and subcategory
  Object.keys(results.userFootprintByCategoriesAndSubcategories).forEach(
    (key) => {
      results.userFootprintByCategoriesAndSubcategories[key].variation =
        getVariation({
          value: userFootprintByCategoriesAndSubcategories[key].value,
          mean: groupFootprintByCategoriesAndSubcategories[key]?.mean,
        })
    }
  )

  const userCategoriesAndSubcategoriesFootprintsSortedByVariation =
    getUserCategoryFootprintsSortedByVariation({
      userFootprintByCategoriesAndSubcategories,
    })

  results.pointsForts =
    userCategoriesAndSubcategoriesFootprintsSortedByVariation.slice(0, 2)
  results.pointsFaibles =
    userCategoriesAndSubcategoriesFootprintsSortedByVariation.slice(-3)

  return results as Results
}
