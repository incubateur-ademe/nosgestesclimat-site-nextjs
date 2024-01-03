'use client'

import Trans from '@/components/translation/Trans'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Loader from '@/design-system/layout/Loader'
import Title from '@/design-system/layout/Title'
import { useUser } from '@/publicodes-state'
import { capitalizeString } from '@/utils/capitalizeString'
import { useParams, usePathname } from 'next/navigation'
import useFetchOrganization from '../../_hooks/useFetchOrganization'

export default function OrganizationPage() {
  const params = useParams()
  const pathname = usePathname()

  const { user } = useUser()

  const { data } = useFetchOrganization({
    slug: params.slug as string,
    ownerEmail: user.email,
  })

  const { organization } = data || {}

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
      {organization && (
        <section className="mt-6 w-full bg-[#fff]">
          <div className="mx-auto max-w-5xl px-6 py-8 lg:px-0">
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
                  <strong className="text-primary-600">
                    {organization?.name}
                  </strong>
                </span>
              }
            />
          </div>
        </section>
      )}
    </>
  )
}
