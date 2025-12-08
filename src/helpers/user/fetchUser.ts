import { USER_URL } from '@/constants/urls/main'
import { captureException } from '@sentry/nextjs'

export async function fetchUser() {
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
    captureException(error)
    return null
  }
}
