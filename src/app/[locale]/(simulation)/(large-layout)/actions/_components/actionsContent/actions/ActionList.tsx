'use client'

import { actionsClickYes } from '@/constants/tracking/pages/actions'
import Modal from '@/design-system/modals/Modal'
import { getIsCustomAction } from '@/helpers/actions/getIsCustomAction'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import {
  FormProvider,
  useCurrentSimulation,
  useEngine,
  useUser,
} from '@/publicodes-state'
import type { Action } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import { Fragment, useEffect, useRef, useState } from 'react'
import ActionCard from './ActionCard'
import ActionForm from './ActionForm'
import CustomActionForm from './actionList/CustomActionForm'

type Props = {
  actions: (Action & { isIrrelevant: boolean; value?: number })[]
  rules: Partial<NGCRules>
  bilan: any
  actionWithFormOpen: string
  setActionWithFormOpen: (dottedName: string) => void
  shouldUpdatePersistedActions: boolean
  setShouldUpdatePersistedActions: (value: boolean) => void
  ariaLabelledBy?: string
  listId?: string
}

export default function ActionList({
  actions,
  rules,
  bilan,
  actionWithFormOpen,
  setActionWithFormOpen,
  shouldUpdatePersistedActions,
  setShouldUpdatePersistedActions,
  ariaLabelledBy,
  listId,
}: Props) {
  const { getCategory } = useEngine()
  const { toggleActionChoice } = useUser()

  const { actionChoices } = useCurrentSimulation()

  const isFocusedActionCustom = getIsCustomAction(actionWithFormOpen)

  const { t } = useClientTranslation()

  // This allows us to keep actions displayed even after they have been
  // made unapplicable
  const [actionsPersisted, setActionsPersisted] = useState(actions)

  const handleUpdatePersistedActions = () => {
    setShouldUpdatePersistedActions(true)
  }

  const prevActionWithFormOpen = useRef(actionWithFormOpen)

  useEffect(() => {
    if (actionWithFormOpen && !prevActionWithFormOpen.current) {
      prevActionWithFormOpen.current = actionWithFormOpen
    }
  }, [actionWithFormOpen])

  useEffect(() => {
    if (shouldUpdatePersistedActions) {
      setActionsPersisted(actions)
      setShouldUpdatePersistedActions(false)
    }
  }, [actions, setShouldUpdatePersistedActions, shouldUpdatePersistedActions])

  // Handle scrolling after actions have been updated
  useEffect(() => {
    if (prevActionWithFormOpen.current && actionsPersisted.length > 0) {
      requestAnimationFrame(() => {
        const element = document.getElementById(prevActionWithFormOpen.current)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          })
        }
        prevActionWithFormOpen.current = ''
      })
    }
  }, [actionsPersisted])

  // Inline positioning replaced by accessible modal managed by design-system

  return (
    <ul
      id={listId}
      className="mt-4 flex list-none flex-wrap items-center justify-center p-0"
      aria-labelledby={ariaLabelledBy}
      role="list">
      {actionsPersisted.reduce<React.ReactNode[]>((acc, action) => {
        const isActionFocused = actionWithFormOpen === action.dottedName
        const isIrrelevant = (action as Action & { isIrrelevant: boolean })
          .isIrrelevant

        if (isIrrelevant) {
          return acc
        }

        const cardComponent = (
          <div>
            <ActionCard
              setActionWithFormOpen={setActionWithFormOpen}
              isFocused={isActionFocused}
              rule={rules[action.dottedName]}
              action={action}
              total={bilan?.nodeValue}
              handleUpdatePersistedActions={handleUpdatePersistedActions}
            />
          </div>
        )

        acc.push(
          <Fragment key={action.dottedName}>
            <li className="relative m-2 w-[12rem]">
              {cardComponent}

              {isActionFocused && !isFocusedActionCustom && (
                <Modal
                  isOpen
                  ariaLabel={t(
                    'actions.form.modal.ariaLabel',
                    "Fenêtre modale du formulaire d'action"
                  )}
                  closeModal={() => setActionWithFormOpen('')}
                  hasAbortButton={false}
                  hasAbortCross>
                  <div className="w-full max-w-[40rem]">
                    <FormProvider root={action.dottedName}>
                      <ActionForm
                        key={action.dottedName}
                        action={action}
                        setActionWithFormOpen={setActionWithFormOpen}
                        category={getCategory(action.dottedName)}
                        onComplete={() => {
                          toggleActionChoice(action.dottedName)

                          if (!actionChoices[action.dottedName]) {
                            trackEvent(actionsClickYes(action.dottedName))
                          }
                          setActionWithFormOpen('')
                        }}
                        handleUpdatePersistedActions={
                          handleUpdatePersistedActions
                        }
                      />
                    </FormProvider>
                  </div>
                </Modal>
              )}

              {isActionFocused && isFocusedActionCustom && (
                <Modal
                  isOpen
                  ariaLabel={t(
                    'actions.form.custom.modal.ariaLabel',
                    "Fenêtre modale du formulaire d'action personnalisée"
                  )}
                  closeModal={() => setActionWithFormOpen('')}
                  hasAbortButton={false}
                  hasAbortCross>
                  <div className="w-full max-w-[40rem]">
                    <CustomActionForm
                      key={`${action.dottedName}-custom-form`}
                      dottedName={action.dottedName}
                      setActionWithFormOpen={setActionWithFormOpen}
                    />
                  </div>
                </Modal>
              )}
            </li>
          </Fragment>
        )

        return acc
      }, [])}
    </ul>
  )
}
