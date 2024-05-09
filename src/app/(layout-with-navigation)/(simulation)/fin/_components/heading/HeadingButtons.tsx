import SaveIcon from '@/components/icons/SaveIcon'
import ShareIcon from '@/components/icons/ShareIcon'
import { endClickSaveShortcut } from '@/constants/tracking/pages/end'
import Button from '@/design-system/inputs/Button'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { twMerge } from 'tailwind-merge'

const sizeClassNames = {
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
}
const saveClassNames = {
  sm: 'h-6 w-6',
  md: 'h-7 w-7',
}
const shareClassNames = {
  sm: 'h-[22px] w-[22px]',
  md: 'h-[26px] w-[26px]',
}

type Props = {
  size?: 'sm' | 'md'
}
export default function HeadingButtons({ size = 'md' }: Props) {
  return (
    <div className="flex gap-4">
      <Button
        color="secondary"
        className={twMerge('p-0', sizeClassNames[size])}
        onClick={() => {
          trackEvent(endClickSaveShortcut)

          const emailBlock = document.getElementById('email-block')
          emailBlock?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }}>
        <SaveIcon
          className={twMerge('fill-primary-700', saveClassNames[size])}
        />
      </Button>
      <Button
        className={twMerge('p-0', sizeClassNames[size])}
        onClick={() => {
          const emailBlock = document.getElementById('share-block')
          emailBlock?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }}>
        <ShareIcon
          className={twMerge('mr-[1px] fill-white', shareClassNames[size])}
        />
      </Button>
    </div>
  )
}
