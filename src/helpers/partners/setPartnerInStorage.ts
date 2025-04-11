import { PARTNER_KEY } from '@/constants/partners'

export function setPartnerInStorage(partnerParams: Record<string, string>) {
  sessionStorage.setItem(PARTNER_KEY, JSON.stringify(partnerParams))
}
