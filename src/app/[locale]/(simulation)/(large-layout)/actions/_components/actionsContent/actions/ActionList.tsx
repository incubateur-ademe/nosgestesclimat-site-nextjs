'use client'

import { actionsClickYes } from '@/constants/tracking/pages/actions'
import { getIsCustomAction } from '@/helpers/actions/getIsCustomAction'
import {
  FormProvider,
  useCurrentSimulation,
  useEngine,
  useUser,
} from '@/publicodes-state'
import type { Action } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import { Fragment, useLayoutEffect, useRef, useState } from 'react'
import ActionCard from './ActionCard'
import ActionForm from './ActionForm'
import CustomActionForm from './actionList/CustomActionForm'

type Props = {
  actions: (Action & { isIrrelevant: boolean; value?: number })[]
  rules: Partial<NGCRules>
  bilan: any
  actionWithFormOpen: string
  setActionWithFormOpen: (dottedName: string) => void
}

export default function ActionList({
  actions,
  rules,
  bilan,
  actionWithFormOpen,
  setActionWithFormOpen,
}: Props) {
  const { getCategory } = useEngine()
  const { toggleActionChoice } = useUser()

  const { actionChoices } = useCurrentSimulation()

  const isFocusedActionCustom = getIsCustomAction(actionWithFormOpen)

  const formRef = useRef<HTMLDivElement>(null)
  const [formStyle, setFormStyle] = useState<React.CSSProperties>({
    opacity: 0,
    position: 'absolute',
    zIndex: -1,
  })

  // This allows us to keep actions displayed even after they have been
  // made unapplicable
  const actionsPersistedRef = useRef(actions)

  const handleUpdatePersistedActions = () => {
    actionsPersistedRef.current = actions
  }

  useLayoutEffect(() => {
    const calculatePosition = () => {
      const cardElement = document.getElementById(actionWithFormOpen)
      const formElement = formRef.current

      if (!cardElement || !formElement) return

      const cardRect = cardElement.getBoundingClientRect()
      const liElement = cardElement.parentElement
      if (!liElement) return

      const liRect = liElement.getBoundingClientRect()
      const formWidth = formElement.offsetWidth
      const viewportWidth = window.innerWidth

      const top = cardRect.height - 64

      // Center the form horizontally relative to the viewport
      const leftRelativeToLi = viewportWidth / 2 - formWidth / 2 - liRect.left

      setFormStyle({
        position: 'absolute',
        top: `${top}px`,
        left: `${leftRelativeToLi}px`,
        zIndex: 100,
        opacity: 1,
        transition: 'opacity 0.2s ease-in-out',
      })
    }

    if (actionWithFormOpen) {
      // Delay calculation to ensure form is rendered and has dimensions
      const timer = setTimeout(calculatePosition, 50)
      window.addEventListener('resize', calculatePosition)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', calculatePosition)
        setFormStyle({
          opacity: 0,
          position: 'absolute',
          zIndex: -1,
        })
      }
    }
  }, [actionWithFormOpen, actionsPersistedRef.current.length])

  return (
    <ul className="mt-4 flex list-none flex-wrap items-center justify-center p-0">
      {actionsPersistedRef.current.reduce<React.ReactNode[]>((acc, action) => {
        const isActionFocused = actionWithFormOpen === action.dottedName
        const isIrrelevant = (action as Action & { isIrrelevant: boolean })
          .isIrrelevant

        if (isIrrelevant) {
          return acc
        }

        const cardComponent = (
          <div id={action.dottedName}>
            <ActionCard
              setActionWithFormOpen={setActionWithFormOpen}
              isFocused={isActionFocused}
              rule={rules[action.dottedName]}
              action={action}
              total={bilan?.nodeValue}
              isIrrelevant={isIrrelevant}
            />
          </div>
        )

        acc.push(
          <Fragment key={action.dottedName}>
            <li className="relative m-2 w-[12rem]">
              {cardComponent}

              {isActionFocused && !isFocusedActionCustom && (
                <div
                  ref={formRef}
                  style={formStyle}
                  className="w-4xl max-w-[calc(100vw-2rem)]">
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
              )}

              {isActionFocused && isFocusedActionCustom && (
                <div
                  ref={formRef}
                  style={formStyle}
                  className="w-4xl max-w-[calc(100vw-2rem)]">
                  <CustomActionForm
                    key={`${action.dottedName}-custom-form`}
                    dottedName={action.dottedName}
                    setActionWithFormOpen={setActionWithFormOpen}
                  />
                </div>
              )}
            </li>
          </Fragment>
        )

        return acc
      }, [])}
    </ul>
  )
}
