import { ORGANISATION_URL } from '@/constants/urls/main'

export async function fetchOrganisations() {
  try {
    const response = await fetch(ORGANISATION_URL, { credentials: 'include' })
    console.log(response)
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
