import { trackPageView } from '@/utils/matomo/trackEvent'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function useTrackPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    const url = `${pathname}${
      [...searchParams.keys()].length ? '?' + searchParams : ''
    }`
    trackPageView(url)
  }, [pathname, searchParams])
}
