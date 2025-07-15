'use client'

import EyeIcon from '@/components/icons/EyeIcon'
import SettingsIcon from '@/components/icons/SettingsIcon'
import InformationIconWithTooltip from '@/components/messages/InformationIconWithTooltip'
import ExportDataButton from '@/components/organisations/ExportDataButton'
import QRCode from '@/components/sharing/QRCode'
import Trans from '@/components/translation/trans/TransClient'
import { organisationsDashboardExportData } from '@/constants/tracking/pages/organisationsDashboard'
import {
  pollDashboardClickParameters,
  pollDashboardCopyLink,
} from '@/constants/tracking/pages/pollDashboard'
import ButtonLink from '@/design-system/buttons/ButtonLink'
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
    simulations: { count },
  } = poll

  return (
    <section className="mb-10 rounded-xl bg-gray-50 p-6">
      <h3 className="mb-4">
        <Trans>Section administrateur</Trans>
        <InformationIconWithTooltip
          id="admin-section"
          className="ml-1 inline-block">
          <p className="mb-0 flex items-center gap-1 text-xs">
            <EyeIcon className="w-4 fill-white" />{' '}
            <Trans>Visible uniquement par vous</Trans>
          </p>
        </InformationIconWithTooltip>
      </h3>

      <QRCode value={`${window.location.origin}/o/${orgaSlug}/${pollSlug}`} />

      <div className="flex flex-wrap gap-8 md:flex-nowrap">
        <div className="rainbow-border w-full rounded-xl p-4 md:w-2/3">
          <h2 className="text-lg">
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

        <div className="flex flex-1 flex-col justify-center gap-4 sm:flex-row md:flex-col">
          {count >= 3 && (
            <ExportDataButton
              poll={poll}
              color="secondary"
              onClick={() => {
                trackEvent(organisationsDashboardExportData)
              }}
              className="h-14"
            />
          )}

          <ButtonLink
            href={`/organisations/${orgaSlug}/campagnes/${pollSlug}/parametres`}
            trackingEvent={pollDashboardClickParameters}
            color="text"
            data-cypress-id="poll-admin-section-see-parameters-button"
            className="flex items-center">
            <SettingsIcon className="fill-primary-700 mr-2" />

            <Trans>Voir les paramètres</Trans>
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
