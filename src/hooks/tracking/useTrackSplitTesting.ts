import { trackingSplitTesting } from '@/constants/tracking/misc'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useEffect } from 'react'

export function useTrackSplitTesting() {
  useEffect(() => {
    trackEvent(
      trackingSplitTesting(process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || '')
    )
  }, [])
}
