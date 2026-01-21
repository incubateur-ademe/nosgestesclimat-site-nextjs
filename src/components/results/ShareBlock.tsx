'use client'

import Trans from '@/components/translation/trans/TransClient'
import { endClickShare } from '@/constants/tracking/pages/end'
import CopyInput from '@/design-system/inputs/CopyInput'
import Title from '@/design-system/layout/Title'
import { useEndPageSharedUrl } from '@/hooks/useEndPageSharedUrl'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function ShareBlock() {
  const { sharedUrl } = useEndPageSharedUrl()

  return (
    <div id="share-block">
      {/*eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
      <label id="share-block-label">
        <Title tag="h2">
          <Trans>Partager mon résultat</Trans>
        </Title>

        <CopyInput
          aria-labelledby="share-block-label"
          textToCopy={sharedUrl}
          textToDisplay={sharedUrl}
          canShare
          onClick={() => trackEvent(endClickShare)}
        />
      </label>
    </div>
  )
}
