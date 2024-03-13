import { orderedCategories } from '@/constants/orderedCategories'
import { getRuleSumRules } from '@/helpers/publicodes/getRuleSumRules'
import { useDisposableEngine, useTempEngine } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { Participant } from '@/types/groups'

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
  const { rules, getRuleObject } = useTempEngine()

  const { getValue, updateSituation } = useDisposableEngine({
    rules,
    situation: {},
  })

  return groupMembers.reduce(
    (
      {
        groupFootprintByCategoriesAndSubcategories,
        userFootprintByCategoriesAndSubcategories,
      },
      groupMember: Participant
    ) => {
      const isCurrentMember = groupMember.userId === userId

      updateSituation(groupMember?.simulation?.situation || {})

      // Create a copy of the accumulator
      const updatedGroupFootprintByCategoriesAndSubcategories = {
        ...groupFootprintByCategoriesAndSubcategories,
      } as any

      const updatedUserFootprintByCategoriesAndSubcategories = {
        ...userFootprintByCategoriesAndSubcategories,
      } as any

      orderedCategories.forEach((category: any) => {
        const categoryValue = getValue(category)

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
          getSubcategories({ category, getRuleObject }) || []

        currentCategorySubcategories.forEach((subCategory: string) => {
          const subCategoryValue = getValue(subCategory)

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
