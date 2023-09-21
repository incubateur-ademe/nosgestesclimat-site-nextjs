import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useDebug = () => {
  const searchParams = useSearchParams()

  useEffect(() => {
    const debugInQueryParams = searchParams.get('debug') ? true : false
    if (debugInQueryParams) {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage?.setItem('debug', 'true')
      }
    }
  }, [searchParams])

  const isDebug =
    typeof sessionStorage !== 'undefined' && sessionStorage?.getItem('debug')
      ? true
      : false

  return isDebug
}
