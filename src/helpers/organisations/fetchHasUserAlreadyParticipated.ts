import { SERVER_URL } from '@/constants/urls'
import axios from 'axios'

type Props = {
  pollSlug: string
  userId: string
  email: string
}

export async function fetchHasUserAlreadyParticipated({
  pollSlug,
  userId,
  email,
}: Props) {
  return axios
    .post(`${SERVER_URL}/organisations/verify-user-participation`, {
      pollSlug,
      userId,
      email,
    })
    .then((res) => res.data)
}
