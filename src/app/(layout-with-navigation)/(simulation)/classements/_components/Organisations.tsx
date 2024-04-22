'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useUser } from '@/publicodes-state'
import useFetchOrganisation from '../../organisations/_hooks/useFetchOrganisation'
import CreateOrganisation from './Organisations/CreateOrganisation'
import PollsList from './Organisations/PollsList'

export default function Organisations() {
  const { user } = useUser()

  const { data: organisation } = useFetchOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  return (
    <>
      <Title
        tag="h2"
        className="mt-8"
        title={<Trans>Entreprises et collectivités</Trans>}
      />

      <PollsList organisation={organisation} />

      <CreateOrganisation organisation={organisation} />
    </>
  )
}
