import { AnimatePresence, motion } from 'framer-motion'
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
    <ul className="flex justify-center items-center flex-wrap list-none p-0">
      <AnimatePresence>
        {actions.map((evaluation) => {
          const cardComponent = (
            <motion.li
              key={evaluation.dottedName}
              layoutId={evaluation.dottedName}
              animate={{ scale: 1 }}
              initial={{ scale: 0.8 }}
              exit={{ scale: 0.2 }}
              transition={{ duration: 1 }}
              className="w-[12rem] m-2">
              <ActionListCard
                key={evaluation.dottedName}
                focusAction={focusAction}
                isFocused={focusedAction === evaluation.dottedName}
                rule={rules[evaluation.dottedName]}
                evaluation={evaluation}
                total={bilan?.nodeValue}
              />
            </motion.li>
          )

          if (focusedAction === evaluation.dottedName) {
            const convId = 'conv'

            return (
              <>
                <motion.li
                  key={convId}
                  layoutId={convId}
                  animate={{ scale: 1 }}
                  initial={{ scale: 0.8 }}
                  exit={{ scale: 0.2 }}
                  transition={{ duration: 0.5 }}
                  className="w-full m-4 h-auto">
                  <ActionConversation
                    key={focusedAction}
                    dottedName={focusedAction}
                  />
                </motion.li>
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
