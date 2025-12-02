import SettingsIcon from '@/components/icons/SettingsIcon'
import Trans from '@/components/translation/trans/TransClient'
import { organisationsDashboardClickParameters } from '@/constants/tracking/pages/organisationsDashboard'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { unformatAdministratorName } from '@/helpers/organisations/unformatAdministratorName'
import {
  getOrganisation,
  getOrganisationPolls,
} from '@/helpers/server/model/organisations'
import { capitalizeString } from '@/utils/capitalizeString'
import MyPolls from './_components/MyPolls'
import NousContacter from './_components/NousContacter'
import OurTools from './_components/OurTools'

/* global PageProps */

export default async function OrganisationPage({
  params,
}: PageProps<'/[locale]/organisations/[orgaSlug]'>) {
  const { orgaSlug } = await params
  const [organisation, polls] = await Promise.all([
    getOrganisation(orgaSlug),
    getOrganisationPolls(orgaSlug),
  ])

  return (
    <>
      <div className="mb-4 flex flex-wrap justify-between md:flex-nowrap">
        <div>
          <h1>
            <span>
              <Trans>Bienvenue</Trans>{' '}
              <span className="text-primary-700">
                {capitalizeString(
                  unformatAdministratorName(
                    organisation.administrators[0].name || ''
                  )
                )}
              </span>
              ,
            </span>
          </h1>

          <p className="max-w-lg">
            <Trans>Sur l'espace organisation de </Trans>{' '}
            <strong className="text-secondary-700">{organisation?.name}</strong>
            .{' '}
            <Trans>Retrouvez vos campagnes et suivez leurs statistiques.</Trans>
          </p>
        </div>
        <ButtonLink
          href={`/organisations/${organisation?.slug}/parametres`}
          trackingEvent={organisationsDashboardClickParameters}
          color="text"
          data-cypress-id="organisation-page-see-parameters-button"
          className="flex items-center self-start">
          <SettingsIcon className="fill-primary-700 mr-2" />

          <Trans>Voir les paramètres</Trans>
        </ButtonLink>
      </div>

      <MyPolls polls={polls} />

      <OurTools />

      <NousContacter />
    </>
  )
}
