'use client'

import Link from '@/components/Link'
import { APP_URL } from '@/constants/urls'
import { useTempEngine } from '@/publicodes-state'
import { utils } from 'publicodes'
import getActions from '../../actions/_helpers/getActions'

export default function Actions() {
  const { rules, getRuleObject } = useTempEngine()

  const actions = getActions({
    rules,
    radical: true,
    getRuleObject,
    actionChoices: [] as any[],
    metric: '',
  })

  return (
    <ul className="m-0 list-none p-0">
      {actions.map((action: any) => {
        return (
          <li key={action.dottedName}>
            <Link
              href={`${APP_URL}/actions/${utils.encodeRuleName(
                action.dottedName
              )}`}>
              {action.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
