import { NGCRules } from '@/types/model'
import { getCorrectedValue } from '@/utils/getCorrectedValue'
import { sortBy } from '@/utils/sortBy'
import { getIsActionAmountExceeded } from '../_helpers/getIsActionAmountExceeded'
import { getIsActionDisabled } from '../_helpers/getIsActionDisabled'

type Props = {
  focusedAction: string
  rules: NGCRules
  radical: boolean
  metric: string
  getValue: (dottedName: string) => any
  user: any
}

export default function useActions({
  focusedAction,
  rules,
  radical,
  metric,
  getValue,
  user,
}: Props) {
  const { actionChoices } = user

  const flatActions = metric ? rules[`actions ${metric}`] : rules['actions']

  const objectifs = [
    'bilan',
    ...(((flatActions as any) || {})?.formule?.somme || []),
  ]

  const targets: any[] = objectifs.map((o) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ruleContent = getValue(o)

    return {
      ...ruleContent,
      dottedName: o,
    }
  })

  const actions = targets.filter((t) => t.dottedName !== 'bilan')

  const sortedActionsByImpact = sortBy(
    (value) => (radical ? 1 : -1) * (getCorrectedValue(value as any) || 1)
  )(actions)

  const interestingActions = sortedActionsByImpact.filter((action: any) => {
    const flatRule = rules[action.dottedName] as { formule: string }

    const isAmountExceeded = getIsActionAmountExceeded(
      action.dottedName,
      rules,
      actionChoices
    )

    const isActionDisabled = getIsActionDisabled(flatRule, action.nodeValue)

    return (
      !isAmountExceeded &&
      (action.dottedName === focusedAction || !isActionDisabled)
    )
  })

  return { interestingActions, targets, rawActionsList: actions }
}
