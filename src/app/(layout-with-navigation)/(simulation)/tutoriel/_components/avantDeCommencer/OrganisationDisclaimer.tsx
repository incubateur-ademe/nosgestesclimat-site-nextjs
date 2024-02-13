'use client'

import Trans from '@/components/translation/Trans'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { usePoll } from '@/hooks/organisations/usePoll'

export default function OrganisationDisclaimer() {
  const { pollSlug } = useOrganisationQueryParams()

  const { data: poll, isLoading } = usePoll({ pollSlug })

  // If there is no pollSlug, we don't display the disclaimer
  if (!pollSlug) {
    return null
  }

  // If the poll is not loading and there is still no poll, we don't display the disclaimer
  if (!isLoading && !poll) {
    return null
  }

  return (
    <div className="relative pl-8">
      <p className="overflow-visible before:absolute before:left-0 before:content-['🏢'] ">
        <Trans>
          Ce test vous est proposé par{' '}
          <b>{isLoading ? '... ' : poll?.organisationInfo?.name}</b>. Vos
          résultats seront partagés anonymement avec l’organisation
        </Trans>
      </p>
    </div>
  )
}
