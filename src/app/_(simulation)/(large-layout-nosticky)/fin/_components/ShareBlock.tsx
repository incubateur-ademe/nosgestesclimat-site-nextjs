import Trans from '@/components/translation/Trans'
import { endClickShare } from '@/constants/tracking/pages/end'
import CopyInput from '@/design-system/inputs/CopyInput'
import Title from '@/design-system/layout/Title'
import { useEndPageSharedUrl } from '@/hooks/useEndPageSharedUrl'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function ShareBlock() {
  const { sharedUrl } = useEndPageSharedUrl()

  return (
    <div id="share-block" className="">
      <Title tag="h2">
        <Trans>Partager mon résultat</Trans>
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
