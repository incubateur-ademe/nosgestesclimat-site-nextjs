'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useOrgaCreationGuard } from '@/hooks/navigation/useOrgaCreationGuard'
import { useUser } from '@/publicodes-state'
import useFetchOrganisation from '../_hooks/useFetchOrganisation'
import CreationForm from './_components/CreationForm'

export default function CreationPage() {
  const { user } = useUser()

  const { isError, data: organisation } = useFetchOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const { isGuardInit, isGuardRedirecting } = useOrgaCreationGuard({
    isError,
    organisation,
  })

  if (!isGuardInit || isGuardRedirecting) return null

  return (
    <section className="w-full bg-[#fff]">
      <div className="mx-auto max-w-5xl px-6 lg:px-0">
        <Title
          title={<Trans>Bienvenue sur votre espace !</Trans>}
          subtitle={<Trans>Plus que quelques petites questions</Trans>}
        />

        <CreationForm />
      </div>
    </section>
  )
}
