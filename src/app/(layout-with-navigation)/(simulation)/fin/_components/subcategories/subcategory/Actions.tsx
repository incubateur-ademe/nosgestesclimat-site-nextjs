import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { useEngine, useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import Action from './actions/Action'

type Props = {
  subcategory: DottedName
}

type ActionObject = {
  dottedName: DottedName
  value: number
}

export default function Actions({ subcategory }: Props) {
  const { getValue } = useEngine()

  const { title, actions } = useRule(subcategory)

  if (!actions?.length) return null

  const sortedActions = actions
    .map((action: string) => ({
      dottedName: action,
      value: getValue(action) as number,
    }))
    .sort((a: ActionObject, b: ActionObject) => (a.value > b.value ? -1 : 1))
    .map((actionObject: ActionObject) => actionObject.dottedName)

  const firstThreeActions = sortedActions.slice(0, 3)

  return (
    <>
      <p className="mb-6 text-sm">
        <Trans>
          Voici quelques idées pour vous aider à réduire son impact :
        </Trans>
      </p>
      <div className="mb-4 flex flex-row-reverse gap-4">
        {firstThreeActions.map((action, index) => (
          <Action key={action} action={action} index={index} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link href="/actions" className="text-center text-xs">
          <Trans>Voir tous les gestes {title}</Trans>
        </Link>
      </div>
    </>
  )
}
