'use client'

import { usePartner } from '@/contexts/partner/PartnerContext'
import Alert from '@/design-system/alerts/alert/Alert'

export default function PartnerRedirectionAlert() {
  const { alertToDisplay } = usePartner()

  if (!alertToDisplay) return null

  return (
    <Alert type={alertToDisplay.type} description={alertToDisplay.content} />
  )
}
