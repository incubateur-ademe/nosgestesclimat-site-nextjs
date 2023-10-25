import countries from '@/app/api/geolocation/countries.json'
import { useUser } from '@/publicodes-state'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
export default function CheckFixedRegion() {
  const fixedRegionCode = useSearchParams().get('region')

  const { user, updateRegion } = useUser()

  useEffect(() => {
    console.log(fixedRegionCode, user?.region?.code)
    // Do nothing if region is the same as the user's
    if (!fixedRegionCode || fixedRegionCode === user?.region?.code) return
    console.log('wtf')
    const region = countries.find((country) => country.code === fixedRegionCode)
    if (region) {
      updateRegion(region)
    }
  }, [user, fixedRegionCode, updateRegion])

  return null
}
