'use client'

import CloseIcon from '@/components/icons/Close'
import Trans from '@/components/translation/trans/TransClient'
import { actionsClickYes } from '@/constants/tracking/pages/actions'
import { getIsCustomAction } from '@/helpers/actions/getIsCustomAction'
import {
  FormProvider,
  useCurrentSimulation,
  useEngine,
  useUser,
} from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { Fragment, useLayoutEffect, useRef, useState } from 'react'
import ActionCard from './ActionCard'
import ActionForm from './ActionForm'
import CustomActionForm from './actionList/CustomActionForm'

type Props = {
  actions: any[]
  rules: any
  bilan: any
  focusedAction: string
  setFocusedAction: (dottedName: string) => void
}

export default function ActionList({
  actions,
  rules,
  bilan,
  focusedAction,
  setFocusedAction,
}: Props) {
  const { getCategory } = useEngine()
  const { toggleActionChoice } = useUser()

  const { actionChoices } = useCurrentSimulation()

  const isFocusedActionCustom = getIsCustomAction(focusedAction)

  const formRef = useRef<HTMLDivElement>(null)
  const [formStyle, setFormStyle] = useState<React.CSSProperties>({
    opacity: 0,
    position: 'absolute',
    zIndex: -1,
  })

  useLayoutEffect(() => {
    const calculatePosition = () => {
      const cardElement = document.getElementById(focusedAction)
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

    if (focusedAction) {
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
  }, [focusedAction])

  return (
    <ul className="mt-4 flex list-none flex-wrap items-center justify-center p-0">
      {actions.map((action) => {
        const isActionFocused = focusedAction === action.dottedName

        const cardComponent = (
          <div id={action.dottedName}>
            <ActionCard
              setFocusedAction={setFocusedAction}
              isFocused={isActionFocused}
              rule={rules[action.dottedName]}
              action={action}
              total={bilan?.nodeValue}
              isIrrelevant={action.isIrrelevant}
            />
          </div>
        )

        return (
          <Fragment key={action.dottedName}>
            <li className="relative m-2 w-[12rem]">
              {cardComponent}

              {isActionFocused && !isFocusedActionCustom && (
                <div
                  ref={formRef}
                  style={formStyle}
                  className="w-4xl max-w-[calc(100vw-2rem)] border-none">
                  <FormProvider root={action.dottedName}>
                    <ActionForm
                      key={action.dottedName}
                      category={getCategory(action.dottedName)}
                      onComplete={() => {
                        toggleActionChoice(action.dottedName)

                        if (!actionChoices[action.dottedName]) {
                          trackEvent(actionsClickYes(action.dottedName))
                        }
                        setFocusedAction('')

                        setTimeout(() => {
                          const el = document.getElementById(action.dottedName)
                          if (el) {
                            el.scrollIntoView({
                              behavior: 'smooth',
                              block: 'center',
                              inline: 'center',
                            })
                          }
                        }, 100)
                      }}
                    />
                    <button
                      className="absolute top-4 right-4"
                      onClick={() => setFocusedAction('')}>
                      <CloseIcon />
                      <span className="sr-only">
                        <Trans>Fermer</Trans>
                      </span>
                    </button>
                  </FormProvider>
                </div>
              )}

              {isActionFocused && isFocusedActionCustom && (
                <div
                  ref={formRef}
                  style={formStyle}
                  className="w-4xl max-w-screen border-none">
                  <CustomActionForm
                    key={`${action.dottedName}-custom-form`}
                    dottedName={action.dottedName}
                    setFocusedAction={setFocusedAction}
                  />
                </div>
              )}
            </li>
          </Fragment>
        )
      })}
    </ul>
  )
}
