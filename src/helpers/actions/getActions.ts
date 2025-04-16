import getSomme from '@/publicodes-state/helpers/getSomme'
import type { Action } from '@/publicodes-state/types'
import { getCorrectedValue } from '@/utils/getCorrectedValue'
import { sortBy } from '@/utils/sortBy'
import type {
  DottedName,
  NGCRule,
  NGCRuleNode,
  NGCRules,
} from '@incubateur-ademe/nosgestesclimat'
import type { EvaluatedNode, PublicodesExpression } from 'publicodes'
import { filterIrrelevantActions } from './filterIrrelevantActions'
import { getIsActionDisabled } from './getIsActionDisabled'

type Props = {
  rules?: NGCRules
  radical: boolean
  safeEvaluate: (rule: PublicodesExpression) => EvaluatedNode | null
  getSpecialRuleObject: (dottedName: DottedName) => EvaluatedNode & NGCRuleNode
  actionChoices: any
}

export default function getActions({
  rules,
  radical,
  safeEvaluate,
  getSpecialRuleObject,
  actionChoices,
}: Props): Action[] {
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
    }) as EvaluatedNode[]

  const relevantActions = filterIrrelevantActions({
    actions,
    actionChoices,
  }) as NGCRule[]

  const sortedActionsByImpact = sortBy(
    (value) =>
      (radical ? 1 : -1) * (getCorrectedValue(value as EvaluatedNode) || 1)
  )(relevantActions) as Action[]

  // Filter disabled actions
  return sortedActionsByImpact.filter((action: any) => {
    const flatRule = rules[action.dottedName as DottedName] as {
      formule: string
    }

    return !getIsActionDisabled(flatRule, action.nodeValue)
  })
}
