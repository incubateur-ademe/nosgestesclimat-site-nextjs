'use client'

import DefaultErrorAlert from '@/components/error/DefaultErrorAlert'
import Trans from '@/components/translation/trans/TransClient'
import { STATUS_UNAUTHORISED } from '@/constants/requests/status'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import Title from '@/design-system/layout/Title'
import useFetchOrganisations from '@/hooks/organisations/useFetchOrganisations'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { AxiosError } from 'axios'
import Image from 'next/image'
import CreateOrganisation from './Organisations/CreateOrganisation'
import PollsList from './Organisations/PollsList'

export default function Organisations() {
  const { t } = useClientTranslation()

  const { data: organisations, isLoading, error } = useFetchOrganisations()

  return (
    <>
      <Title
        tag="h2"
        className="mt-16"
        title={<Trans>Organisations et campagnes</Trans>}
      />

      {isLoading && <BlockSkeleton />}

      {!isLoading && (
        <div className="flex flex-wrap justify-center gap-16 md:flex-nowrap">
          <div className="flex-1">
            <PollsList organisations={organisations} />

            {(!organisations || organisations?.length === 0) && (
              <CreateOrganisation />
            )}
          </div>
          <Image
            className="-mt-12 mb-12 w-60 self-start md:w-80"
            src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/people_with_paperboard_02aeb70378.png"
            width="380"
            height="400"
            alt={t('Un groupe de personnes discutant devant un paperboard.')}
          />
        </div>
      )}

      {error && (error as AxiosError).status !== STATUS_UNAUTHORISED && (
        <DefaultErrorAlert />
      )}
    </>
  )
}
