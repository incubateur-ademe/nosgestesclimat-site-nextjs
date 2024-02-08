'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useFetchOrganization from '../_hooks/useFetchOrganization'
import { useUpdateOrganizationAfterCreation } from '../_hooks/useUpdateOrganizationAfterCreation'
import CreationForm from './_components/CreationForm'

export default function CreationPage() {
  const [nameError, setNameError] = useState<string | null>(null)
  const [ownerNameError, setOwnerNameError] = useState<string | null>(null)

  const { t } = useClientTranslation()

  const { user } = useUser()

  const { isError } = useFetchOrganization({
    email: user?.email,
  })

  const { mutateAsync: updateOrganization } =
    useUpdateOrganizationAfterCreation({
      email: user?.email,
    })

  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(document.querySelector('form') ?? undefined)

    const name = data.get('name') as string
    const slug = name.toLowerCase().replace(/ /g, '-')
    const administratorName = data.get('administratorName') as string
    const position = data.get('position') as string
    const telephone = data.get('telephone') as string
    const numberOfParticipants = data.get('numberOfParticipants') as string

    // Validation
    if (!name || !administratorName) {
      if (!name) {
        setNameError(t('Vous devez renseigner le nom de votre organisation'))
      }
      if (!administratorName) {
        setOwnerNameError(t('Vous devez renseigner votre prénom'))
      }

      // Scroll to top of the page with an animation
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }

    const hasOptedInForCommunications = (data.get(
      'hasOptedInForCommunications'
    ) as string)
      ? true
      : false

    try {
      const organizationUpdated = await updateOrganization({
        name,
        slug,
        administratorName,
        position,
        telephone,
        numberOfParticipants,
        hasOptedInForCommunications,
      })

      router.push(`/organisations/mon-espace/${organizationUpdated?.slug}`)
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isError) {
      router.push('/organisations/connexion')
    }
  }, [isError, router])

  return (
    <section className="mt-6 w-full bg-[#fff]">
      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-0">
        <Title
          title={<Trans>Bienvenue sur votre espace !</Trans>}
          subtitle={<Trans>Plus que quelques petites questions</Trans>}
        />

        <CreationForm
          onSubmit={handleSubmit}
          nameError={nameError}
          setNameError={setNameError}
          ownerNameError={ownerNameError}
          setOwnerNameError={setOwnerNameError}
        />
      </div>
    </section>
  )
}
