import getNamespace from '@/publicodes-state/helpers/getNamespace'

// TODO : refactor this function which seems overly complex
export const filterIrrelevantActions = ({ actions, actionChoices }: any) => {
  // pour chaque action choisie, on regarde ses frères et soeurs en récupérant
  // la catégorie de l'action
  const testedActions = Object.keys(actionChoices || {})?.reduce(
    (acc: any[], actionChoiceKey: any) => {
      if (!actionChoices[actionChoiceKey]) return acc

      // NOTE: we can't use the `getCategory` function from the `useEngine` hook
      // here.
      const category = getNamespace(actionChoiceKey)

      const actionObject = actions.find((action: any) => {
        return action.dottedName === actionChoiceKey
      })

      const sameCategoryActions = actions.filter((action: any) => {
        return getNamespace(action.dottedName) === category
      })

      const actionsWithIrrelevant = sameCategoryActions.map((action: any) => {
        if (
          actionObject?.rawNode?.action?.dépasse?.includes(action.dottedName)
        ) {
          return {
            ...action,
            isIrrelevant: true,
          }
        }
        return action
      })

      return [
        ...acc.filter(
          (action: any) =>
            !actionsWithIrrelevant.some((actionWithIrrelevant: any) => {
              return actionWithIrrelevant.dottedName === action.dottedName
            })
        ),
        ...actionsWithIrrelevant,
      ]
    },
    []
  )

  return [
    ...actions.filter(
      (action: any) =>
        !testedActions.some((actionWithIrrelevant: any) => {
          return actionWithIrrelevant.dottedName === action.dottedName
        })
    ),
    ...testedActions,
  ]
}
