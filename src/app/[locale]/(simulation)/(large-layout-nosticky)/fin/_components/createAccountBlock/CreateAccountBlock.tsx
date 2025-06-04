' use client'

import {
  trackingUserAccountFakeDoorAccept,
  trackingUserAccountFakeDoorRefuse,
} from '@/constants/tracking/misc'
import Card from '@/design-system/layout/Card'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useState } from 'react'
import DefautState from './DefautState'

enum State {
  'default',
  'accepted',
  'refused',
  'thanks',
}

export default function CreateAccountBlock() {
  const [state, setState] = useState(State.default)

  const { t } = useClientTranslation()

  const onAccept = () => {
    trackEvent(trackingUserAccountFakeDoorAccept)
    setState(State.accepted)
  }

  const onRefuse = () => {
    trackEvent(trackingUserAccountFakeDoorRefuse)
    setState(State.refused)
  }

  return (
    <Card className="mb-12 items-start border-none bg-[#F4F5FB] p-8">
      {state === State.default && (
        <DefautState onAccept={onAccept} onRefuse={onRefuse} />
      )}
    </Card>
  )
}
