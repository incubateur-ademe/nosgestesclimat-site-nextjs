'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { endClickShare } from '@/constants/tracking/pages/end'
import CopyInput from '@/design-system/inputs/CopyInput'
import Title from '@/design-system/layout/Title'
import { useEndPageSharedUrl } from '@/hooks/useEndPageSharedUrl'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function ShareBlock() {
  const { sharedUrl } = useEndPageSharedUrl()

  return (
    <div id="share-block" className="">
      <Title tag="h2">
        <TransClient>Partager mon résultat</TransClient>
      </Title>

      <CopyInput
        textToCopy={sharedUrl}
        textToDisplay={sharedUrl}
        canShare
        onClick={() => trackEvent(endClickShare)}
      />
    </div>
  )
}
