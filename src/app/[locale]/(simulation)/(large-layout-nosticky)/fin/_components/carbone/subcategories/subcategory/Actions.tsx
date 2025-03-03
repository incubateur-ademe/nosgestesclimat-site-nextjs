'use client'

import Link from '@/components/Link'
import TransClient from '@/components/translation/trans/TransClient'
import { endClickActions } from '@/constants/tracking/pages/end'
import { useEngine, useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import Action from './actions/Action'

type Props = {
  subcategory: DottedName
  noNumberedFootprint?: boolean
}

type ActionObject = {
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
          <TransClient>
            Voici quelques idées pour vous aider à réduire votre impact :
          </TransClient>
        </p>
      )}
      <div className="mb-4 flex flex-row-reverse justify-center gap-4">
        {firstThreeActions.map((action, index) => (
          <Action key={action} action={action} index={index} />
        ))}
      </div>
      {!noNumberedFootprint && (
        <div className="flex justify-center">
          <Link
            onClick={() => trackEvent(endClickActions)}
            href="/actions"
            className="text-center text-xs">
            <TransClient>Voir tous les gestes</TransClient> : {title}
          </Link>
        </div>
      )}
    </>
  )
}
