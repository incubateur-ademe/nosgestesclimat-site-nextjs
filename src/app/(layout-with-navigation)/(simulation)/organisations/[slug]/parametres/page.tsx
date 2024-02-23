'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import OrganisationFetchError from '@/components/organisations/OrganisationFetchError'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Loader from '@/design-system/layout/Loader'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { useLogoutOrganisation } from '@/hooks/organisations/useLogout'
import { useUser } from '@/publicodes-state'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import useFetchOrganisation from '../../_hooks/useFetchOrganisation'
import InformationsForm from './_components/InformationsForm'
import QuestionsComplementaires from './_components/QuestionsComplementaires'

export default function ParametresPage() {
  const { user } = useUser()

  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    data: organisation,
    isError,
    refetch,
  } = useFetchOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const { mutate: logoutOrganisation } = useLogoutOrganisation({
    orgaSlug: organisation?.slug,
  })

  function handleDisconnect() {
    logoutOrganisation()

    queryClient.clear()

    router.push('/organisations')
  }

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

          <Button color="text" onClick={handleDisconnect}>
            <Trans>Déconnexion de votre espace organisation</Trans>
          </Button>
        </MaxWidthContent>
      )}
    </>
  )
}
