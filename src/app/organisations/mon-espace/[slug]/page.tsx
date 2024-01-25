'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Loader from '@/design-system/layout/Loader'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { capitalizeString } from '@/utils/capitalizeString'
import { usePathname } from 'next/navigation'
import useFetchOrganization from '../../_hooks/useFetchOrganization'
import NousContacter from './_components/NousContacter'
import OrgaStatistics from './_components/OrgaStatistics'
import OurTools from './_components/OurTools'
import QuestionsFrequentes from './_components/QuestionsFrequentes'
import ShareSection from './_components/ShareSection'

export default function OrganizationPage() {
  const { t } = useClientTranslation()

  const pathname = usePathname()

  const { user } = useUser()

  const { data: organization, isError } = useFetchOrganization({
    administratorEmail: user.email,
  })

  return (
    <>
      <Breadcrumbs
        items={[
          {
            href: '/',
            label: t('Accueil'),
            isActive: pathname === '/',
          },
          {
            href: '/organisations',
            label: t('Organisations'),
            isActive: pathname === '/organisations',
          },
          {
            href: `/organisations/mon-espace/${organization?.slug}`,
            label: organization?.name,
            isActive: pathname.includes('/organisations/mon-espace'),
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
            <div className="flex flex-wrap justify-between md:flex-nowrap">
              <div>
                <h1>
                  <span>
                    <Trans>Bienvenue</Trans>{' '}
                    <span className="text-primary-500">
                      {capitalizeString(
                        organization?.administrators?.[0]?.name
                      )}
                    </span>
                    ,
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
              </div>
              <ButtonLink
                href={`${pathname}/parametres`}
                color="text"
                className="self-start">
                <Emoji className="mr-2">⚙️</Emoji>
                <Trans>Voir les paramètres</Trans>
              </ButtonLink>
            </div>
          </MaxWidthContent>

          <MaxWidthContent className="pb-8">
            <OrgaStatistics organization={organization} />
          </MaxWidthContent>

          <ShareSection organization={organization} />

          <MaxWidthContent>
            <OurTools />

            <QuestionsFrequentes />

            <NousContacter />
          </MaxWidthContent>
        </>
      )}
    </>
  )
}
