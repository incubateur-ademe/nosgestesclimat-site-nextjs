'use client'

import ListIcon from '@/components/icons/ListIcon'
import SaveCheckIcon from '@/components/icons/SaveCheckIcon'
import SaveIcon from '@/components/icons/SaveIcon'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import { useDebug } from '@/hooks/useDebug'
import { useCurrentSimulation } from '@/publicodes-state'

type Props = { toggleQuestionList: () => void; toggleSaveModal?: () => void }

export default function TotalButtons({
  toggleQuestionList,
  toggleSaveModal,
}: Props) {
  const { savedViaEmail } = useCurrentSimulation()

  const isDebug = useDebug()

  return (
    <div className="flex">
      {isDebug && (
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
      )}

      {toggleSaveModal ? (
        <Button
          color="text"
          size="sm"
          className="h-10 w-10 gap-2 p-0! font-medium sm:w-auto lg:px-4! lg:py-2!"
          onClick={() => {
            toggleSaveModal()
          }}>
          {savedViaEmail ? (
            <SaveCheckIcon className="fill-primary-700 h-6 w-6" />
          ) : (
            <SaveIcon className="fill-primary-700 h-6 w-6" />
          )}
          <span className="hidden sm:inline">
            <Trans>Reprendre plus tard</Trans>
          </span>
        </Button>
      ) : null}
    </div>
  )
}
