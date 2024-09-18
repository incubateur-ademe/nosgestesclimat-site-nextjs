import { useParams, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useGetOrgaPollSlugs } from './useGetOrgaPollSlugs'

// Handles managing the redirection from the previous implementation of the parcours orga
// /organisations/:orgaSlug/resultats-detailles => /organisations/:orgaSlug/campagnes/:pollSlug
export function useHandleRedirectFromLegacy() {
  const { orgaSlug } = useParams()

  const searchParams = useSearchParams()

  const isRedirectFromLegacy = Boolean(searchParams.get('isRedirectFromLegacy'))

  const { data: pollSlugs } = useGetOrgaPollSlugs(
    orgaSlug as string,
    isRedirectFromLegacy
  )

  useEffect(() => {
    if (isRedirectFromLegacy && pollSlugs) {
      const pollSlug = pollSlugs[0]
      window.location.href = `/organisations/${orgaSlug}/campagnes/${pollSlug}`
    }
  }, [isRedirectFromLegacy, pollSlugs, orgaSlug])
}
