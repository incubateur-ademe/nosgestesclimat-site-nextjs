import { orderedCategories } from '@/constants/orderedCategories'
import { getRuleSumNodes } from '@/helpers/publicodes/getRuleSumNodes'
import {
  useDisposableEngine,
  useEngine,
  useTempEngine,
} from '@/publicodes-state'
import { Member } from '@/types/groups'

export function getSubcategories({
  rules,
  category,
  getRuleObject,
}: {
  rules: any
  category: string
  getRuleObject: (dottedName: string) => any
}): string[] | undefined {
  const rule = getRuleObject(category)

  return getRuleSumNodes(rules, rule)
}

export const useGetGroupAndUserFootprints = ({
  groupMembers,
  userId,
  isSynced,
}: {
  groupMembers: Member[] | undefined
  userId: string | null
  isSynced: boolean
}) => {
  const { rules, getRuleObject } = useTempEngine()

  const { getValue } = useEngine()

  const { getValue: getDisposableEngineValue, updateSituation } =
    useDisposableEngine({
      rules,
      situation: {},
    })

  if (!groupMembers || !userId || !isSynced) return {}

  return groupMembers.reduce(
    (
      {
        groupFootprintByCategoriesAndSubcategories,
        userFootprintByCategoriesAndSubcategories,
      },
      groupMember: Member
    ) => {
      const isCurrentMember = groupMember.userId === userId

      if (!isCurrentMember) {
        updateSituation(groupMember?.simulation?.situation || {})
      }

      // Create a copy of the accumulator
      const updatedGroupFootprintByCategoriesAndSubcategories = {
        ...groupFootprintByCategoriesAndSubcategories,
      } as any
      const updatedUserFootprintByCategoriesAndSubcategories = {
        ...userFootprintByCategoriesAndSubcategories,
      } as any

      orderedCategories.forEach((category: any) => {
        const categoryValue = isCurrentMember
          ? getValue(category)
          : getDisposableEngineValue(category)

        const defaultCategoryObject = {
          name: category,
          value: categoryValue,
          isCategory: true,
        }

        // If the category is not in the accumulator, we add its name as a new key in the object along with its value
        // otherwise we add the value to the existing sum
        if (!updatedGroupFootprintByCategoriesAndSubcategories[category]) {
          updatedGroupFootprintByCategoriesAndSubcategories[category] =
            defaultCategoryObject
        } else {
          updatedGroupFootprintByCategoriesAndSubcategories[category].value +=
            categoryValue
        }

        // Add each category footprint for the current member
        if (isCurrentMember) {
          updatedUserFootprintByCategoriesAndSubcategories[category] =
            defaultCategoryObject
        }

        const currentCategorySubcategories =
          getSubcategories({
            rules,
            category,
            getRuleObject,
          }) || []

        currentCategorySubcategories.forEach((subCategory: string) => {
          const subCategoryValue = isCurrentMember
            ? getValue(subCategory)
            : getDisposableEngineValue(subCategory)

          // Same here if the property doesn't exist in the accumulator, we add it
          // otherwise we add the value to the existing sum
          if (!updatedGroupFootprintByCategoriesAndSubcategories[subCategory]) {
            updatedGroupFootprintByCategoriesAndSubcategories[subCategory] = {
              name: subCategory,
              value: subCategoryValue,
            }
          } else {
            updatedGroupFootprintByCategoriesAndSubcategories[
              subCategory
            ].value += subCategoryValue
          }
          if (isCurrentMember) {
            // Add each category footprint for the current member
            updatedUserFootprintByCategoriesAndSubcategories[subCategory] = {
              name: subCategory,
              value: subCategoryValue,
            }
          }
        })
      })

      return {
        groupFootprintByCategoriesAndSubcategories:
          updatedGroupFootprintByCategoriesAndSubcategories,
        userFootprintByCategoriesAndSubcategories:
          updatedUserFootprintByCategoriesAndSubcategories,
      }
    },
    {
      groupFootprintByCategoriesAndSubcategories: {},
      userFootprintByCategoriesAndSubcategories: {},
    }
  )
}
