import getSomme from '@/publicodes-state/helpers/getSomme'
import { DottedName, NGCRules } from '@/publicodes-state/types'
import { getCorrectedValue } from '@/utils/getCorrectedValue'
import { sortBy } from '@/utils/sortBy'
import { filterIrrelevantActions } from './filterIrrelevantActions'
import { getIsActionDisabled } from './getIsActionDisabled'

type Props = {
  rules: NGCRules
  radical: boolean
  getRuleObject: (dottedName: DottedName) => any
  actionChoices: any
}

export default function getActions({
  rules,
  radical,
  getRuleObject,
  actionChoices,
}: Props) {
  const actionsObject = rules.actions
  const somme = getSomme(actionsObject) ?? []

  const actions: any[] = somme.map((actionRuleName: DottedName) => {
    const ruleContent = getRuleObject(actionRuleName)
    return {
      ...ruleContent,
      dottedName: actionRuleName,
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
