import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  fileName: string
  userId: string
  email: string
}

export function useFetchPollData({ fileName, userId, email }: Props) {
  return useQuery({
    queryKey: ['pollData', fileName],
    queryFn: () =>
      axios
        .post(SERVER_URL + '/organizations/fetch-processed-poll-data', {
          email,
          fileName,
          userId,
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error(err)
          return null
        }),
    enabled: !!fileName && !!email && !!userId,
  })
}
