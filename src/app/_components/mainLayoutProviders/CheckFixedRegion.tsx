import countries from '@/app/api/geolocation/countries.json'
import { useInitSimulationParam } from '@/hooks/useInitSimulationParam'
import { useUserInfosParams } from '@/hooks/useUserInfosParams'
import { useUser } from '@/publicodes-state'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
export default function CheckFixedRegion() {
  const fixedRegionCode = useSearchParams().get('region')

  const { user, updateRegion } = useUser()

  useEffect(() => {
    // Do nothing if region is the same as the user's
    if (!fixedRegionCode || fixedRegionCode === user?.region?.code) return
    const region = countries.find((country) => country.code === fixedRegionCode)
    if (region) {
      updateRegion(region)
    }
  }, [user, fixedRegionCode, updateRegion])

  // Those hooks should not be here. It will be changed with https://github.com/incubateur-ademe/nosgestesclimat-site-nextjs/pull/476
  useUserInfosParams()
  useInitSimulationParam()

  return null
}
