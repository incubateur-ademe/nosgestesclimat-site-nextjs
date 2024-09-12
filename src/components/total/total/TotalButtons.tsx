'use client'

import ListIcon from '@/components/icons/ListIcon'
import SaveCheckIcon from '@/components/icons/SaveCheckIcon'
import SaveIcon from '@/components/icons/SaveIcon'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import { useCurrentSimulation } from '@/publicodes-state'

type Props = {
  toggleQuestionList: () => void
  toggleSaveModal?: () => void
}

export default function TotalButtons({
  toggleQuestionList,
  toggleSaveModal,
}: Props) {
  const { savedViaEmail } = useCurrentSimulation()

  return (
    <div className="flex">
      <Button
        color="text"
        size="sm"
        className="h-10 w-10 !p-0 font-medium lg:w-auto lg:gap-2 lg:!px-4 lg:!py-2"
        onClick={() => {
          toggleQuestionList()
        }}>
        <ListIcon className="h-6 w-6 fill-primary-700" />
        <span className="hidden lg:inline">
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
            <SaveCheckIcon className="h-6 w-6 fill-primary-700" />
          ) : (
            <SaveIcon className="h-6 w-6 fill-primary-700" />
          )}
          <span className="hidden lg:inline">
            <Trans>Reprendre plus tard</Trans>
          </span>
        </Button>
      ) : null}
    </div>
  )
}
