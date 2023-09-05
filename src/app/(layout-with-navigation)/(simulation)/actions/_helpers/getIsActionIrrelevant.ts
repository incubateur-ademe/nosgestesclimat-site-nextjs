/**
 * Selecting an action can make another action irrelevant (i.e. : Devenir végétalien rend inutile de réduire sa consommation de viande)
 * @param action
 * @param actionChoices
 * @returns
 */

export const getIsActionIrrelevant = (
  dottedName: string,
  actionsList: any,
  actionChoices: Record<string, boolean>
) => {
  const doesIrrelevantActionListIncludeAction =
    actionsList.length > 0 && actionsList.includes(dottedName)

  if (dottedName === 'alimentation . devenir végétarien')
    console.log({
      doesIrrelevantActionListIncludeAction,
      actionsList,
      value: Object.keys(actionChoices || {}).find((actionKey) => {
        return (
          doesIrrelevantActionListIncludeAction &&
          (actionChoices?.[actionKey] || true)
        )
      }),
    })

  return !!Object.keys(actionChoices || {}).find((actionKey) => {
    return (
      doesIrrelevantActionListIncludeAction &&
      (actionChoices?.[actionKey] || true)
    )
  })
}
