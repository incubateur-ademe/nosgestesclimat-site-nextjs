import { countries } from '@/constants/localisation/countries'
import { getSearchParamsClientSide } from '@/helpers/getSearchParamsClientSide'
import { useUser } from '@/publicodes-state'
import { useEffect } from 'react'

export function useFixedRegion() {
  const searchParams = getSearchParamsClientSide()

  const fixedRegionCode = searchParams.get('region')

  const { user, updateRegion } = useUser()

  useEffect(() => {
    // Do nothing if region is the same as the user's
    if (!fixedRegionCode || fixedRegionCode === user?.region?.code) return
    const region = countries.find((country) => country.code === fixedRegionCode)
    if (region) {
      updateRegion(region)
    }
  }, [user, fixedRegionCode, updateRegion])
}
