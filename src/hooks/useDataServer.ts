import { useIsClient } from '@/app/_components/IsClientCtxProvider'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useDataServer = () => {
  const searchParams = useSearchParams()

  const isClient = useIsClient()

  useEffect(() => {
    const PRInQueryParams = searchParams.get('PR')

    if (PRInQueryParams && isClient) {
      sessionStorage.setItem('PR', PRInQueryParams)
    }
  }, [searchParams, isClient])

  const PR = isClient ? sessionStorage.getItem('PR') : null

  if (PR) {
    return `https://deploy-preview-${PR}--ecolab-data.netlify.app`
  }

  const localUrl = process.env.NEXT_PUBLIC_LOCAL_DATA_SERVER

  return localUrl ?? 'https://deploy-preview-2085--ecolab-data.netlify.app'
}
