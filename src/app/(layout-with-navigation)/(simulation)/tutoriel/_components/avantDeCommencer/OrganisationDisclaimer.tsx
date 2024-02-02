'use client'

import Trans from '@/components/translation/Trans'
import usePollId from '@/hooks/usePollId'

export default function OrganisationDisclaimer() {
  const { pollId } = usePollId()

  const { data: poll, isLoading } = usePoll(pollId)
  if (!poll) {
    return null
  }

  return (
    <div className="relative pl-8">
      <p className="overflow-visible before:absolute before:left-0 before:content-['🏢'] ">
        <Trans>
          Ce test vous est proposé par{' '}
          <span className="font-bold">{'SNCF'}</span>. Vos résultats seront
          partagés anonymement avec l’organisation
        </Trans>
      </p>
    </div>
  )
}
