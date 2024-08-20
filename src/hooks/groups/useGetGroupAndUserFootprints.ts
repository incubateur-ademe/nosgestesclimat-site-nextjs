import { orderedCategories } from '@/constants/orderedCategories'
import { getRuleSumRules } from '@/helpers/publicodes/getRuleSumRules'
import { DottedName } from '@/publicodes-state/types'
import { Participant } from '@/types/groups'
import { ComputedResultsSubcategories } from './../../publicodes-state/types.d'

type Props = {
  groupMembers: Participant[]
  userId: string | null
}

export function getSubcategories({
  category,
  getRuleObject,
}: {
  category: string
  getRuleObject: (dottedName: DottedName) => any
}): DottedName[] | undefined {
  const rule = getRuleObject(category)
  return getRuleSumRules(rule)
}
export const useGetGroupAndUserFootprints = ({
  groupMembers,
  userId,
}: Props) => {
  return groupMembers.reduce(
    (
      {
        groupFootprintByCategoriesAndSubcategories,
        userFootprintByCategoriesAndSubcategories,
      },
      groupMember: Participant
    ) => {
      const isCurrentMember = groupMember.userId === userId

      // Create a copy of the accumulator
      const updatedGroupFootprintByCategoriesAndSubcategories = {
        ...groupFootprintByCategoriesAndSubcategories,
      } as any

      const updatedUserFootprintByCategoriesAndSubcategories = {
        ...userFootprintByCategoriesAndSubcategories,
      } as any

      ;(orderedCategories as [keyof ComputedResultsSubcategories]).forEach(
        (category) => {
          const categoryValue =
            groupMember?.simulation?.computedResults?.carbone?.categories[
              category
            ] || 0

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
            Object.keys(
              groupMember?.simulation?.computedResults?.carbone
                ?.subcategories?.[category] ?? {}
            ) || []

          currentCategorySubcategories.forEach((subCategory: string) => {
            const subCategoryValue =
              groupMember?.simulation?.computedResults?.carbone
                ?.subcategories?.[category]?.[subCategory] || 0

            // Same here if the property doesn't exist in the accumulator, we add it
            // otherwise we add the value to the existing sum
            if (
              !updatedGroupFootprintByCategoriesAndSubcategories[subCategory]
            ) {
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
        }
      )

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
