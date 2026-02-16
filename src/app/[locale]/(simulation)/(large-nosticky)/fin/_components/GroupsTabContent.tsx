'use client'

import EmptyState from '@/app/[locale]/(server)/(large)/(user-account)/mon-espace/groupes/_components/EmptyState'
import AuthenticateUserForm from '@/components/AuthenticateUserForm'
import DefaultErrorAlert from '@/components/error/DefaultErrorAlert'
import Groups from '@/components/results/groups/Groups'
import Organisation from '@/components/results/groups/Organisation'
import {
  captureGroupsLoginComplete,
  groupsLoginComplete,
} from '@/constants/tracking/pages/end'
import { fetchUserGroups } from '@/helpers/groups/fetchUserGroups'
import { fetchOrganisationsClient } from '@/helpers/organisations/fetchOrganisationsClient'
import type { UserServer } from '@/helpers/server/model/user'
import { useUser } from '@/publicodes-state'
import type { Group } from '@/types/groups'
import type { Organisation as OrganisationT } from '@/types/organisations'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { useQuery } from '@tanstack/react-query'
import { Trans } from 'react-i18next'
import FinPageSkeleton from '../skeleton'

export default function GroupsTabContent({ user }: { user?: UserServer }) {
  const clientUserId = useUser()?.user.userId
  const userId = user?.id ?? clientUserId
  console.log({ userId })
  // Fetch groups if authenticated
  const {
    data: groupsData,
    isError: isErrorGroups,
    isLoading: isLoadingGroups,
  } = useQuery({
    queryKey: ['userGroups', userId],
    queryFn: () => fetchUserGroups(userId),
    enabled: !!userId,
  })
  // Fetch organisations if authenticated
  const {
    data: organisationsData,
    isError: isErrorOrganisations,
    isLoading: isLoadingOrganisations,
  } = useQuery({
    queryKey: ['organisations'],
    queryFn: fetchOrganisationsClient,
    enabled: !!userId,
  })
  const groups = (groupsData?.groups as Group[]) ?? []
  const organisation =
    (organisationsData?.organisations?.[0] as OrganisationT) ?? null
  const isError = isErrorGroups || isErrorOrganisations
  const isLoading = isLoadingGroups || isLoadingOrganisations

  const onLoginComplete = () => {
    window.location.reload()
    trackEvent(groupsLoginComplete)
    trackPosthogEvent(captureGroupsLoginComplete)
  }

  if (isLoading) {
    return <FinPageSkeleton />
  }

  if (isError) {
    return <DefaultErrorAlert />
  }

  if (!organisation && !groups.length) {
    return (
      <>
        <EmptyState />
        {!user && (
          <div className="bg-primary-50 mt-8 w-xl max-w-full rounded-xl p-6">
            <h2 className="mb-6 font-normal">
              <Trans i18nKey="mon-espace.groups.loginBlock.title">
                Déjà un groupe ou une organisation ?
              </Trans>
            </h2>
            <AuthenticateUserForm
              buttonLabel={
                <Trans i18nKey="mon-espace.groups.loginBlock.buttonLabel">
                  Suivant
                </Trans>
              }
              buttonColor="secondary"
              onComplete={onLoginComplete}
            />
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <Organisation organisation={organisation} />

      <Groups groups={groups} />
    </>
  )
}
