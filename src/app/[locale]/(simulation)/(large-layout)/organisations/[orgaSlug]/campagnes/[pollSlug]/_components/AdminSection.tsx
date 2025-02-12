import EyeIcon from '@/components/icons/EyeIcon'
import SettingsIcon from '@/components/icons/SettingsIcon'
import InformationIconWithTooltip from '@/components/messages/InformationIconWithTooltip'
import ExportDataButton from '@/components/organisations/ExportDataButton'
import Trans from '@/components/translation/Trans'
import { organisationsDashboardExportData } from '@/constants/tracking/pages/organisationsDashboard'
import {
  pollDashboardClickParameters,
  pollDashboardCopyLink,
} from '@/constants/tracking/pages/pollDashboard'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import CopyInput from '@/design-system/inputs/CopyInput'
import type { PublicOrganisationPoll } from '@/types/organisations'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useParams } from 'next/navigation'

type Props = {
  poll?: PublicOrganisationPoll | null
}

export default function AdminSection({ poll }: Props) {
  const { orgaSlug, pollSlug } = useParams()

  if (!poll?.organisation.administrators) return null

  return (
    <section className="mb-10 rounded-xl bg-gray-50 p-6">
      <h3 className="mb-4">
        <Trans locale={locale}>Section administrateur</Trans>
        <InformationIconWithTooltip
          id="admin-section"
          className="ml-1 inline-block">
          <p className="mb-0 flex items-center gap-1 text-xs">
            <EyeIcon className="w-4 fill-white" />{' '}
            <Trans locale={locale}>Visible uniquement par vous</Trans>
          </p>
        </InformationIconWithTooltip>
      </h3>

      <div className="flex flex-wrap gap-8 md:flex-nowrap">
        <div className="rainbow-border w-full rounded-xl p-4 md:w-2/3">
          <h2 className="text-lg">
            <Trans locale={locale}>Partagez votre campagne</Trans>
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

            <Trans locale={locale}>Voir les paramètres</Trans>
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
