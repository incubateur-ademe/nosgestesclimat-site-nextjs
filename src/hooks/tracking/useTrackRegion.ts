import { trackingRegion } from '@/constants/tracking/misc'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect } from 'react'

export function useTrackRegion() {
  const { user } = useUser()

  const { region } = user

  useEffect(() => {
    trackEvent(trackingRegion(region?.code || 'FR'))
  }, [region])
}
