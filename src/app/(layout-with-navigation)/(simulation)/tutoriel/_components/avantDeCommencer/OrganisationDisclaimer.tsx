'use client'

import Trans from '@/components/translation/Trans'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { usePollPublicInfo } from '@/hooks/organisations/usePollPublicInfo'

export default function OrganisationDisclaimer() {
  const { pollSlug } = useOrganisationQueryParams()

  const { data: poll, isLoading } = usePollPublicInfo({ pollSlug })

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
        <Trans>Ce test vous est proposé par</Trans>{' '}
        <strong>{isLoading ? '... ' : poll?.organisationInfo?.name}</strong>.{' '}
        <Trans>
          En participant vous acceptez que vos résultats sont partagés
          anonymement avec cette organisation.
        </Trans>
      </p>
    </div>
  )
}
