'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Loader from '@/design-system/layout/Loader'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import useFetchOrganization from '../../../_hooks/useFetchOrganization'
import InformationsForm from './_components/InformationsForm'

export default function ParametresPage() {
  const { t } = useClientTranslation()

  const { user } = useUser()

  const { data: organization, isError } = useFetchOrganization({
    ownerEmail: user.email,
  })

  return (
    <>
      <Breadcrumbs
        items={[
          {
            href: '/',
            label: t('Accueil'),
          },
          {
            href: '/organisations',
            label: t('Organisations'),
          },
          {
            href: `/organisations/mon-espace/${organization?.slug}`,
            label: organization?.name,
          },
          {
            href: `/organisations/mon-espace/${organization?.slug}/parametres`,
            label: t('Paramètres'),
            isActive: true,
          },
        ]}
      />

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
        <>
          <MaxWidthContent>
            <Title title={<Trans>Paramètres</Trans>} />

            <InformationsForm organization={organization} />
          </MaxWidthContent>
        </>
      )}
    </>
  )
}
