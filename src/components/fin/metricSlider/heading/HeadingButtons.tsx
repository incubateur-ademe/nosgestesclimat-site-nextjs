'use client'

import SaveIcon from '@/components/icons/SaveIcon'
import ShareSimulationButton from '@/components/sharing/ShareSimulationButton'
import Trans from '@/components/translation/trans/TransClient'
import { trackEndClickSaveShortcut } from '@/constants/tracking/pages/end'
import { trackSimulationClickSaveShortcut } from '@/constants/tracking/pages/simulateur'
import Button from '@/design-system/buttons/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEndPageSharedUrl } from '@/hooks/useEndPageSharedUrl'

import { twMerge } from 'tailwind-merge'

const sizeClassNames = {
  sm: 'p-0! h-10 w-10',
  md: 'p-0! h-10 w-10',
}
const saveClassNames = {
  sm: 'h-6 w-6',
  md: 'h-6 w-6',
}

interface Props {
  size?: 'sm' | 'md'
  endPage?: boolean
  showSaveButton?: boolean
}

export default function HeadingButtons({
  size = 'md',
  endPage,
  showSaveButton,
}: Props) {
  const { sharedUrl } = useEndPageSharedUrl()

  const { t } = useClientTranslation()

  const handleScroll = (id: string, block: ScrollLogicalPosition) => {
    const emailBlock = document.getElementById(id)
    emailBlock?.scrollIntoView({ behavior: 'smooth', block })
  }

  return (
    <div className="mb-1 flex gap-2">
      {showSaveButton && (
        <Button
          color="text"
          size="sm"
          aria-label={t('Sauvegarder')}
          className={twMerge(
            sizeClassNames[size],
            'font-medium lg:w-auto lg:gap-2 lg:px-4! lg:py-2!'
          )}
          onClick={() => {
            if (endPage) {
              trackEndClickSaveShortcut()
            } else {
              trackSimulationClickSaveShortcut()
            }
            handleScroll('email-block', 'center')
          }}>
          <SaveIcon
            className={twMerge('fill-primary-700', saveClassNames[size])}
          />
          <span className="sr-only lg:not-sr-only">
            <Trans>Sauvegarder</Trans>
          </span>
        </Button>
      )}

      <ShareSimulationButton url={sharedUrl} />
    </div>
  )
}
