import { getSearchParamsClientSide } from '@/helpers/getSearchParamsClientSide'

export function usePollQueryParams() {
  const searchParams = getSearchParamsClientSide()

  return { pollSlug: searchParams.get('poll') }
}
