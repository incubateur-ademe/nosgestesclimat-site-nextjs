import { SERVER_URL } from '@/constants/urls'
import { PollInfo } from '@/types/organizations'
import axios from 'axios'

type Props = {
  pollSlugs?: (string | undefined)[]
}
export const fetchPolls = async ({ pollSlugs }: Props): Promise<PollInfo[]> =>
  axios
    .post(`${SERVER_URL}/organizations/fetch-polls`, {
      polls: pollSlugs,
    })
    .then((res) => res.data)
    .catch(() => console.error('Failed to fetch polls'))
