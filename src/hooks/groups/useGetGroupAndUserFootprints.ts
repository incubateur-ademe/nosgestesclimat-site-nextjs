import {
  CategoriesAndSubcategoriesFootprintsType,
  Participant,
} from '@/types/groups'
import { getCategoriesObject } from './useGetGroupAndUserFootprints/getCategoriesObject'
import { getSubcategoriesObject } from './useGetGroupAndUserFootprints/getSubcategoriesObject'

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
  return groupMembers.reduce<{
    currentUserCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
    groupCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
  }>(
    (acc, groupMember: Participant) => {
      const {
        currentUserCategoriesAndSubcategoriesFootprints,
        groupCategoriesAndSubcategoriesFootprints,
      } = acc

      const isCurrentMember = groupMember.userId === userId

      // Create a copy of the accumulator
      const accGroupCategoriesAndSubcategoriesFootprints = {
        ...groupCategoriesAndSubcategoriesFootprints,
      }

      const accCurrentUserCategoriesAndSubcategoriesFootprints = {
        ...currentUserCategoriesAndSubcategoriesFootprints,
      }

      const { groupCategoriesToAdd, userCategoriesToAdd } = getCategoriesObject(
        {
          simulation: groupMember.simulation,
          isCurrentMember,
          groupAccumulator: accGroupCategoriesAndSubcategoriesFootprints,
        }
      )

      const { groupSubcategoriesToAdd, userSubcategoriesToAdd } =
        getSubcategoriesObject({
          simulation: groupMember.simulation,
          isCurrentMember,
          groupAccumulator: accGroupCategoriesAndSubcategoriesFootprints,
        })

      return {
        currentUserCategoriesAndSubcategoriesFootprints: {
          ...accCurrentUserCategoriesAndSubcategoriesFootprints,
          ...userCategoriesToAdd,
          ...userSubcategoriesToAdd,
        },
        groupCategoriesAndSubcategoriesFootprints: {
          ...accGroupCategoriesAndSubcategoriesFootprints,
          ...groupCategoriesToAdd,
          ...groupSubcategoriesToAdd,
        },
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
