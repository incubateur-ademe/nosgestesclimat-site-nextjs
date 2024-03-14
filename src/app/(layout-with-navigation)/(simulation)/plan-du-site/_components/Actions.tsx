'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { useSimulation, useTempEngine } from '@/publicodes-state'
import { utils } from 'publicodes'
import getActions from '../../actions/_helpers/getActions'

export default function Actions() {
  const { safeEvaluate } = useSimulation()

  const { rules, getRuleObject } = useTempEngine()

  if (!rules) {
    return null
  }

  const actions = getActions({
    rules,
    radical: true,
    safeEvaluate,
    getRuleObject,
    actionChoices: [] as any[],
  })

  if (!actions) {
    return null
  }

  return (
    <>
      <h2 data-cypress-id="plan-actions-title">
        <Trans i18nKey="publicodes.planDuSite.actionsPlus">Les actions</Trans>
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
