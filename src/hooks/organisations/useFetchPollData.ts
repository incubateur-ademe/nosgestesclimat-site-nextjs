import { SERVER_URL } from '@/constants/urls'
import { useUser } from '@/publicodes-state'
import { PollData } from '@/types/organisations'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from '../useLocale'

type Props = {
  enabled?: boolean
  orgaSlug?: string
}

export function useFetchPollData(
  props?: Props
): UseQueryResult<PollData | null, Error> {
  const { enabled = true, orgaSlug } = props ?? {}

  const locale = useLocale()

  const { user } = useUser()

  const regionCode =
    user?.region?.code != undefined && user?.region?.code !== ''
      ? user?.region?.code
      : 'FR'

  const fileName = `co2-model.${regionCode}-lang.${locale}.json`

  return useQuery({
    queryKey: ['pollData', fileName],
    queryFn: () =>
      axios
        .post(SERVER_URL + '/organisations/fetch-poll-processed-data', {
          orgaSlug,
          email: user?.email,
          fileName,
          userId: user?.id,
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error(err)
          return null
        }),
    enabled: !!fileName && !!user?.email && !!user?.id && enabled,
  })
}
