import { SERVER_URL } from '@/constants/urls'
import { PollInfo } from '@/types/organisations'
import axios from 'axios'

type Props = {
  pollSlugs?: (string | null | undefined)[]
}
export const fetchPolls = async ({ pollSlugs }: Props): Promise<PollInfo[]> =>
  axios
    .post(`${SERVER_URL}/polls/fetch-polls`, {
      polls: pollSlugs,
    })
    .then((res) => res.data)
