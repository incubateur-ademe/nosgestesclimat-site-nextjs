import getSomme from '@/publicodes-state/helpers/getSomme'
import { NGCEvaluatedNode } from '@/publicodes-state/types'
import { getCorrectedValue } from '@/utils/getCorrectedValue'
import { sortBy } from '@/utils/sortBy'
import {
  DottedName,
  NGCRule,
  NGCRuleNode,
  NGCRules,
} from '@incubateur-ademe/nosgestesclimat'
import { PublicodesExpression } from 'publicodes'
import { filterIrrelevantActions } from './filterIrrelevantActions'
import { getIsActionDisabled } from './getIsActionDisabled'

type Props = {
  rules?: NGCRules
  radical: boolean
  safeEvaluate: (rule: PublicodesExpression) => NGCEvaluatedNode | null
  getSpecialRuleObject: (
    dottedName: DottedName
  ) => NGCEvaluatedNode & NGCRuleNode
  actionChoices: any
}

export default function getActions({
  rules,
  radical,
  safeEvaluate,
  getSpecialRuleObject,
  actionChoices,
}: Props) {
  if (!rules) return []

  const actionsObject = rules.actions
  const somme = getSomme(actionsObject) ?? []

  const actions = somme
    .filter(
      (actionRuleName: DottedName) =>
        safeEvaluate({ 'est applicable': actionRuleName })?.nodeValue === true
    )
    .map((actionRuleName: DottedName) => {
      const ruleContent = getSpecialRuleObject(actionRuleName)
      return {
        ...ruleContent,
        dottedName: actionRuleName,
      }
    }) as NGCEvaluatedNode[]

  const relevantActions = filterIrrelevantActions({
    actions,
    actionChoices,
  }) as NGCRule[]

  const sortedActionsByImpact = sortBy(
    (value: unknown) =>
      (radical ? 1 : -1) * (getCorrectedValue(value as NGCEvaluatedNode) || 1)
  )(relevantActions)

  // Filter disabled actions
  return sortedActionsByImpact.filter((action: any) => {
    const flatRule = rules[action.dottedName as DottedName] as {
      formule: string
    }

    return !getIsActionDisabled(flatRule, action.nodeValue)
  })
}
