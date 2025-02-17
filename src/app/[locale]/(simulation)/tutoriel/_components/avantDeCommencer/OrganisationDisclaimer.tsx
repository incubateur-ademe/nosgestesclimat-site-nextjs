'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'

export default function OrganisationDisclaimer() {
  const { data: poll, isLoading } = useFetchPublicPoll()

  // If there is no pollSlug, we don't display the disclaimer
  if (!poll) {
    return null
  }

  // If the poll is not loading and there is still no poll, we don't display the disclaimer
  if (!isLoading && !poll) {
    return null
  }

  return (
    <div className="relative pl-8">
      <p className="overflow-visible before:absolute before:left-0 before:content-['🏢']">
        <TransClient>Ce test vous est proposé par</TransClient>{' '}
        <strong>{isLoading ? '... ' : poll?.organisation.name}</strong>.{' '}
        <TransClient>
          En participant vous acceptez que vos résultats soient partagés
          anonymement avec cette organisation.
        </TransClient>
      </p>
    </div>
  )
}
