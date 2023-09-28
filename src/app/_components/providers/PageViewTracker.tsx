import { trackPageView } from '@/utils/matomo/trackEvent'
import { usePathname, useSearchParams } from 'next/navigation'
import { PropsWithChildren, useEffect, useRef } from 'react'

export default function PageViewTracker({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const trackedPathnameAndSearchParamsRef = useRef({
    pathname: '',
    searchParams: '',
  })

  useEffect(() => {
    const searchParamsChecked = (
      [...searchParams.keys()].length ? searchParams : ''
    ) as string
    if (
      trackedPathnameAndSearchParamsRef.current.pathname === pathname &&
      trackedPathnameAndSearchParamsRef.current.searchParams ===
        searchParamsChecked
    ) {
      return
    }

    const url = `${pathname}${
      [...searchParams.keys()].length ? '?' + searchParams : ''
    }`

    trackedPathnameAndSearchParamsRef.current = {
      pathname,
      searchParams: searchParamsChecked,
    }

    trackPageView(url)
  }, [pathname, searchParams])

  return <>{children}</>
}
