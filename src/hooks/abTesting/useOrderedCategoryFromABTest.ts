import { INVERSION_TRANSPORT_LOGEMENT_FLAG_KEY } from '@/constants/ab-test'
import {
  orderedCategories,
  testOrderedCategories,
} from '@/constants/model/orderedCategories'
import { useIsTestVersion } from './useIsTestVersion'

export const useOrderedCategoryFromABTest = () => {
  const isTestVersion = useIsTestVersion(INVERSION_TRANSPORT_LOGEMENT_FLAG_KEY)

  return isTestVersion ? testOrderedCategories : orderedCategories
}
