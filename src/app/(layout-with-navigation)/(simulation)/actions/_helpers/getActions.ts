import { getCorrectedValue } from '@/utils/getCorrectedValue'
import { sortBy } from '@/utils/sortBy'
import { getIsActionAmountExceeded } from './getIsActionAmountExceeded'
import { getIsActionDisabled } from './getIsActionDisabled'

type Props = {
  focusedAction: string
  rules: any
  radical: boolean
  metric: string
  getRuleObject: (dottedName: string) => any
  user: any
}

export default function getActions({
  focusedAction,
  rules,
  radical,
  metric,
  getRuleObject,
  user,
}: Props) {
  const { actionChoices } = user

  // Each targeted metric has its own prefiltered actions
  const actionsObject = metric ? rules[`actions ${metric}`] : rules.actions

  const actions: any[] = actionsObject?.formule?.somme?.map((o: any) => {
    const ruleContent = getRuleObject(o)

    return {
      ...ruleContent,
      dottedName: o,
    }
  })

  const sortedActionsByImpact = sortBy(
    (value) => (radical ? 1 : -1) * (getCorrectedValue(value as any) || 1)
  )(actions)

  return sortedActionsByImpact.filter((action: any) => {
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
}
