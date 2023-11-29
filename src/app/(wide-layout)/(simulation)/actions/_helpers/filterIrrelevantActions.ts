// TODO : refactor this function which seems overly complex
export const filterIrrelevantActions = ({ actions, actionChoices }: any) => {
  // pour chaque action choisie, on regarde ses frères et soeurs en récupérant la catégorie de l'action
  const testedActions = Object.keys(actionChoices || {})?.reduce(
    (acc: any[], actionChoiceKey: any) => {
      if (!actionChoices[actionChoiceKey]) return acc

      const category = actionChoiceKey.split(' . ')[0]

      const actionObject = actions.find((action: any) => {
        return action.dottedName === actionChoiceKey
      })

      const sameCategoryActions = actions.filter((action: any) => {
        return action.dottedName.split(' . ')[0] === category
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
