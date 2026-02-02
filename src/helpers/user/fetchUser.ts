import { USER_URL } from '@/constants/urls/main'

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
  } catch {
    return null
  }
}
