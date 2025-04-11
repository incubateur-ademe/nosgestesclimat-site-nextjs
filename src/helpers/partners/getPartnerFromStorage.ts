import { PARTNER_KEY } from '@/constants/partners'

export function getPartnerFromStorage() {
  const partnerObjectString = sessionStorage.getItem(PARTNER_KEY)

  return partnerObjectString ? JSON.parse(partnerObjectString) : null
}
