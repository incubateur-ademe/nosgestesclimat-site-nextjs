import { ORGANISATION_URL } from '@/constants/urls/main'
import { cookies } from 'next/headers'

export async function fetchOrganisations() {
  try {
    const cookieStore = await cookies()

    const ngcjwt = cookieStore.get('ngcjwt')

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (ngcjwt) {
      headers['Cookie'] = `ngcjwt=${ngcjwt.value}`
    }

    const response = await fetch(ORGANISATION_URL, { headers })

    if (!response.ok) {
      throw new Error('Failed to fetch organisations')
    }

    const data = await response.json()

    return { organisations: data, isError: false }
  } catch (error) {
    // User may not have any organisations
    return { organisations: [], isError: false }
  }
}
