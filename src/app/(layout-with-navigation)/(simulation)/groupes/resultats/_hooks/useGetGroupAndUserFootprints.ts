import { useEngine, useForm } from '@/publicodes-state'
import { Member } from '@/types/groups'

export const useGetGroupAndUserFootprints = ({
  groupMembers,
  userId,
  isSynced,
}: {
  groupMembers: Member[] | undefined
  userId: string | null
  isSynced: boolean
}) => {
  const { categories } = useForm()

  const { getValue, getSubcategories } = useEngine()

  if (!groupMembers || !userId || !isSynced) return {}

  return (
    groupMembers
      // We sort the members to have the current user as last to set the engine
      .sort((a) => (a.userId === userId ? 1 : -1))
      .reduce(
        (
          {
            groupFootprintByCategoriesAndSubcategories,
            userFootprintByCategoriesAndSubcategories,
          },
          groupMember: Member
        ) => {
          // Create a copy of the accumulator
          const updatedGroupFootprintByCategoriesAndSubcategories = {
            ...groupFootprintByCategoriesAndSubcategories,
          } as any
          const updatedUserFootprintByCategoriesAndSubcategories = {
            ...userFootprintByCategoriesAndSubcategories,
          } as any

          const isCurrentMember = groupMember.userId === userId
          /*
    // Why ?
    setSituationForValidKeys({
      engine,
      situation: groupMember?.simulation?.situation,
    })
    */

          categories
            // Model shenanigans
            .map((category: string) =>
              category === 'transport' ? 'transport . empreinte' : category
            )
            .forEach((category: any) => {
              const categoryValue = getValue(category)

              const defaultCategoryObject = {
                name: category,
                value: categoryValue,
                isCategory: true,
              }

              // If the category is not in the accumulator, we add its name as a new key in the object along with its value
              // otherwise we add the value to the existing sum
              if (
                !updatedGroupFootprintByCategoriesAndSubcategories[category]
              ) {
                updatedGroupFootprintByCategoriesAndSubcategories[category] =
                  defaultCategoryObject
              } else {
                updatedGroupFootprintByCategoriesAndSubcategories[
                  category
                ].value += categoryValue
              }

              // Add each category footprint for the current member
              if (isCurrentMember) {
                updatedUserFootprintByCategoriesAndSubcategories[category] =
                  defaultCategoryObject
              }

              const currentCategorySubcategories =
                getSubcategories(
                  category === 'transport' ? 'transport . empreinte' : category
                ) || []

              currentCategorySubcategories.forEach((subCategory: string) => {
                const subCategoryValue = getValue(subCategory)

                // Same here if the property doesn't exist in the accumulator, we add it
                // otherwise we add the value to the existing sum
                if (
                  !updatedGroupFootprintByCategoriesAndSubcategories[
                    subCategory
                  ]
                ) {
                  updatedGroupFootprintByCategoriesAndSubcategories[
                    subCategory
                  ] = {
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
                  updatedUserFootprintByCategoriesAndSubcategories[
                    subCategory
                  ] = {
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
  )
}
