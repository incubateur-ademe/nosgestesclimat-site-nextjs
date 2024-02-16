import { SERVER_URL } from '@/constants/urls'
import { PollInfo } from '@/types/organisations'
import axios from 'axios'

type Props = {
  pollSlugs?: (string | undefined)[]
}
export const fetchPolls = async ({ pollSlugs }: Props): Promise<PollInfo[]> =>
  axios
    .post(`${SERVER_URL}/organisations/fetch-polls`, {
      polls: pollSlugs,
    })
    .then((res) => res.data)
