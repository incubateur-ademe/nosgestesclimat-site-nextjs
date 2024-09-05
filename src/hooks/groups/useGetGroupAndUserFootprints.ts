import { orderedCategories } from '@/constants/orderedCategories'
import { getRuleSumRules } from '@/helpers/publicodes/getRuleSumRules'
import {
  CategoriesAndSubcategoriesFootprintsType,
  Participant,
} from '@/types/groups'
import { DottedName, NGCRuleNode } from '@incubateur-ademe/nosgestesclimat'
import { ComputedResultsSubcategories } from './../../publicodes-state/types.d'

type Props = {
  groupMembers: Participant[]
  userId: string | null
}

export function getSubcategories({
  category,
  getSpecialRuleObject,
}: {
  category: DottedName
  getSpecialRuleObject: (dottedName: DottedName) => NGCRuleNode
}): DottedName[] | undefined {
  const rule = getSpecialRuleObject(category)

  return getRuleSumRules(rule)
}

export const useGetGroupAndUserFootprints = ({
  groupMembers,
  userId,
}: Props): {
  currentUserCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
  groupCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
} => {
  // @ts-expect-error TODO: fix this
  return groupMembers.reduce<{
    currentUserCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
    groupCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
  }>(
    // @ts-expect-error TODO: fix this
    (acc, groupMember: Participant) => {
      const {
        currentUserCategoriesAndSubcategoriesFootprints,
        groupCategoriesAndSubcategoriesFootprints,
      } = acc

      const isCurrentMember = groupMember.userId === userId

      // Create a copy of the accumulator
      const updatedGroupCategoriesAndSubcategoriesFootprints: Partial<CategoriesAndSubcategoriesFootprintsType> =
        {
          ...groupCategoriesAndSubcategoriesFootprints,
        }

      const updatedCurrentUserCategoriesAndSubcategoriesFootprints: Partial<CategoriesAndSubcategoriesFootprintsType> =
        {
          ...currentUserCategoriesAndSubcategoriesFootprints,
        }

      ;(orderedCategories as [keyof ComputedResultsSubcategories]).forEach(
        (category: keyof ComputedResultsSubcategories) => {
          const categoryRawValue =
            groupMember?.simulation?.computedResults?.carbone?.categories[
              category
            ] || 0

          orderedCategories.forEach((category) => {
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
              updatedGroupCategoriesAndSubcategoriesFootprints[
                category
              ].value += typeof categoryValue === 'number' ? categoryValue : 0
            }

            // Add each category footprint for the current member
            if (isCurrentMember) {
              updatedCurrentUserCategoriesAndSubcategoriesFootprints[category] =
                defaultCategoryObject
            }

            Object.keys(
              groupMember?.simulation?.computedResults?.carbone
                ?.subcategories?.[
                category as keyof ComputedResultsSubcategories
              ] || {}
            ).forEach((subCategory: string) => {
              const subCategoryRawValue =
                groupMember?.simulation?.computedResults?.carbone
                  ?.subcategories?.[
                  category as keyof ComputedResultsSubcategories
                ]?.[subCategory as keyof ComputedResultsSubcategories] || 0

              const subCategoryValue =
                typeof subCategoryRawValue === 'number'
                  ? subCategoryRawValue
                  : 0

              // Same here if the property doesn't exist in the accumulator, we add it
              // otherwise we add the value to the existing sum
              if (
                !updatedGroupCategoriesAndSubcategoriesFootprints[
                  subCategory as keyof ComputedResultsSubcategories
                ]
              ) {
                updatedGroupCategoriesAndSubcategoriesFootprints[
                  subCategory as keyof ComputedResultsSubcategories
                ] = {
                  name: subCategory as DottedName,
                  value: subCategoryValue,
                }
              } else {
                // @ts-expect-error TODO: fix this
                updatedGroupCategoriesAndSubcategoriesFootprints[
                  subCategory as keyof ComputedResultsSubcategories
                ].value += subCategoryValue
              }

              if (isCurrentMember) {
                // Add each category footprint for the current member
                updatedCurrentUserCategoriesAndSubcategoriesFootprints[
                  subCategory as keyof ComputedResultsSubcategories
                ] = {
                  name: subCategory as DottedName,
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

      return {
        currentUserCategoriesAndSubcategoriesFootprints:
          updatedCurrentUserCategoriesAndSubcategoriesFootprints,
        groupCategoriesAndSubcategoriesFootprints:
          updatedGroupCategoriesAndSubcategoriesFootprints,
      }
    },
    {
      currentUserCategoriesAndSubcategoriesFootprints:
        {} as CategoriesAndSubcategoriesFootprintsType,
      groupCategoriesAndSubcategoriesFootprints:
        {} as CategoriesAndSubcategoriesFootprintsType,
    }
  )
}
