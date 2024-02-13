import { SERVER_URL } from '@/constants/urls'
import { PollInfo } from '@/types/organisations'
import axios from 'axios'

type Props = {
  pollSlug?: string | null
}
export const fetchPoll = async ({ pollSlug }: Props): Promise<PollInfo> =>
  axios
    .get(`${SERVER_URL}/organisations/fetch-poll/${pollSlug}`)
    .then((res) => res.data)
    .catch(() => console.error('Failed to fetch poll'))
