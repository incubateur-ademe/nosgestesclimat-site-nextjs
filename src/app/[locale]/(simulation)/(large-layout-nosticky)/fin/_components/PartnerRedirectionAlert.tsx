'use client'

import { usePartner } from '@/contexts/partner/PartnerContext'
import Alert from '@/design-system/alerts/alert/Alert'
import Card from '@/design-system/layout/Card'

export default function PartnerRedirectionAlert() {
  const { alertToDisplay } = usePartner()

  if (!alertToDisplay) return null

  if (alertToDisplay.type === 'error') {
    return (
      <Alert
        className="mb-8"
        type={alertToDisplay.type}
        description={alertToDisplay.content}
      />
    )
  }

  return (
    <Card
      className={'mb-8 inline-block items-start border-none bg-[#F4F5FB] p-8'}>
      {alertToDisplay.content}
    </Card>
  )
}
