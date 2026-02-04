import { trackSplitTesting } from '@/constants/tracking/misc'
import { useEffect } from 'react'

export function useTrackSplitTesting() {
  useEffect(() => {
    trackSplitTesting(process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || '')
  }, [])
}
