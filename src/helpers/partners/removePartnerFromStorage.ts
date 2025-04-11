import { PARTNER_KEY } from '@/constants/partners'

export function removePartnerFromStorage() {
  sessionStorage.removeItem(PARTNER_KEY)
}
