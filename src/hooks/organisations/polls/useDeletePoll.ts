import { ORGANISATION_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'

export function useDeletePoll() {
  const param = useParams<{ orgaSlug: string; pollSlug: string }>() 
  const orgaSlug = param?.orgaSlug
  const pollSlug = param?.pollSlug

  return useMutation({
    mutationKey: ['organisations', orgaSlug, 'polls', pollSlug],
    mutationFn: () =>
      axios
        .delete(`${ORGANISATION_URL}/${orgaSlug}/polls/${pollSlug}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  })
}
