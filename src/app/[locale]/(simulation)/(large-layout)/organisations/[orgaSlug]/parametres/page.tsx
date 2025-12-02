import Trans from '@/components/translation/trans/TransClient'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'

import { ADMINISTRATOR_SEPARATOR } from '@/constants/organisations/administrator'
import { OrganisationTypeEnum } from '@/constants/organisations/organisationTypes'
import { getOrganisation } from '@/helpers/server/model/organisations'
import type {
  Organisation,
  OrgaSettingsInputsType,
} from '@/types/organisations'
import DeconnexionButton from './_components/DeconnexionButton'
import OrganisationForm from './_components/OrganisationForm'

/* global PageProps */
export default async function ParametresPage({
  params,
}: PageProps<'/[locale]/organisations/[orgaSlug]/parametres'>) {
  const { orgaSlug } = await params
  const organisation = await getOrganisation(orgaSlug)
  const defaultValues = getFormDefaultValues(organisation)

  return (
    <div className="pb-12">
      <Title
        title={
          <span>
            <Trans>Paramètres de </Trans>
            <strong className="text-primary-700">{organisation?.name}</strong>
          </span>
        }
      />
      <OrganisationForm
        slug={organisation.slug}
        defaultValues={defaultValues}
      />
      <Separator className="my-8" />

      <DeconnexionButton />
    </div>
  )
}

const getFormDefaultValues = (
  organisation: Organisation
): OrgaSettingsInputsType => {
  const {
    administrators: [
      {
        email,
        optedInForCommunications,
        position,
        name: administratorName,
        telephone: administratorTelephone,
      },
    ],
    numberOfCollaborators,
    type: organisationType,
    name,
  } = organisation

  const [administratorFirstName, administratorLastName] =
    administratorName?.split(ADMINISTRATOR_SEPARATOR) ?? []

  return {
    name,
    email,
    numberOfCollaborators: numberOfCollaborators ?? 0,
    hasOptedInForCommunications: optedInForCommunications ?? false,
    organisationType: organisationType ?? OrganisationTypeEnum.other,
    ...(position ? { position } : {}),
    ...(administratorName
      ? {
          administratorFirstName,
          administratorLastName,
        }
      : {}),
    ...(administratorTelephone ? { administratorTelephone } : {}),
  }
}
