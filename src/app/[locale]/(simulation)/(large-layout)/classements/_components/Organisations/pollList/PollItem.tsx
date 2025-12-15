'use client'

import Link from '@/components/Link'
import ChevronRight from '@/components/icons/ChevronRight'
import Trans from '@/components/translation/trans/TransClient'
import { classementClickOrganisation } from '@/constants/tracking/pages/classements'
import { getLinkToPollDashboard } from '@/helpers/navigation/pollPages'
import type { Organisation, OrganisationPoll } from '@/types/organisations'
import { trackEvent } from '@/utils/analytics/trackEvent'

interface Props {
  organisation: Organisation
  poll: OrganisationPoll
}

export default function PollItem({ organisation, poll }: Props) {
  const expectedNumberOfParticipants = poll.expectedNumberOfParticipants ?? 0

  return (
    <Link
      href={getLinkToPollDashboard({
        orgaSlug: organisation.slug,
        pollSlug: poll.slug,
      })}
      className="hover:bg-primary-100 rounded-xl bg-gray-100 px-5 py-2 no-underline decoration-auto transition-colors"
      onClick={() => trackEvent(classementClickOrganisation)}>
      <div className="flex items-center justify-between py-4">
        <div className="flex w-full items-center">
          <div>
            <div className="text-md text-gray-900">
              <strong>{organisation.name}</strong>
              {poll.name && ` - ${poll.name}`}
            </div>

            <div className="flex gap-1 text-sm text-violet-900">
              <span className="whitespace-nowrap">
                {expectedNumberOfParticipants} <Trans>participant</Trans>
                {expectedNumberOfParticipants > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="shrink-0">
            <ChevronRight />
          </div>
        </div>
      </div>
    </Link>
  )
}
