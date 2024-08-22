import { orderedCategories } from '@/constants/orderedCategories'
import { getRuleSumRules } from '@/helpers/publicodes/getRuleSumRules'
import { useDisposableEngine, useTempEngine } from '@/publicodes-state'
import {
  CategoriesAndSubcategoriesFootprintsType,
  Participant,
} from '@/types/groups'
import { DottedName, NGCRuleNode } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  groupMembers: Participant[]
  userId: string | null
}

export function getSubcategories({
  category,
  getRuleObject,
}: {
  category: DottedName
  getRuleObject: (dottedName: DottedName) => NGCRuleNode
}): DottedName[] | undefined {
  const rule = getRuleObject(category)

  return getRuleSumRules(rule)
}

export const useGetGroupAndUserFootprints = ({
  groupMembers,
  userId,
}: Props): {
  currentUserCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
  groupCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
} => {
  const { rules, getRuleObject } = useTempEngine()

  const { getValue, updateSituation } = useDisposableEngine({
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
          value: categoryValue ?? 0,
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
            typeof categoryValue === 'number' ? categoryValue : 0
        }

        // Add each category footprint for the current member
        if (isCurrentMember) {
          updatedCurrentUserCategoriesAndSubcategoriesFootprints[category] =
            defaultCategoryObject
        }

        const currentCategorySubcategories =
          getSubcategories({ category, getRuleObject }) || []

        currentCategorySubcategories.forEach((subCategory) => {
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
