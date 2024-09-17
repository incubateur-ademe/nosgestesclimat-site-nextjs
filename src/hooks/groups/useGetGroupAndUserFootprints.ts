import { orderedCategories } from '@/constants/orderedCategories'
import { useDisposableEngine, useTempEngine } from '@/publicodes-state'

import {
  CategoriesAndSubcategoriesFootprintsType,
  Participant,
} from '@/types/groups'

type Props = {
  groupMembers: Participant[]
  userId: string | null
}

export const useGetGroupAndUserFootprints = ({
  groupMembers,
  userId,
}: Props): {
  currentUserCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
  groupCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
} => {
  const { rules } = useTempEngine()

  const { getValue, updateSituation, getSubcategories } = useDisposableEngine({
    rules,
    situation: {},
  })

  return groupMembers.reduce(
    (
      {
        groupCategoriesAndSubcategoriesFootprints,
        currentUserCategoriesAndSubcategoriesFootprints,
      },
      groupMember: Participant
    ) => {
      const isCurrentMember = groupMember.userId === userId

      updateSituation(groupMember?.simulation?.situation || {})

      // Create a copy of the accumulator
      const updatedGroupCategoriesAndSubcategoriesFootprints = {
        ...groupCategoriesAndSubcategoriesFootprints,
      }

      const updatedCurrentUserCategoriesAndSubcategoriesFootprints = {
        ...currentUserCategoriesAndSubcategoriesFootprints,
      }

      orderedCategories.forEach((category) => {
        const categoryRawValue = getValue(category)

        const categoryValue =
          typeof categoryRawValue === 'number' ? categoryRawValue : 0

        const defaultCategoryObject = {
          name: category,
          value: categoryValue,
          isCategory: true,
        }

        // If the category is not in the accumulator, we add its name
        // as a new key in the object along with its value otherwise we
        // add the value to the existing sum
        if (!updatedGroupCategoriesAndSubcategoriesFootprints[category]) {
          updatedGroupCategoriesAndSubcategoriesFootprints[category] =
            defaultCategoryObject
        } else {
          updatedGroupCategoriesAndSubcategoriesFootprints[category].value +=
            categoryValue
        }

        // Add each category footprint for the current member
        if (isCurrentMember) {
          updatedCurrentUserCategoriesAndSubcategoriesFootprints[category] =
            defaultCategoryObject
        }

        const currentCategorySubcategories = getSubcategories(category)
        console.log({ currentCategorySubcategories })
        currentCategorySubcategories?.forEach((subCategory) => {
          const subCategoryRawValue = getValue(subCategory)

          const subCategoryValue =
            typeof subCategoryRawValue === 'number' ? subCategoryRawValue : 0

          // Same here if the property doesn't exist in the accumulator, we add it
          // otherwise we add the value to the existing sum
          if (!updatedGroupCategoriesAndSubcategoriesFootprints[subCategory]) {
            updatedGroupCategoriesAndSubcategoriesFootprints[subCategory] = {
              name: subCategory,
              value: subCategoryValue,
            }
          } else {
            updatedGroupCategoriesAndSubcategoriesFootprints[
              subCategory
            ].value += subCategoryValue
          }

          if (isCurrentMember) {
            // Add each category footprint for the current member
            updatedCurrentUserCategoriesAndSubcategoriesFootprints[
              subCategory
            ] = {
              name: subCategory,
              value: subCategoryValue,
            }
          }
        })
      })

      return {
        groupCategoriesAndSubcategoriesFootprints:
          updatedGroupCategoriesAndSubcategoriesFootprints,
        currentUserCategoriesAndSubcategoriesFootprints:
          updatedCurrentUserCategoriesAndSubcategoriesFootprints,
      }
    },
    {
      groupCategoriesAndSubcategoriesFootprints: {},
      currentUserCategoriesAndSubcategoriesFootprints: {},
    } as {
      groupCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
      currentUserCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
    }
  )
}
