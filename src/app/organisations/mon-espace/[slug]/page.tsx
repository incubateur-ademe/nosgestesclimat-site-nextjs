'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Loader from '@/design-system/layout/Loader'
import { useUser } from '@/publicodes-state'
import { capitalizeString } from '@/utils/capitalizeString'
import { usePathname } from 'next/navigation'
import useFetchOrganization from '../../_hooks/useFetchOrganization'
import OrgaStatistics from './_components/OrgaStatistics'
import OurTools from './_components/OurTools'
import ShareSection from './_components/ShareSection'

export default function OrganizationPage() {
  const pathname = usePathname()

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
            label: 'Accueil',
            isActive: pathname === '/',
          },
          {
            href: '/organisations',
            label: 'Organisations',
            isActive: pathname === '/organisations',
          },
          {
            href: `/organisations/mon-espace/${organization?.slug}`,
            label: organization?.name,
            isActive: pathname.includes('/organisations/mon-espace'),
          },
        ]}
      />

      {!organization && <Loader />}

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
            <h1>
              <span>
                <Trans>Bienvenue</Trans>{' '}
                {capitalizeString(organization?.owner?.name)} ,
              </span>
            </h1>

            <p>
              <Trans>Sur l'espace organisation de </Trans>{' '}
              <strong className="!text-primary-600">
                {organization?.name}
              </strong>
              .{' '}
              <Trans>
                Partagez le test à votre réseau et suivez vos statistiques.
              </Trans>
            </p>
          </MaxWidthContent>

          <MaxWidthContent className="pb-8">
            <OrgaStatistics organization={organization} />
          </MaxWidthContent>

          <ShareSection organization={organization} />

          <OurTools />
        </>
      )}
    </>
  )
}
