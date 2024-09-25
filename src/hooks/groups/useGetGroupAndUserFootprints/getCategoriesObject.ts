import { Simulation } from '@/publicodes-state/types'
import {
  CategoriesAndSubcategoriesFootprintsType,
  ValueObject,
} from '@/types/groups'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'

export function getCategoriesObject({
  simulation,
  isCurrentMember,
}: {
  simulation: Simulation
  isCurrentMember: boolean
}): {
  groupCategoriesToAdd: CategoriesAndSubcategoriesFootprintsType
  userCategoriesToAdd: CategoriesAndSubcategoriesFootprintsType
} {
  const groupCategoriesToAdd = {} as CategoriesAndSubcategoriesFootprintsType
  const userCategoriesToAdd = {} as CategoriesAndSubcategoriesFootprintsType

  const categories = simulation?.computedResults?.carbone?.categories

  if (!categories) {
    return {
      groupCategoriesToAdd: {} as CategoriesAndSubcategoriesFootprintsType,
      userCategoriesToAdd: {} as CategoriesAndSubcategoriesFootprintsType,
    }
  }

  Object.entries(categories).forEach(
    ([category, categoryRawValue]) => {
      const categoryValue =
        typeof categoryRawValue === 'number' ? categoryRawValue : 0

      const defaultCategoryObject: ValueObject = {
        name: category as DottedName,
        value: categoryValue,
        isCategory: true,
      }

      // If the category is not in the accumulator, we add its name
      // as a new key in the object along with its value otherwise we
      // add the value to the existing sum
      if (
        !groupCategoriesToAdd[
          category as keyof CategoriesAndSubcategoriesFootprintsType
        ]
      ) {
        groupCategoriesToAdd[
          category as keyof CategoriesAndSubcategoriesFootprintsType
        ] = defaultCategoryObject
      } else {
        groupCategoriesToAdd[
          category as keyof CategoriesAndSubcategoriesFootprintsType
        ].value += categoryValue
      }

      // Add each category footprint for the current member
      if (isCurrentMember) {
        userCategoriesToAdd[
          category as keyof CategoriesAndSubcategoriesFootprintsType
        ] = defaultCategoryObject
      }
    },
    {
      groupCategoriesAndSubcategoriesFootprints: {},
      userCategoriesAndSubcategoriesFootprints: {},
    } as {
      groupCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
      userCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
    }
  )

  return {
    groupCategoriesToAdd,
    userCategoriesToAdd,
  }
}
