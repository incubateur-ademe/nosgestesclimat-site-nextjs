'use client'

import HelpCircleIcon from '@/components/icons/HelpCircleIcon'
import ListIcon from '@/components/icons/ListIcon'
import SaveCheckIcon from '@/components/icons/SaveCheckIcon'
import SaveIcon from '@/components/icons/SaveIcon'
import TransClient from '@/components/translation/trans/TransClient'
import { simulateurOpenScoreInfo } from '@/constants/tracking/pages/simulateur'
import { TUTORIALS } from '@/constants/tutorial'
import Button from '@/design-system/inputs/Button'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
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
          'p-0! lg:px-4! lg:py-2! h-10 w-10 font-medium lg:w-auto lg:gap-2'
        )}
        onClick={() => {
          trackEvent(simulateurOpenScoreInfo)
          showTutorial(TUTORIALS.SCORE_EXPLANATION)
        }}>
        <HelpCircleIcon className="h-6 w-6 stroke-primary-700" />

        <span className="hidden lg:inline">
          <TransClient>Aide</TransClient>
        </span>
      </Button>

      <Button
        color="text"
        size="sm"
        className="p-0! lg:px-4! lg:py-2! h-10 w-10 font-medium lg:w-auto lg:gap-2"
        onClick={() => {
          toggleQuestionList()
        }}>
        <ListIcon className="h-6 w-6 fill-primary-700" />
        <span className="hidden lg:inline">
          <TransClient>Liste des questions</TransClient>
        </span>
      </Button>

      {toggleSaveModal ? (
        <Button
          color="text"
          size="sm"
          className="p-0! lg:px-4! lg:py-2! h-10 w-10 font-medium lg:w-auto lg:gap-2"
          onClick={() => {
            toggleSaveModal()
          }}>
          {savedViaEmail ? (
            <SaveCheckIcon className="h-6 w-6 fill-primary-700" />
          ) : (
            <SaveIcon className="h-6 w-6 fill-primary-700" />
          )}
          <span className="hidden lg:inline">
            <TransClient>Reprendre plus tard</TransClient>
          </span>
        </Button>
      ) : null}
    </div>
  )
}
