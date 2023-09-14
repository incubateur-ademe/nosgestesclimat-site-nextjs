import { useIsClient } from '@/app/_components/IsClientCtxProvider'
import { useSearchParams } from 'next/navigation'

const PR_NUMBER_KEY = 'PR'

export function useGetPRNumber(): string {
  const isClient = useIsClient()
  const searchParams = useSearchParams()

  if (!isClient) {
    return ''
  }

  const PRNumberFromURL = searchParams.get('PR')

  const savedPRNumber = isClient && localStorage.getItem(PR_NUMBER_KEY)

  if (savedPRNumber && !PRNumberFromURL) {
    return localStorage.getItem(PR_NUMBER_KEY) ?? ''
  }

  if (PRNumberFromURL) {
    localStorage.setItem(PR_NUMBER_KEY, PRNumberFromURL)
  }

  return PRNumberFromURL ?? ''
}
