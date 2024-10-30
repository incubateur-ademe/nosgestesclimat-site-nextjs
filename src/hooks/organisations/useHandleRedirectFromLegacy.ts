import { useParams, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useFetchOrganisationPolls } from './useFetchOrganisationPolls'

// Handles managing the redirection from the previous implementation of the parcours orga
// /organisations/:orgaSlug/resultats-detailles => /organisations/:orgaSlug/campagnes/:pollSlug
export function useHandleRedirectFromLegacy() {
  const { orgaSlug } = useParams()

  const searchParams = useSearchParams()

  const isRedirectFromLegacy = Boolean(searchParams.get('isRedirectFromLegacy'))

  const { data: polls } = useFetchOrganisationPolls(
    orgaSlug as string,
    isRedirectFromLegacy
  )

  useEffect(() => {
    if (isRedirectFromLegacy && polls) {
      const [poll] = polls
      window.location.href = `/organisations/${orgaSlug}/campagnes/${poll.slug}`
    }
  }, [isRedirectFromLegacy, polls, orgaSlug])
}
