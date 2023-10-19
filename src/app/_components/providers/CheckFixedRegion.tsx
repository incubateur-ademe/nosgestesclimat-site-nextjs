import countries from '@/app/api/geolocation/countries.json'
import { useUser } from '@/publicodes-state'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
export default function CheckFixedRegion() {
  const fixedRegionCode = useSearchParams().get('region')

  const { user, updateRegion } = useUser()

  useEffect(() => {
    if (fixedRegionCode && fixedRegionCode !== user?.region?.code) {
      const region = countries.find(
        (country) => country.code === fixedRegionCode
      )
      if (region) {
        updateRegion(region)
      }
    }
  }, [user, fixedRegionCode, updateRegion])

  return null
}
