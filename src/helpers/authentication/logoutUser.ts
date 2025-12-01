import { AUTHENTICATION_URL } from '@/constants/urls/main'

export function logoutUser() {
  return fetch(`${AUTHENTICATION_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  })
}
