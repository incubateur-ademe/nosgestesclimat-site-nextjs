import { PARTNER_KEY } from '@/constants/partners'
import { isServerSide } from '@/utils/nextjs/isServerSide'

export function getPartnerFromStorage() {
  if (isServerSide()) return

  const partnerObjectString = sessionStorage.getItem(PARTNER_KEY)

  return partnerObjectString ? JSON.parse(partnerObjectString) : null
}
