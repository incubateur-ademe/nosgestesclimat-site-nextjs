import { SERVER_URL } from '@/constants/urls'
import { PollInfo } from '@/types/organizations'
import axios from 'axios'

type Props = {
  pollsSlug?: (string | undefined)[]
}
export const fetchPolls = async ({ pollsSlug }: Props): Promise<PollInfo[]> =>
  axios
    .post(`${SERVER_URL}/organizations/fetch-polls`, {
      polls: pollsSlug,
    })
    .then((res) => res.data)
    .catch(() => console.error('Failed to fetch polls'))
