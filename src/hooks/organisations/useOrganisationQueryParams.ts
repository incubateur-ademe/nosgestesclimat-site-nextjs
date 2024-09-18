import { useSearchParams } from 'next/navigation'

export function useOrganisationQueryParams() {
  const searchParams = useSearchParams()

  const organisationSlug = searchParams.get('organisation')
  const pollSlug = searchParams.get('poll')

  return { pollSlug, organisationSlug }
}
