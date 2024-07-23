import SaveIcon from '@/components/icons/SaveIcon'
import ShareIcon from '@/components/icons/ShareIcon'
import Trans from '@/components/translation/Trans'
import {
  endClickSaveShortcut,
  endClickShareShortcut,
} from '@/constants/tracking/pages/end'
import { simulationClickSaveShortcut } from '@/constants/tracking/pages/simulateur'
import Button from '@/design-system/inputs/Button'
import { useEndPageSharedUrl } from '@/hooks/useEndPageSharedUrl'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { twMerge } from 'tailwind-merge'

const sizeClassNames = {
  sm: '!p-0 h-10 w-10',
  md: '!p-0 h-10 w-10',
}
const saveClassNames = {
  sm: 'h-6 w-6',
  md: 'h-6 w-6',
}
const shareClassNames = {
  sm: 'h-[22px] w-[22px]',
  md: 'h-[22px] w-[22px]',
}

type Props = {
  size?: 'sm' | 'md'
  endPage?: boolean
}
export default function HeadingButtons({ size = 'md', endPage }: Props) {
  const { sharedUrl } = useEndPageSharedUrl()

  const handleShare = async () => {
    if (navigator?.share) {
      await navigator
        .share({
          text: sharedUrl,
          url: sharedUrl,
          title: 'Découvre mon empreinte carbone !',
        })
        .catch((e) => console.log(e))
    } else {
      handleScroll('share-block')
    }
  }

  const handleScroll = (id: string) => {
    const emailBlock = document.getElementById(id)
    emailBlock?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="flex">
      <Button
        color="text"
        size="sm"
        className={twMerge(
          sizeClassNames[size],
          'font-medium lg:w-auto lg:gap-2 lg:!px-4 lg:!py-2'
        )}
        onClick={() => {
          trackEvent(
            endPage ? endClickSaveShortcut : simulationClickSaveShortcut
          )
          handleScroll('email-block')
        }}>
        <SaveIcon
          className={twMerge('fill-primary-700', saveClassNames[size])}
        />
        <span className="hidden lg:inline">
          <Trans>Sauvegarder</Trans>
        </span>
      </Button>
      <Button
        color="text"
        size="sm"
        className={twMerge(
          sizeClassNames[size],
          'font-medium lg:w-auto lg:gap-2 lg:!px-4 lg:!py-2'
        )}
        onClick={() => {
          trackEvent(endClickShareShortcut)
          handleShare()
        }}>
        <ShareIcon
          className={twMerge(
            'mr-[1px] fill-primary-700',
            shareClassNames[size]
          )}
        />
        <span className="hidden lg:inline">
          <Trans>Partager</Trans>
        </span>
      </Button>
    </div>
  )
}
