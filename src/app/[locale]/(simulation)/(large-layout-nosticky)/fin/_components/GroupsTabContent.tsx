'use client'

import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import EmptyState from '@/app/[locale]/mon-espace/groupes/_components/EmptyState'
import DefaultErrorAlert from '@/components/error/DefaultErrorAlert'
import Groups from '@/components/results/groups/Groups'
import Organisations from '@/components/results/groups/Organisations'
import SignInOrSignUpForm from '@/components/signIn/SignInOrSignUpForm'
import Trans from '@/components/translation/trans/TransClient'
import { SIGNUP_MODE } from '@/constants/authentication/modes'
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
        {!authenticatedUser && (
          <div className="bg-primary-50 mt-8 w-xl max-w-full rounded-xl p-6">
            <h2 className="mb-6 font-normal">
              <Trans i18nKey="mon-espace.groups.loginBlock.title">
                Déjà un groupe ou une organisation ?
              </Trans>
            </h2>
            <SignInOrSignUpForm
              buttonLabel={
                <Trans i18nKey="mon-espace.groups.loginBlock.buttonLabel">
                  Suivant
                </Trans>
              }
              buttonColor="secondary"
              onComplete={() => window.location.reload()}
              mode={SIGNUP_MODE}
            />
          </div>
        )}
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
