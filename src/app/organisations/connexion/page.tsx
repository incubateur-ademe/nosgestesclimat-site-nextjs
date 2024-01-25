'use client'

import Trans from '@/components/translation/Trans'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Main from '@/design-system/layout/Main'
import Separator from '@/design-system/layout/Separator'
import { useUser } from '@/publicodes-state'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useFetchOrganization from '../_hooks/useFetchOrganization'
import EmailSection from './_components/EmailSection'

export default function Page() {
  const pathname = usePathname()

  const { user } = useUser()

  const router = useRouter()

  // This should fail if the user has not received a
  // valid token to access the organization
  const {
    isSuccess,
    isError,
    data: organization,
  } = useFetchOrganization({
    administratorEmail: user?.email,
  })

  // Redirect to the organization page if the user
  // is already logged in (has a valid cookie stored)
  useEffect(() => {
    if (isSuccess && organization) {
      router.push(`/organisations/mon-espace/${organization?.slug}`)
    }
  }, [isSuccess, organization, router])

  // Cookie is inexistent or invalid, we delete it
  useEffect(() => {
    if (isError) {
      document.cookie = 'ngcjwt' + '=; Max-Age=0'
    }
  }, [isError])

  return (
    <Main>
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
        ]}
      />

      <section className="w-full bg-[#fff] pt-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-0">
          <h1>
            <Trans>Accédez à votre espace organisation</Trans>
          </h1>

          <p>
            <Trans>C'est gratuit, et ça prend une minute !</Trans>
          </p>

          <Separator />

          <div className="w-[40rem] max-w-full">
            <EmailSection />
          </div>
        </div>
      </section>
    </Main>
  )
}
