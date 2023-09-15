import { useIsClient } from '@/app/_components/IsClientCtxProvider'
import { useSearchParams } from 'next/navigation'

const PR_NUMBER_KEY = 'PR'

function getPRNumberFromStorage() {
  return sessionStorage.getItem(PR_NUMBER_KEY) ?? ''
}

function clearPRNumberFromStorage() {
  sessionStorage.removeItem(PR_NUMBER_KEY)
}

export function useGetPRNumber(): {
  PRNumber?: string
  clearPRNumber: () => void
} {
  const isClient = useIsClient()
  const searchParams = useSearchParams()

  // Don't use sessionStorage on the server
  if (!isClient) {
    return {
      clearPRNumber: clearPRNumberFromStorage,
    }
  }

  const PRNumberFromURL = searchParams.get('PR')

  const savedPRNumber = isClient && getPRNumberFromStorage()
  // Use the PR number from sessionStorage if it exists and there is no PR number in the URL
  if (savedPRNumber && !PRNumberFromURL) {
    return {
      PRNumber: savedPRNumber,
      clearPRNumber: clearPRNumberFromStorage,
    }
  }

  if (PRNumberFromURL) {
    sessionStorage.setItem(PR_NUMBER_KEY, PRNumberFromURL)
  }

  return {
    PRNumber: PRNumberFromURL ?? '',
    clearPRNumber: clearPRNumberFromStorage,
  }
}
