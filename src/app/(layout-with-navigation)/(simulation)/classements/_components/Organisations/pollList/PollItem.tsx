'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { classementClickOrganisation } from '@/constants/tracking/pages/classements'
import ChevronRight from '@/design-system/icons/ChevronRight'
import { getLinkToPollDashboard } from '@/helpers/navigation/pollPages'
import { PollInfo } from '@/types/organisations'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  poll: PollInfo
}

export default function PollItem({ poll }: Props) {
  return (
    <Link
      href={getLinkToPollDashboard({
        orgaSlug: poll.organisationInfo.slug,
        pollSlug: poll.slug,
      })}
      className="rounded-xl bg-gray-100 px-5 py-2 no-underline decoration-auto transition-colors hover:bg-primary-100"
      onClick={() => trackEvent(classementClickOrganisation)}>
      <div className="flex items-center justify-between py-4">
        <div className="flex w-full items-center">
          <div>
            <div className="text-md text-gray-900">
              <strong>{poll.organisationInfo?.name}</strong>
              {poll.name && ` - ${poll.name}`}
            </div>

            <div className="flex gap-1 text-sm text-violet-900">
              <span className="whitespace-nowrap">
                {poll.numberOfParticipants ?? 0} <Trans>participant</Trans>
                {poll.numberOfParticipants > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex-shrink-0">
            <ChevronRight />
          </div>
        </div>
      </div>
    </Link>
  )
}
