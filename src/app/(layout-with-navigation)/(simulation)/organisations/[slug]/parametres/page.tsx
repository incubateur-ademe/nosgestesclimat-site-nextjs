'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
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
    email: user.email,
  })

  return (
    <>
      {!organisation && !isError && <Loader />}

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
