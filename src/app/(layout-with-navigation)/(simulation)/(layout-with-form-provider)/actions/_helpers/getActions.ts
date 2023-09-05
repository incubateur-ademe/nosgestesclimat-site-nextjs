import { getCorrectedValue } from '@/utils/getCorrectedValue'
import { sortBy } from '@/utils/sortBy'
import { filterIrrelevantActions } from './filterIrrelevantActions'
import { getIsActionDisabled } from './getIsActionDisabled'

type Props = {
  rules: any
  radical: boolean
  metric: string
  getRuleObject: (dottedName: string) => any
  actionChoices: any
}

export default function getActions({
  rules,
  radical,
  metric,
  getRuleObject,
  actionChoices,
}: Props) {
  // Each targeted metric has its own prefiltered actions
  const actionsObject = metric ? rules[`actions ${metric}`] : rules.actions

  const actions: any[] = actionsObject?.formule?.somme?.map((o: any) => {
    const ruleContent = getRuleObject(o)

    return {
      ...ruleContent,
      dottedName: o,
    }
  })

  const relevantActions = filterIrrelevantActions({
    actions,
    actionChoices,
  })

  const sortedActionsByImpact = sortBy(
    (value) => (radical ? 1 : -1) * (getCorrectedValue(value as any) || 1)
  )(relevantActions)

  // Filter disabled actions
  return sortedActionsByImpact.filter((action: any) => {
    const flatRule = rules[action.dottedName] as { formule: string }

    return !getIsActionDisabled(flatRule, action.nodeValue)
  })
}
