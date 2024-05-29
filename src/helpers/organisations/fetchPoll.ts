import { SERVER_URL } from '@/constants/urls'
import { PollInfo } from '@/types/organisations'
import axios from 'axios'

type Props = {
  pollSlug?: string | null
}
export const fetchPublicPollInfo = async ({
  pollSlug,
}: Props): Promise<PollInfo> =>
  axios
    .get(`${SERVER_URL}/polls/fetch-public-poll/${pollSlug}`)
    .then((res) => res.data)
