import { AUTHENTICATION_URL } from '@/constants/urls'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useLogout = () => {
  return useMutation({
    mutationFn: () =>
      axios.post(`${AUTHENTICATION_URL}/logout`, null, {
        withCredentials: true,
      }),
  })
}
