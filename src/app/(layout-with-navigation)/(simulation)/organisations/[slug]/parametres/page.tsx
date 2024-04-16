'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import OrganisationFetchError from '@/components/organisations/OrganisationFetchError'
import Loader from '@/design-system/layout/Loader'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { useUser } from '@/publicodes-state'
import useFetchOrganisation from '../../_hooks/useFetchOrganisation'
import DeconnexionButton from './DeconnexionButton'
import InformationsForm from './_components/InformationsForm'
import QuestionsComplementaires from './_components/QuestionsComplementaires'

export default function ParametresPage() {
  const { user } = useUser()

  const {
    data: organisation,
    isError,
    isLoading,
    refetch,
  } = useFetchOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  if (isLoading) {
    return <Loader />
  }

  if (isError && !isLoading && !organisation) {
    return (
      <OrganisationFetchError organisation={organisation} isError={isError} />
    )
  }

  return (
    <MaxWidthContent className="py-8">
      <Title title={<NGCTrans>Paramètres</NGCTrans>} />

      <QuestionsComplementaires
        organisation={organisation}
        refetchOrganisation={refetch}
      />

      <Separator />

      <InformationsForm organisation={organisation} />

      <DeconnexionButton organisation={organisation} />
    </MaxWidthContent>
  )
}
