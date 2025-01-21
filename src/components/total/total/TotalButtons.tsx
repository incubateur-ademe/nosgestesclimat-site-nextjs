'use client'

import HelpCircleIcon from '@/components/icons/HelpCircleIcon'
import ListIcon from '@/components/icons/ListIcon'
import SaveCheckIcon from '@/components/icons/SaveCheckIcon'
import SaveIcon from '@/components/icons/SaveIcon'
import Trans from '@/components/translation/Trans'
import { simulateurOpenScoreInfo } from '@/constants/tracking/pages/simulateur'
import { TUTORIALS } from '@/constants/tutorial'
import Button from '@/design-system/inputs/Button'
import {
  getFillColor,
  getStrokeColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { useCurrentSimulation, useForm, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { twMerge } from 'tailwind-merge'

type Props = {
  toggleQuestionList: () => void
  toggleSaveModal?: () => void
}

export default function TotalButtons({
  toggleQuestionList,
  toggleSaveModal,
}: Props) {
  const { savedViaEmail } = useCurrentSimulation()

  const { currentCategory } = useForm()

  const { showTutorial, tutorials } = useUser()
  console.log(tutorials)
  return (
    <div className="flex">
      <Button
        color="text"
        size="sm"
        className={twMerge(
          'h-10 w-10 !p-0 font-medium lg:w-auto lg:gap-2 lg:!px-4 lg:!py-2',
          getTextDarkColor(currentCategory)
        )}
        onClick={() => {
          trackEvent(simulateurOpenScoreInfo)
          showTutorial(TUTORIALS.SCORE_EXPLANATION)
        }}>
        <HelpCircleIcon
          className={twMerge('h-6 w-6', getStrokeColor(currentCategory))}
        />

        <span
          className={twMerge(
            'hidden lg:inline',
            getTextDarkColor(currentCategory)
          )}>
          <Trans>Aide</Trans>
        </span>
      </Button>

      <Button
        color="text"
        size="sm"
        className="h-10 w-10 !p-0 font-medium lg:w-auto lg:gap-2 lg:!px-4 lg:!py-2"
        onClick={() => {
          toggleQuestionList()
        }}>
        <ListIcon
          className={twMerge('h-6 w-6', getFillColor(currentCategory))}
        />
        <span
          className={twMerge(
            'hidden lg:inline',
            getTextDarkColor(currentCategory)
          )}>
          <Trans>Liste des questions</Trans>
        </span>
      </Button>

      {toggleSaveModal ? (
        <Button
          color="text"
          size="sm"
          className="h-10 w-10 !p-0 font-medium lg:w-auto lg:gap-2 lg:!px-4 lg:!py-2"
          onClick={() => {
            toggleSaveModal()
          }}>
          {savedViaEmail ? (
            <SaveCheckIcon
              className={twMerge('h-6 w-6', getFillColor(currentCategory))}
            />
          ) : (
            <SaveIcon
              className={twMerge('h-6 w-6', getFillColor(currentCategory))}
            />
          )}
          <span
            className={twMerge(
              'hidden lg:inline',
              getTextDarkColor(currentCategory)
            )}>
            <Trans>Reprendre plus tard</Trans>
          </span>
        </Button>
      ) : null}
    </div>
  )
}
