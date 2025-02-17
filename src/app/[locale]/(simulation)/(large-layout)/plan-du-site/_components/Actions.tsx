'use client'

import Link from '@/components/Link'
import TransClient from '@/components/translation/trans/TransClient'
import getActions from '@/helpers/actions/getActions'
import { useSimulation, useTempEngine } from '@/publicodes-state'
import { utils } from 'publicodes'

export default function Actions() {
  const { safeEvaluate } = useSimulation()

  const { rules, getSpecialRuleObject } = useTempEngine()

  if (!rules) {
    return null
  }

  const actions = getActions({
    rules,
    radical: true,
    safeEvaluate,
    getSpecialRuleObject,
    actionChoices: [] as any[],
  })

  if (!actions) {
    return null
  }

  return (
    <>
      <h2 data-cypress-id="plan-actions-title">
        <TransClient i18nKey="publicodes.planDuSite.actionsPlus">
          Les actions
        </TransClient>
      </h2>

      <ul className="m-0 list-none p-0">
        {actions.map((action: any) => {
          return (
            <li key={action.dottedName}>
              <Link
                href={`/actions/${utils.encodeRuleName(action.dottedName)}`}>
                {action.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
