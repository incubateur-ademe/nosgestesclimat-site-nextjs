import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useDebug = () => {
  const searchParams = useSearchParams()

  useEffect(() => {
    const debugInQueryParams = searchParams.get('debug') ? true : false
    if (debugInQueryParams && typeof window !== 'undefined') {
      sessionStorage.setItem('debug', 'true')
    }
  }, [searchParams])

  if (typeof window === 'undefined') return false

  const isDebug = sessionStorage.getItem('debug') ? true : false

  return isDebug
}
