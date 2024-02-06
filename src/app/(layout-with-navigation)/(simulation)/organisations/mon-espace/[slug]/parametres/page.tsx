'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Loader from '@/design-system/layout/Loader'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { useUser } from '@/publicodes-state'
import useFetchOrganization from '../../../_hooks/useFetchOrganization'
import InformationsForm from './_components/InformationsForm'
import QuestionsComplementaires from './_components/QuestionsComplementaires'

export default function ParametresPage() {
  const { user } = useUser()

  const {
    data: organization,
    isError,
    refetch,
  } = useFetchOrganization({
    email: user.email,
  })

  return (
    <>
      {!organization && !isError && <Loader />}

      {isError && (
        <MaxWidthContent>
          <p>
            <Trans>
              Oups, une erreur s'est produite au moment de récupérer vos données
              d'organisation.
            </Trans>
          </p>

          <ButtonLink href="/organisations" className="mt-8">
            <Trans>Revenir à l'accueil</Trans>
          </ButtonLink>
        </MaxWidthContent>
      )}

      {organization && (
        <MaxWidthContent className="py-8">
          <Title title={<Trans>Paramètres</Trans>} />

          <QuestionsComplementaires
            organization={organization}
            refetchOrganization={refetch}
          />

          <Separator />

          <InformationsForm organization={organization} />
        </MaxWidthContent>
      )}
    </>
  )
}
