'use client'

import GroupLoader from '@/components/groups/GroupLoader'
import Trans from '@/components/translation/Trans'
import { classementCreateGroup } from '@/constants/tracking/pages/classements'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { linkToGroupCreation } from '@/helpers/navigation/groupPages'
import { useFetchGroupsOfUser } from '@/hooks/groups/useFetchGroupsOfUser'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'
import GroupContent from './groups/GroupContent'

export default function Groups() {
  const { data: groups, isLoading, isError } = useFetchGroupsOfUser()

  const { t } = useClientTranslation()

  if (isLoading) {
    return <GroupLoader />
  }

  return (
    <>
      <div className="flex items-baseline justify-between">
        <Title
          tag="h2"
          title={<Trans>Groupes d'amis</Trans>}
          subtitle={
            <Trans>
              Comparez vos résultats avec votre famille ou un groupe d’ami·e·s
            </Trans>
          }
        />

        {groups && groups.length > 0 && (
          <ButtonLink
            href={linkToGroupCreation}
            trackingEvent={classementCreateGroup}
            color="secondary"
            size="sm"
            data-cypress-id="button-create-other-group">
            <Trans>Créer un autre groupe</Trans>
          </ButtonLink>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-16 md:flex-nowrap">
        <div className="flex-1">
          <GroupContent isError={isError} groups={groups} />
        </div>

        <Image
          className="-mt-12 self-start"
          src="/images/illustrations/people-playing.svg"
          width="380"
          height="400"
          alt={t("Un groupe d'amis jouant à un jeu de société.")}
        />
      </div>
    </>
  )
}
