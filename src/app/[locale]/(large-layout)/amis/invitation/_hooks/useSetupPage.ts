import { fetchUser } from '@/helpers/user/fetchUser'
import { useFetchGroup } from '@/hooks/groups/useFetchGroup'
import { useGroupIdInQueryParams } from '@/hooks/groups/useGroupIdInQueryParams'
import { useGroupPagesGuard } from '@/hooks/navigation/useGroupPagesGuard'
import { useQuery } from '@tanstack/react-query'

export function useSetupPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useGroupPagesGuard()

  const { groupIdInQueryParams } = useGroupIdInQueryParams()
  const { data: group, isLoading } = useFetchGroup(groupIdInQueryParams)

  const { data: authenticatedUser } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => fetchUser(),
  })

  return {
    isGuardInit,
    isGuardRedirecting,
    group,
    isLoading,
    authenticatedUser,
  }
}
