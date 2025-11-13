'use client'

import AuthenticateUserForm from '@/components/AuthenticateUserForm'
import Trans from '@/components/translation/trans/TransClient'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import Separator from '@/design-system/layout/Separator'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import useFetchOrganisations from '@/hooks/organisations/useFetchOrganisations'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()

  // This should fail if the user has not received a
  // valid token to access the organisation
  const {
    isSuccess,
    isError,
    data: organisation,
    isLoading,
  } = useFetchOrganisation()

  const { refetch: fetchOrganisations } = useFetchOrganisations({
    enabled: false,
  })

  const { user, updateUserOrganisation } = useUser()

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

  const onSignInSignUpComplete = async () => {
    // Otherwise, we fetch the organisations
    const { data: organisations } = await fetchOrganisations()

    // I don´t understand why refetch returns undefined
    const [organisation] = organisations!

    if (!organisation) {
      // Reset the verification code expiration date
      router.push('/organisations/creer')
      return
    }

    updateUserOrganisation({
      name: organisation.name,
      slug: organisation.slug,
    })

    router.push(`/organisations/${organisation.slug}`)
  }

  return (
    <section className="w-full bg-[#fff]">
      <div className="max-w-5xl lg:px-0">
        <h1>
          <Trans>Accédez à votre espace organisation</Trans>
        </h1>

        <p>
          <Trans>C'est gratuit, et ça prend une minute !</Trans>
        </p>

        <Separator />

        {isLoading && <BlockSkeleton />}

        {!isLoading && !organisation && (
          <div className="max-w-full md:w-[40rem]">
            <AuthenticateUserForm onComplete={onSignInSignUpComplete} />
          </div>
        )}
      </div>
    </section>
  )
}
