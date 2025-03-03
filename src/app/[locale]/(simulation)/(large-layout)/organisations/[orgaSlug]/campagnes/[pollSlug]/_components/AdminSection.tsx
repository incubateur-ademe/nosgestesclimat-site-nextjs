'use client'

import EyeIcon from '@/components/icons/EyeIcon'
import SettingsIcon from '@/components/icons/SettingsIcon'
import InformationIconWithTooltip from '@/components/messages/InformationIconWithTooltip'
import ExportDataButton from '@/components/organisations/ExportDataButton'
import TransClient from '@/components/translation/trans/TransClient'
import { organisationsDashboardExportData } from '@/constants/tracking/pages/organisationsDashboard'
import {
  pollDashboardClickParameters,
  pollDashboardCopyLink,
} from '@/constants/tracking/pages/pollDashboard'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import CopyInput from '@/design-system/inputs/CopyInput'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import { useUser } from '@/publicodes-state'
import type { PublicOrganisationPoll } from '@/types/organisations'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useParams } from 'next/navigation'

type Props = {
  poll?: PublicOrganisationPoll | null
}

export default function AdminSection({ poll }: Props) {
  const { orgaSlug, pollSlug } = useParams()

  const { user } = useUser()

  // Organisation can only be fetched by a authentified organisation administrator
  const { data: organisation, isLoading: isLoadingOrganisation } =
    useFetchOrganisation()

  // Temp hotfix to display the admin section
  const isAdmin =
    poll?.organisation.administrators ||
    organisation?.administrators.find(
      ({ userId, email }) =>
        userId === user.userId ||
        // Cover possible edge case where admin changes browser and looses his/her original userId
        email === user.organisation?.administratorEmail ||
        // Unsecure remove as soon as possible
        organisation?.slug === user.organisation?.slug
    )

  if (!isAdmin || isLoadingOrganisation) return null

  return (
    <section className="mb-10 rounded-xl bg-gray-50 p-6">
      <h3 className="mb-4">
        <TransClient>Section administrateur</TransClient>
        <InformationIconWithTooltip
          id="admin-section"
          className="ml-1 inline-block">
          <p className="mb-0 flex items-center gap-1 text-xs">
            <EyeIcon className="w-4 fill-white" />{' '}
            <TransClient>Visible uniquement par vous</TransClient>
          </p>
        </InformationIconWithTooltip>
      </h3>

      <div className="flex flex-wrap gap-8 md:flex-nowrap">
        <div className="rainbow-border w-full rounded-xl p-4 md:w-2/3">
          <h2 className="text-lg">
            <TransClient>Partagez votre campagne</TransClient>
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
          <ExportDataButton
            poll={poll}
            color="secondary"
            onClick={() => {
              trackEvent(organisationsDashboardExportData)
            }}
            className="h-14"
          />

          <ButtonLink
            href={`/organisations/${orgaSlug}/campagnes/${pollSlug}/parametres`}
            trackingEvent={pollDashboardClickParameters}
            color="text"
            className="flex items-center">
            <SettingsIcon className="fill-primary-700 mr-2" />

            <TransClient>Voir les paramètres</TransClient>
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
