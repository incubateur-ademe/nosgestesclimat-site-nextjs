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
      {actions.map((action) => {
        const cardComponent = (
          <li key={action.dottedName} className="m-2 w-[12rem]">
            <ActionCard
              focusAction={focusAction}
              isFocused={focusedAction === action.dottedName}
              rule={rules[action.dottedName]}
              action={action}
              total={bilan?.nodeValue}
            />
          </li>
        )

        if (focusedAction === action.dottedName) {
          const convId = 'conv'

          return (
            <div key={convId}>
              <li className="m-4 h-auto w-full">
                <FormProvider root={action.dottedName} categoryOrder={[]}>
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
