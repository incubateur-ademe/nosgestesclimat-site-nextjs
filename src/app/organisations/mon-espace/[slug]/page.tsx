'use client'

import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Loader from '@/design-system/layout/Loader'
import Title from '@/design-system/layout/Title'
import { useUser } from '@/publicodes-state'
import { capitalizeString } from '@/utils/capitalizeString'
import { usePathname } from 'next/navigation'
import useFetchOrganization from '../../_hooks/useFetchOrganization'

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

      <section className="mt-6 w-full bg-[#fff]">
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-0">
          {isError && (
            <>
              <p>
                <Trans>
                  Oups, une erreur s'est produite au moment de récupérer vos
                  données d'organisation.
                </Trans>
              </p>

              <ButtonLink href="/organisations" className="mt-8">
                <Trans>Revenir à l'accueil</Trans>
              </ButtonLink>
            </>
          )}
          {organization && (
            <>
              <Title
                title={
                  <span>
                    <Trans>Bienvenue</Trans>{' '}
                    {capitalizeString(organization?.owner?.name)} ,
                  </span>
                }
                subtitle={
                  <span>
                    <Trans>Sur l'espace organisation de </Trans>{' '}
                    <strong className="!text-primary-600">
                      {organization?.name}
                    </strong>
                  </span>
                }
              />
            </>
          )}
        </div>
      </section>
    </>
  )
}
