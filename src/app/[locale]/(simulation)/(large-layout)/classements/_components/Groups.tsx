'use client'

import DefaultErrorAlert from '@/components/error/DefaultErrorAlert'
import Trans from '@/components/translation/trans/TransClient'
import { linkToGroupCreation } from '@/constants/group'
import { classementCreateGroup } from '@/constants/tracking/pages/classements'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import Title from '@/design-system/layout/Title'
import { useFetchGroupsOfUser } from '@/hooks/groups/useFetchGroupsOfUser'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'
import GroupContent from './groups/GroupContent'

export default function Groups() {
  const { data: groups, isLoading, isError } = useFetchGroupsOfUser()

  const { t } = useClientTranslation()

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
        <Title tag="h1" title={<Trans>Groupes d'amis</Trans>} />

        {groups && groups.length > 0 && (
          <ButtonLink
            href={linkToGroupCreation}
            trackingEvent={classementCreateGroup}
            color="secondary"
            size="sm"
            className="-order-1 mb-2 self-end sm:order-1 sm:mb-0 sm:self-auto"
            data-cypress-id="button-create-other-group">
            <Trans>Créer un autre groupe</Trans>
          </ButtonLink>
        )}
      </div>

      {isLoading && <BlockSkeleton />}

      {isError && <DefaultErrorAlert />}

      {groups && (
        <>
          <p className="text-gray-500">
            <Trans>
              Comparez vos résultats avec votre famille ou un groupe d’ami·e·s
            </Trans>
          </p>

          <div className="flex flex-wrap justify-center gap-16 md:flex-nowrap">
            <div className="flex-1">
              <GroupContent groups={groups} />
            </div>

            <Image
              className="w-60 self-start md:-mt-12 md:w-80"
              src="/images/illustrations/people-playing.png"
              width="380"
              height="400"
              alt={t("Un groupe d'amis jouant à un jeu de société.")}
            />
          </div>
        </>
      )}
    </>
  )
}
