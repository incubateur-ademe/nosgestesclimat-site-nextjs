import { GROUP_URL } from '@/constants/urls/main'
import { captureException } from '@sentry/nextjs'

export async function fetchUserGroups(userId: string) {
  try {
    const response = await fetch(`${GROUP_URL}/${userId}`)

    if (!response.ok) {
      throw new Error('Failed to fetch user groups')
    }

    const data = await response.json()

    return { groups: data, isError: false }
  } catch (error) {
    captureException(error)
    return { groups: [], isError: true }
  }
}
