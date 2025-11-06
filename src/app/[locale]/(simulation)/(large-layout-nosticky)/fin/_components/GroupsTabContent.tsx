'use client'

import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import DefaultErrorAlert from '@/components/error/DefaultErrorAlert'
import { ORGANISATION_URL } from '@/constants/urls/main'
import { fetchUserGroups } from '@/helpers/groups/fetchUserGroups'
import { useGetAuthentifiedUser } from '@/hooks/authentication/useGetAuthentifiedUser'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

// Dynamically import server components with no SSR
const Groups = dynamic(() => import('@/components/groups/Groups'), {
  ssr: false,
})
const Organisations = dynamic(
  () => import('@/components/groups/Organisations'),
  { ssr: false }
)
const EmptyState = dynamic(
  () => import('@/app/[locale]/mon-espace/groupes/_components/EmptyState'),
  { ssr: false }
)

async function fetchOrganisationsClient() {
  try {
    const response = await fetch(ORGANISATION_URL, {
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch organisations')
    }

    const data = await response.json()

    return { organisations: data, isError: false }
  } catch (error) {
    // User may not have any organisations
    return { organisations: [], isError: false }
  }
}

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
