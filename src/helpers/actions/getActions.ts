import getSomme from '@/publicodes-state/helpers/getSomme'
import { getCorrectedValue } from '@/utils/getCorrectedValue'
import { sortBy } from '@/utils/sortBy'
import type {
  DottedName,
  NGCRule,
  NGCRuleNode,
  NGCRules,
} from '@abc-transitionbascarbone/near-modele'
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
    }) as EvaluatedNode[]

  const relevantActions = filterIrrelevantActions({
    actions,
    actionChoices,
  }) as NGCRule[]

  const sortedActionsByImpact = sortBy(
    (value: unknown) =>
      (radical ? 1 : -1) * (getCorrectedValue(value as EvaluatedNode) || 1)
  )(relevantActions)

  // Filter disabled actions
  return sortedActionsByImpact.filter((action: any) => {
    const flatRule = rules[action.dottedName as DottedName] as {
      formule: string
    }

    return !getIsActionDisabled(flatRule, action.nodeValue)
  })
}
