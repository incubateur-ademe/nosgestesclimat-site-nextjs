' use client'

import {
  trackingUserAccountFakeDoorAccept,
  trackingUserAccountFakeDoorRefuse,
} from '@/constants/tracking/misc'
import Card from '@/design-system/layout/Card'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useState } from 'react'
import AcceptedState from './AcceptedState'
import DefautState from './DefautState'
import RefusedState from './RefusedState'
import ThanksState from './ThanksState'

enum State {
  'default',
  'accepted',
  'refused',
  'thanks',
}

export default function CreateAccountBlock() {
  const [state, setState] = useState(State.default)

  const onAccept = () => {
    trackEvent(trackingUserAccountFakeDoorAccept)
    setState(State.accepted)
  }

  const onRefuse = () => {
    trackEvent(trackingUserAccountFakeDoorRefuse)
    setState(State.refused)
  }

  const onAfterSend = () => {
    setState(State.thanks)
  }

  return (
    <Card className="items-start border-none bg-[#F4F5FB] p-8 lg:my-12">
      {state === State.default && (
        <DefautState onAccept={onAccept} onRefuse={onRefuse} />
      )}

      {state === State.accepted && <AcceptedState />}

      {state === State.refused && <RefusedState onAfterSend={onAfterSend} />}

      {state === State.thanks && <ThanksState />}
    </Card>
  )
}
