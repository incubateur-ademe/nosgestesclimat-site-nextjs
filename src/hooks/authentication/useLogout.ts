import { logoutUser } from '@/helpers/authentication/logoutUser'
import { useMutation } from '@tanstack/react-query'

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  })
}
