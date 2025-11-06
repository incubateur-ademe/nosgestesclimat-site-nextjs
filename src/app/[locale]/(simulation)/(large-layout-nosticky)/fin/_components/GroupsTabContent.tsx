'use client'

import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import EmptyState from '@/app/[locale]/mon-espace/groupes/_components/EmptyState'
import DefaultErrorAlert from '@/components/error/DefaultErrorAlert'
import Groups from '@/components/groups/Groups'
import Organisations from '@/components/groups/Organisations'
import { fetchUserGroups } from '@/helpers/groups/fetchUserGroups'
import { fetchOrganisationsClient } from '@/helpers/organisations/fetchOrganisationsClient'
import { useGetAuthentifiedUser } from '@/hooks/authentication/useGetAuthentifiedUser'
import { useQuery } from '@tanstack/react-query'

export default function GroupsTabContent() {
  const { data: authenticatedUser } = useGetAuthentifiedUser()

  // Fetch groups if authenticated
  const {
    data: groupsData,
    isError: isErrorGroups,
    isLoading: isLoadingGroups,
  } = useQuery({
    queryKey: ['userGroups', authenticatedUser?.id],
    queryFn: () => fetchUserGroups(authenticatedUser!.id),
    enabled: !!authenticatedUser?.id,
  })

  // Fetch organisations if authenticated
  const {
    data: organisationsData,
    isError: isErrorOrganisations,
    isLoading: isLoadingOrganisations,
  } = useQuery({
    queryKey: ['organisations'],
    queryFn: fetchOrganisationsClient,
    enabled: !!authenticatedUser?.id,
  })

  const groups = groupsData?.groups || []
  const organisations = organisationsData?.organisations || []
  const isError = isErrorGroups || isErrorOrganisations
  const isLoading = isLoadingGroups || isLoadingOrganisations

  // Show empty state if not authenticated or no groups/organisations
  const showEmptyState =
    !authenticatedUser ||
    (!isLoading &&
      !((groups?.length ?? 0) > 0) &&
      !((organisations.length ?? 0) > 0))

  if (isError) {
    return (
      <QueryClientProviderWrapper>
        <DefaultErrorAlert />
      </QueryClientProviderWrapper>
    )
  }

  if (showEmptyState) {
    return (
      <QueryClientProviderWrapper>
        <EmptyState />
      </QueryClientProviderWrapper>
    )
  }

  return (
    <QueryClientProviderWrapper>
      {organisations.length > 0 && (
        <div className="mb-10">
          <Organisations organisations={organisations} />
        </div>
      )}
      {groups.length > 0 && <Groups groups={groups} />}
    </QueryClientProviderWrapper>
  )
}
