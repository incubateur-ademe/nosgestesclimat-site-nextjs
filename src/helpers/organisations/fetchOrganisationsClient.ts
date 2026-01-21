import { ORGANISATION_URL } from '@/constants/urls/main'

export async function fetchOrganisationsClient() {
  try {
    const response = await fetch(ORGANISATION_URL, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch organisations')
    }

    const data = await response.json()

    return { organisations: data, isError: false }
  } catch {
    // User may not have any organisations
    return { organisations: [], isError: false }
  }
}
