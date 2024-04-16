'use client'

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
    email: user?.organisation?.administratorEmail ?? '',
  })

  // Redirect to the organisation page if the user
  // is already logged in (has a valid cookie stored)
  useEffect(() => {
    if (isSuccess && organisation) {
      router.push(`/organisations/${organisation?.slug}`)
    }
  }, [isSuccess, organisation, router])

  // Cookie is inexistent or invalid, we delete it
  useEffect(() => {
    if (isError) {
      document.cookie = 'ngcjwt' + '=; Max-Age=0'
    }
  }, [isError])

  return (
    <section className="w-full bg-[#fff]">
      <div className="mx-auto max-w-5xl px-6 lg:px-0">
        <h1>
          <NGCTrans>Accédez à votre espace organisation</NGCTrans>
        </h1>

        <p>
          <NGCTrans>C'est gratuit, et ça prend une minute !</NGCTrans>
        </p>

        <Separator />

        <div className="max-w-full md:w-[40rem]">
          <EmailSection />
        </div>
      </div>
    </section>
  )
}
