'use client'

import HelpCircleIcon from '@/components/icons/HelpCircleIcon'
import ListIcon from '@/components/icons/ListIcon'
import SaveCheckIcon from '@/components/icons/SaveCheckIcon'
import SaveIcon from '@/components/icons/SaveIcon'
import Trans from '@/components/translation/trans/TransClient'
import { simulateurOpenScoreInfo } from '@/constants/tracking/pages/simulateur'
import { TUTORIALS } from '@/constants/tutorial'
import Button from '@/design-system/buttons/Button'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { twMerge } from 'tailwind-merge'

type Props = { toggleQuestionList: () => void; toggleSaveModal?: () => void }

export default function TotalButtons({
  toggleQuestionList,
  toggleSaveModal,
}: Props) {
  const { savedViaEmail } = useCurrentSimulation()

  const { showTutorial } = useUser()

  return (
    <div className="flex">
      <Button
        color="text"
        size="sm"
        className={twMerge(
          'h-10 w-10 p-0! font-medium lg:w-auto lg:gap-2 lg:px-4! lg:py-2!'
        )}
        onClick={() => {
          trackEvent(simulateurOpenScoreInfo)
          showTutorial(TUTORIALS.SCORE_EXPLANATION)
        }}>
        <HelpCircleIcon className="stroke-primary-700 h-6 w-6" />

        <span className="hidden lg:inline">
          <Trans>Aide</Trans>
        </span>
      </Button>

      <Button
        color="text"
        size="sm"
        className="h-10 w-10 p-0! font-medium lg:w-auto lg:gap-2 lg:px-4! lg:py-2!"
        onClick={() => {
          toggleQuestionList()
        }}>
        <ListIcon className="fill-primary-700 h-6 w-6" />
        <span className="hidden lg:inline">
          <Trans>Liste des questions</Trans>
        </span>
      </Button>

      {toggleSaveModal ? (
        <Button
          color="text"
          size="sm"
          className="h-10 w-10 p-0! font-medium lg:w-auto lg:gap-2 lg:px-4! lg:py-2!"
          onClick={() => {
            toggleSaveModal()
          }}>
          {savedViaEmail ? (
            <SaveCheckIcon className="fill-primary-700 h-6 w-6" />
          ) : (
            <SaveIcon className="fill-primary-700 h-6 w-6" />
          )}
          <span className="hidden lg:inline">
            <Trans>Reprendre plus tard</Trans>
          </span>
        </Button>
      ) : null}
    </div>
  )
}
