import { useIsClient } from '@/app/_components/IsClientCtxProvider'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useDebug = (): boolean => {
  const searchParams = useSearchParams()

  const isClient = useIsClient()

  useEffect(() => {
    const debugInQueryParams = searchParams.get('debug')

    if (debugInQueryParams && isClient) {
      sessionStorage.setItem('debug', debugInQueryParams)
    }
  }, [searchParams, isClient])

  if (!isClient) return false

  const isDebug = sessionStorage.getItem('debug') === 'true' ? true : false

  return isDebug
}
