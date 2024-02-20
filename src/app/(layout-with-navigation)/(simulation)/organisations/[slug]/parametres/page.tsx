'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import OrganisationFetchError from '@/components/organisations/OrganisationFetchError'
import Trans from '@/components/translation/Trans'
import Loader from '@/design-system/layout/Loader'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { useUser } from '@/publicodes-state'
import useFetchOrganisation from '../../_hooks/useFetchOrganisation'
import InformationsForm from './_components/InformationsForm'
import QuestionsComplementaires from './_components/QuestionsComplementaires'

export default function ParametresPage() {
  const { user } = useUser()

  const {
    data: organisation,
    isError,
    refetch,
  } = useFetchOrganisation({
    email: user?.administratorEmail ?? '',
  })

  return (
    <>
      {!organisation && !isError && <Loader />}

      {isError && (
        <OrganisationFetchError organisation={organisation} isError={isError} />
      )}

      {organisation && (
        <MaxWidthContent className="py-8">
          <Title title={<Trans>Paramètres</Trans>} />

          <QuestionsComplementaires
            organisation={organisation}
            refetchOrganisation={refetch}
          />

          <Separator />

          <InformationsForm organisation={organisation} />
        </MaxWidthContent>
      )}
    </>
  )
}
