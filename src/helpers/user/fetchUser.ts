import { USER_URL } from '@/constants/urls/main'
import { captureException } from '@sentry/nextjs'

export async function fetchUser({
  shouldCaptureException = true,
}: {
  shouldCaptureException?: boolean
}) {
  try {
    const response = await fetch(`${USER_URL}/me`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }

    const data = await response.json()

    return data
  } catch (error) {
    if (shouldCaptureException) {
      captureException(error)
    }
    return null
  }
}
