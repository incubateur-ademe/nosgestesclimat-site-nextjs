import { SERVER_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Props = {
  orgaSlug?: string | null
}
export const useLogoutOrganisation = ({ orgaSlug }: Props) => {
  return useMutation({
    mutationKey: ['useLogoutOrganisation', orgaSlug],
    mutationFn: () =>
      axios.post(`${SERVER_URL}/organisations/logout`, null, {
        withCredentials: true,
      }),
  })
}
