'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import Image from 'next/image'
import CreateOrganisation from './Organisations/CreateOrganisation'
import PollsList from './Organisations/PollsList'

export default function Organisations() {
  const { user } = useUser()

  const { t } = useClientTranslation()

  const { data: organisation } = useFetchOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  return (
    <>
      <Title
        tag="h2"
        className="mt-8"
        title={<Trans>Organisations et campagnes</Trans>}
      />
      <div className="flex flex-wrap gap-16 md:flex-nowrap">
        <div className="flex-1">
          <PollsList organisation={organisation} />

          <CreateOrganisation organisation={organisation} />
        </div>
        <Image
          className="mx-auto -mt-12 self-start md:mx-0"
          src="/images/illustrations/people-with-paperboard.svg"
          width="380"
          height="400"
          alt={t('Un groupe de personnes discutant devant un paperboard.')}
        />
      </div>
    </>
  )
}
