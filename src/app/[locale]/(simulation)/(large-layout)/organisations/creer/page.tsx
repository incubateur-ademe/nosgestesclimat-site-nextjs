'use client'

import TransClient from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import { useOrgaCreationGuard } from '@/hooks/navigation/useOrgaCreationGuard'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import CreationForm from './_components/CreationForm'

export default function CreationPage() {
  const { isError, data: organisation } = useFetchOrganisation()

  const { isGuardInit, isGuardRedirecting } = useOrgaCreationGuard({
    isError,
    organisation,
  })

  if (!isGuardInit || isGuardRedirecting) return null

  return (
    <section className="w-full bg-[#fff]">
      <div className="mx-auto max-w-5xl px-6 lg:px-0">
        <Title
          title={<TransClient>Bienvenue sur votre espace !</TransClient>}
          subtitle={
            <TransClient>Plus que quelques petites questions</TransClient>
          }
          hasSeparator={false}
        />

        <CreationForm />
      </div>
    </section>
  )
}
