'use client'

import { actionsClickYes } from '@/constants/tracking/pages/actions'
import { getIsCustomAction } from '@/helpers/actions/getIsCustomAction'
import {
  FormProvider,
  useCurrentSimulation,
  useEngine,
  useUser,
} from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import ActionCard from './ActionCard'
import ActionForm from './ActionForm'
import CustomActionForm from './actionList/CustomActionForm'

type Props = {
  actions: any[]
  rules: any
  bilan: any
  focusedAction: string
  setFocusedAction: (dottedName: DottedName) => void
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

  return (
    <ul className="mt-4 flex list-none flex-wrap items-center justify-center p-0">
      {actions.map((action) => {
        const cardComponent = (
          <li key={action.dottedName} className="m-2 w-[12rem]">
            <ActionCard
              setFocusedAction={setFocusedAction}
              isFocused={focusedAction === action.dottedName}
              rule={rules[action.dottedName]}
              action={action}
              total={bilan?.nodeValue}
            />
          </li>
        )

        if (focusedAction === action.dottedName && !isFocusedActionCustom) {
          const convId = 'conv'

          return (
            <>
              <li className="m-4 h-auto w-full" key={convId}>
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
                        // scroll to div bearing the dottedName
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
                </FormProvider>
              </li>

              {cardComponent}
            </>
          )
        }

        if (isFocusedActionCustom && action.dottedName === focusedAction) {
          return (
            <>
              {cardComponent}

              <CustomActionForm
                key={`${action.dottedName}-custom-form`}
                dottedName={action.dottedName}
                setFocusedAction={setFocusedAction}
              />
            </>
          )
        }

        return cardComponent
      })}
    </ul>
  )
}
