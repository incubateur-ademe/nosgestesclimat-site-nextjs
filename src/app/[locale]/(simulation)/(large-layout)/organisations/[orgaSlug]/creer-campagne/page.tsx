'use client'

import OrganisationFetchError from '@/components/organisations/OrganisationFetchError'
import Trans from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import PollForm from './_components/PollForm'

export default function CreerCampagnePage() {
  const router = useRouter()

  const { data: organisation, isError, isLoading } = useFetchOrganisation()

  // The user hasn't completed the creation step if the orga
  // hasn't got a slug defined
  useEffect(() => {
    if (organisation && !organisation.slug) {
      router.push('/organisations/creer')
    }
  }, [organisation, router])

  if (isError && !isLoading && !organisation) {
    return (
      <OrganisationFetchError organisation={organisation} isError={isError} />
    )
  }

  if (!organisation) {
    return null
  }

  return (
    <div className="mb-4 flex flex-col justify-between md:flex-nowrap">
      <Title
        title={<Trans>Créer une campagne</Trans>}
        subtitle={
          <Trans>
            Lancez une campagne de calcul de l'empreinte carbone de vos
            collaborateurs, élèves, collègues...
          </Trans>
        }
      />

      <PollForm organisation={organisation} />
    </div>
  )
}
