'use client'

import QRCode from '@/components/sharing/QRCode'
import Trans from '@/components/translation/trans/TransClient'
import { pollDashboardCopyLink } from '@/constants/tracking/pages/pollDashboard'
import {
  MATOMO_CAMPAIGN_KEY,
  MATOMO_KEYWORD_KEY,
} from '@/constants/urls/matomo'
import CopyInput from '@/design-system/inputs/CopyInput'
import type { PublicOrganisationPoll } from '@/types/organisations'
import { trackEvent } from '@/utils/analytics/trackEvent'

type Props = {
  poll: PublicOrganisationPoll
}

const buildLink = ({
  orgaSlug,
  pollSlug,
  orgaName,
  pollName,
}: {
  orgaSlug: string
  pollSlug: string
  orgaName: string
  pollName: string
}) => {
  return `${window.location.origin}/o/${orgaSlug}/${pollSlug}?${MATOMO_CAMPAIGN_KEY}=Organisation_${encodeURIComponent(orgaName)}&${MATOMO_KEYWORD_KEY}=${encodeURIComponent(pollName)}`
}

export default function AdminSection({ poll }: Props) {
  const {
    slug: pollSlug,
    name: pollName,
    organisation: { slug: orgaSlug, name: orgaName },
  } = poll

  return (
    <section className="mb-10 rounded-xl bg-gray-50 p-3 md:p-6">
      <div className="flex flex-wrap items-start gap-8 md:flex-nowrap">
        <div className="w-full md:w-2/3!">
          <h3 className="mb-4">
            <Trans>Section administrateur</Trans>
          </h3>

          <div className="rainbow-border w-full rounded-xl p-4">
            <h2 className="text-base md:text-lg">
              <Trans>Partagez votre campagne</Trans>
            </h2>
            <CopyInput
              textToDisplay={buildLink({
                orgaSlug,
                pollSlug,
                orgaName,
                pollName,
              })}
              textToCopy={buildLink({
                orgaSlug,
                pollSlug,
                orgaName,
                pollName,
              })}
              onClick={() => {
                trackEvent(pollDashboardCopyLink)
              }}
            />
          </div>
        </div>

        <QRCode
          value={buildLink({
            orgaSlug,
            pollSlug,
            orgaName,
            pollName,
          })}
          className="md:flex-1"
        />
      </div>
    </section>
  )
}
