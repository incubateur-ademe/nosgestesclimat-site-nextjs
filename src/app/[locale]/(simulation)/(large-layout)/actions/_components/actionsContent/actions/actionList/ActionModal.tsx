import { actionsClickYes } from "@/constants/tracking/pages/actions"
import Modal from "@/design-system/modals/Modal"
import { FormProvider, useFormState, useRule } from "@/publicodes-state"
import { Action } from "@/publicodes-state/types"
import { trackEvent } from "@/utils/analytics/trackEvent"
import { DottedName } from "@incubateur-ademe/nosgestesclimat"
import { useEffect, useState } from "react"
import ActionForm from "../ActionForm"

export default function ActionModal({
  action,
  closeModal,
  ariaLabel,
  getCategory,
  toggleActionChoice,
  actionChoices,
  setActionWithFormOpen,
  handleUpdatePersistedActions,
}: {
  action: Action
  closeModal: () => void
  ariaLabel: string
  getCategory: (dottedName: DottedName) => DottedName
  toggleActionChoice: (actionChoiceDottedName: DottedName) => void
  actionChoices: Partial<Record<DottedName, boolean>>
  setActionWithFormOpen: (dottedName: string) => void
  handleUpdatePersistedActions: () => void
}) {
  const [position, setPosition] = useState<'center' | 'top'>('center')

    const { currentQuestion } = useFormState()
    const questionToCheck = currentQuestion || action.dottedName
    const { type } = useRule(questionToCheck)
  
    useEffect(() => {
      // Position at top for mosaic questions which have many fields
      const newPosition: 'center' | 'top' =
        type === 'numberMosaic' || type === 'selectMosaic' ? 'top' : 'center'
      setPosition(newPosition)
    }, [type, setPosition])

  return (
    <Modal
      isOpen
      ariaLabel={ariaLabel}
      closeModal={closeModal}
      hasAbortButton={false}
      hasAbortCross
      position={position}>
      <div className="w-full max-w-[40rem]">
        <FormProvider root={action.dottedName}>
          <ActionForm
            key={action.dottedName}
            action={action}
            category={getCategory(action.dottedName)}
            onComplete={() => {
              toggleActionChoice(action.dottedName)

              if (!actionChoices[action.dottedName]) {
                trackEvent(actionsClickYes(action.dottedName))
              }
              setActionWithFormOpen('')
            }}
            handleUpdatePersistedActions={handleUpdatePersistedActions}
          />
        </FormProvider>
      </div>
    </Modal>
  )
}