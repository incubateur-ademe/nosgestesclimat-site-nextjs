import { getSearchParamsClientSide } from '@/helpers/getSearchParamsClientSide'

export function useGroupIdInQueryParams(): {
  groupIdInQueryParams: string | null
} {
  const searchParams = getSearchParamsClientSide()

  const groupIdInQueryParams = searchParams.get('groupId')

  return { groupIdInQueryParams }
}
