'use client'

import Trans from '@/components/translation/trans/TransClient'
import Loader from '@/design-system/layout/Loader'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import { usePollQueryParams } from '@/hooks/organisations/usePollQueryParams'

export default function OrganisationDisclaimer() {
  const { data: poll, isLoading } = useFetchPublicPoll()
  const { pollSlug } = usePollQueryParams()

  // If there is no pollSlug, we don't display the disclaimer
  if (!pollSlug) {
    return null
  }

  if (isLoading) {
    return (
      <p>
        <Loader size="sm" color="dark" />{' '}
        <Trans>Nous chargeons les données de l'organisation partenaire.</Trans>
      </p>
    )
  }

  // If the poll is not loading and there is still no poll, we don't display the disclaimer
  if (!isLoading && !poll) {
    return null
  }

  return (
    <div className="relative pl-8">
      <p className="overflow-visible before:absolute before:left-0 before:content-['🏢']">
        <Trans>Ce test vous est proposé par</Trans>{' '}
        <strong>{isLoading ? '... ' : poll?.organisation.name}</strong>.{' '}
        <Trans>
          En participant vous acceptez que vos résultats soient partagés
          anonymement avec cette organisation.
        </Trans>
      </p>
    </div>
  )
}
