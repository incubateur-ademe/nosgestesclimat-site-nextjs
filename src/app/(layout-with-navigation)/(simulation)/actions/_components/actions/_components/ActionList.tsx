import FormProvider from '@/publicodes-state/formProvider'
import ActionCard from './ActionCard'
import ActionConversation from './ActionConversation'

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
      {actions.map((evaluation) => {
        const cardComponent = (
          <li key={evaluation.dottedName} className="m-2 w-[12rem]">
            <ActionCard
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
          const category = focusedAction.split(' . ')[0]

          return (
            <div key={convId}>
              <li className="m-4 h-auto w-full">
                <FormProvider root={category} categoryOrder={[category]}>
                  <ActionConversation
                    key={focusedAction}
                    dottedName={focusedAction}
                  />
                </FormProvider>
              </li>
              {cardComponent}
            </div>
          )
        }
        return cardComponent
      })}
    </ul>
  )
}
