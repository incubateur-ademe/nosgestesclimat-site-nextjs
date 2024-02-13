'use client'

import Trans from '@/components/translation/Trans'
import Separator from '@/design-system/layout/Separator'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useFetchOrganisation from '../_hooks/useFetchOrganisation'
import EmailSection from './_components/EmailSection'

export default function Page() {
  const { user } = useUser()

  const router = useRouter()

  // This should fail if the user has not received a
  // valid token to access the organisation
  const {
    isSuccess,
    isError,
    data: organisation,
  } = useFetchOrganisation({
    email: user?.email,
  })

  // Redirect to the organisation page if the user
  // is already logged in (has a valid cookie stored)
  useEffect(() => {
    if (isSuccess && organisation) {
      router.push(`/organisations/mon-espace/${organisation?.slug}`)
    }
  }, [isSuccess, organisation, router])

  // Cookie is inexistent or invalid, we delete it
  useEffect(() => {
    if (isError) {
      document.cookie = 'ngcjwt' + '=; Max-Age=0'
    }
  }, [isError])

  return (
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
  )
}