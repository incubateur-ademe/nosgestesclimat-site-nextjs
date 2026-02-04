import { trackRegion } from '@/constants/tracking/misc'
import { useUser } from '@/publicodes-state'
import { useEffect } from 'react'

export function useTrackRegion() {
  const { user } = useUser()

  const { region } = user

  useEffect(() => {
    const regionCode = region?.code || 'FR'
    trackRegion(regionCode)
  }, [region])
}
