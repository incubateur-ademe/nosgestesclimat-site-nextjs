'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { trackEndClickActions } from '@/constants/tracking/pages/end'
import { MON_ESPACE_ACTIONS_PATH } from '@/constants/urls/paths'
import { useEngine, useRule } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import Action from './actions/Action'

interface Props {
  subcategory: DottedName
  noNumberedFootprint?: boolean
}

interface ActionObject {
  dottedName: DottedName
  value: number
}

export default function Actions({ subcategory, noNumberedFootprint }: Props) {
  const { getValue } = useEngine()

  const { title, actions } = useRule(subcategory)

  const filteredActions = noNumberedFootprint
    ? actions
    : actions?.filter((action) => getValue(action))

  if (!filteredActions?.length) return null

  const sortedActions = noNumberedFootprint
    ? filteredActions.sort((a: string) => {
        if (a.includes('voter')) {
          return -1
        }
        return 1
      })
    : filteredActions
        .map((action) => ({
          dottedName: action,
          value: getValue(action) as number,
        }))
        .sort((a: ActionObject, b: ActionObject) =>
          a.value > b.value ? -1 : 1
        )
        .map((actionObject: ActionObject) => actionObject.dottedName)

  const firstThreeActions = sortedActions.slice(0, 3)

  return (
    <>
      {!noNumberedFootprint && (
        <p className="mb-6">
          <Trans>
            Voici quelques idées pour vous aider à réduire votre impact :
          </Trans>
        </p>
      )}
      <ul className="mb-4 flex items-stretch justify-center gap-4">
        {firstThreeActions.map((action, index) => (
          <li key={action} className="flex flex-1 flex-col">
            <Action action={action} index={index} />
          </li>
        ))}
      </ul>
      {!noNumberedFootprint && (
        <div className="flex justify-center">
          <Link
            onClick={() => {
              trackEndClickActions(title)
            }}
            href={MON_ESPACE_ACTIONS_PATH}
            className="text-center text-xs">
            <Trans>Voir tous les gestes</Trans> : {title}
          </Link>
        </div>
      )}
    </>
  )
}
