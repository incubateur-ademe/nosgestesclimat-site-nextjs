'use client'

import TransClient from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import useFetchOrganisations from '@/hooks/organisations/useFetchOrganisations'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'
import CreateOrganisation from './Organisations/CreateOrganisation'
import PollsList from './Organisations/PollsList'

export default function Organisations() {
  const { t } = useClientTranslation()

  const { data: organisations, isLoading, isError } = useFetchOrganisations()

  if (isLoading && !organisations && !isError) {
    return null
  }

  return (
    <>
      <Title
        tag="h2"
        className="mt-16"
        title={<TransClient>Organisations et campagnes</TransClient>}
      />
      <div className="flex flex-wrap justify-center gap-16 md:flex-nowrap">
        <div className="flex-1">
          <PollsList organisations={organisations} />

          <CreateOrganisation organisations={organisations} />
        </div>
        <Image
          className="-mt-12 mb-12 w-60 self-start md:w-80"
          src="/images/illustrations/people-with-paperboard.png"
          width="380"
          height="400"
          alt={t('Un groupe de personnes discutant devant un paperboard.')}
        />
      </div>
    </>
  )
}
