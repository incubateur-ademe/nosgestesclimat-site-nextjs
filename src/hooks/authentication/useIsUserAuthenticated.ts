import { getAuthentifiedUser } from '@/helpers/authentication/getAuthentifiedUser'
import type { AuthenticatedUser } from '@/types/authentication.d'
import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

export function useIsUserAuthenticated(): UseQueryResult<
  AuthenticatedUser | undefined,
  Error
> {
  return useQuery({
    queryKey: ['authenticatedUser'],
    queryFn: getAuthentifiedUser,
    retry: false,
  })
}
