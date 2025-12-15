import { getSearchParamsClientSide } from '@/helpers/getSearchParamsClientSide'
import { useIsClient } from '@/hooks/useIsClient'
import { safeSessionStorage } from '@/utils/browser/safeSessionStorage'
import { useEffect } from 'react'

export const useDebug = () => {
  const searchParams = getSearchParamsClientSide()

  const isClient = useIsClient()

  useEffect(() => {
    const debugInQueryParams = searchParams.get('debug') ? true : false

    if (debugInQueryParams && isClient) {
      safeSessionStorage.setItem('debug', 'true')
    }
  }, [searchParams, isClient])

  if (!isClient) return false

  const isDebug = safeSessionStorage.getItem('debug') ? true : false

  return isDebug
}
