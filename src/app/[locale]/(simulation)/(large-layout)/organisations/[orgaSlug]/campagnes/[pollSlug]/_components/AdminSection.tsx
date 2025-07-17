'use client'

import QRCode from '@/components/sharing/QRCode'
import Trans from '@/components/translation/trans/TransClient'
import { pollDashboardCopyLink } from '@/constants/tracking/pages/pollDashboard'
import CopyInput from '@/design-system/inputs/CopyInput'
import type { PublicOrganisationPoll } from '@/types/organisations'
import { trackEvent } from '@/utils/analytics/trackEvent'

type Props = {
  poll: PublicOrganisationPoll
}

export default function AdminSection({ poll }: Props) {
  const {
    slug: pollSlug,
    organisation: { slug: orgaSlug },
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
              textToDisplay={`${window.location.host}/o/${orgaSlug}/${pollSlug}`}
              textToCopy={`${window.location.origin}/o/${orgaSlug}/${pollSlug}`}
              onClick={() => {
                trackEvent(pollDashboardCopyLink)
              }}
            />
          </div>
        </div>

        <QRCode
          value={`${window.location.origin}/o/${orgaSlug}/${pollSlug}`}
          className="md:flex-1"
        />
      </div>
    </section>
  )
}
