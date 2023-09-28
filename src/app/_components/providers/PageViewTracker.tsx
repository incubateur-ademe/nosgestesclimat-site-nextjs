import { trackPageView } from '@/utils/matomo/trackEvent'
import { usePathname, useSearchParams } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

export default function PageViewTracker({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    const url = `${pathname}${
      [...searchParams.keys()].length ? '?' + searchParams : ''
    }`
    // We do not want to track the form without the queston attached
    if (url === '/simulateur/bilan') {
      return
    }
    trackPageView(url)
  }, [pathname, searchParams])

  return <>{children}</>
}
