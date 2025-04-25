'use client'

import SecondsTimer from '@/components/interactions/SecondsTimer'
import { usePartner } from '@/contexts/partner/PartnerContext'

export default function RedirectTimer() {
  const { redirectUrl } = usePartner()

  const handleNavigation = () => {
    if (typeof window === 'undefined') return

    window.location.href = redirectUrl
  }

  return <SecondsTimer duration={20} onComplete={handleNavigation} />
}
