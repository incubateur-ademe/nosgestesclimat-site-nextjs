import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useFetchPollData(fileName: string) {
  return useQuery({
    queryKey: ['pollData', fileName],
    queryFn: (email) =>
      axios
        .post(SERVER_URL + '/organizations/fetch-processed-poll-data', {
          email,
          fileName,
        })
        .then((res) => res.data)
        .catch((err) => {
          console.error(err)
          return null
        }),
  })
}
