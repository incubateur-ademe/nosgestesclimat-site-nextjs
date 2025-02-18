import { trackPageView } from '@/utils/analytics/trackEvent'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useGetTrackedUrl } from './useGetTrackedUrl'

export function useTrackPageView() {
  const searchParams = useSearchParams()

  const url = useGetTrackedUrl()

  useEffect(() => {
    // Skip tracking if iframe=true is present
    if (searchParams.get('iframe') === 'true') {
      return
    }

    trackPageView(url)
  }, [url, searchParams])
}
