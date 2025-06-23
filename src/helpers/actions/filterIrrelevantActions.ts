import type {
  DottedName,
  NGCRuleNode,
  NGCRules,
} from '@incubateur-ademe/nosgestesclimat'
import type { EvaluatedNode } from 'publicodes'
import { getIsActionDisabled } from './getIsActionDisabled'

type ActionWithIrrelevant = (EvaluatedNode & NGCRuleNode) & {
  isIrrelevant?: boolean
}

export const filterIrrelevantActions = ({
  actions,
  actionChoices,
  rules,
}: {
  actions: (EvaluatedNode & NGCRuleNode)[]
  actionChoices: Record<DottedName, boolean>
  rules?: NGCRules
}) => {
  // Créer une Map pour stocker les actions modifiées
  const actionsMap = new Map<string, ActionWithIrrelevant>()

  // Initialiser la Map avec toutes les actions originales
  actions.forEach((action) => {
    actionsMap.set(action.dottedName, action)
  })

  // Pour chaque action choisie, traiter les actions de la même catégorie
  Object.entries(actionChoices).forEach(([actionChoiceKey, isChosen]) => {
    if (!isChosen) return

    const chosenAction = actions.find(
      (action) => action.dottedName === actionChoiceKey
    )

    if (!chosenAction?.rawNode?.action?.dépasse) return

    // Marquer les actions "dépassées" comme irrelevant
    const actionsToMarkAsIrrelevant = chosenAction.rawNode.action.dépasse

    actionsToMarkAsIrrelevant.forEach((actionName) => {
      const actionToUpdate = actionsMap.get(actionName)
      if (actionToUpdate) {
        actionsMap.set(actionName, {
          ...actionToUpdate,
          isIrrelevant: true,
        })
      }
    })
  })

  // Filtrer les actions désactivées si les règles sont fournies
  let filteredActions = Array.from(actionsMap.values())

  if (rules) {
    filteredActions = filteredActions.filter((action) => {
      const flatRule = rules[action.dottedName as DottedName] as {
        formule: string
      }
      return !getIsActionDisabled(
        flatRule,
        action.nodeValue as number | boolean | undefined
      )
    })
  }

  return filteredActions
}
