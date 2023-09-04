import { AnimatePresence } from 'framer-motion'
import ActionConversation from './ActionConversation'
import ActionListCard from './ActionListCard'

type Props = {
  actions: any[]
  rules: any
  bilan: any
  focusedAction: string
  focusAction: (dottedName: string) => void
}

export default function ActionList({
  actions,
  rules,
  bilan,
  focusedAction,
  focusAction,
}: Props) {
  return (
    <ul className="flex list-none flex-wrap items-center justify-center p-0">
      <AnimatePresence>
        {actions.map((evaluation) => {
          const cardComponent = (
            <li key={evaluation.dottedName} className="m-2 w-[12rem]">
              <ActionListCard
                key={evaluation.dottedName}
                focusAction={focusAction}
                isFocused={focusedAction === evaluation.dottedName}
                rule={rules[evaluation.dottedName]}
                evaluation={evaluation}
                total={bilan?.nodeValue}
              />
            </li>
          )

          if (focusedAction === evaluation.dottedName) {
            const convId = 'conv'

            return (
              <>
                <li key={convId} className="m-4 h-auto w-full">
                  <ActionConversation
                    key={focusedAction}
                    dottedName={focusedAction}
                  />
                </li>
                {cardComponent}
              </>
            )
          }
          return cardComponent
        })}
      </AnimatePresence>
    </ul>
  )
}
