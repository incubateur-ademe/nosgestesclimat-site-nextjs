type Props = {
  getCurrentSimulation: any
  updateCurrentSimulationActionChoices: any
}
export default function useActions({
  getCurrentSimulation,
  updateCurrentSimulationActionChoices,
}: Props) {
  const toggleActionChoice = (actionChoiceDottedName: string) => {
    const currentSimulation = getCurrentSimulation()

    if (!currentSimulation) return

    const isActionSelected = Object.keys(
      currentSimulation.actionChoices || {}
    ).some(
      (actionChoiceKey: string) => actionChoiceKey === actionChoiceDottedName
    )

    if (isActionSelected) {
      const actionChoicesUpdated = { ...currentSimulation.actionChoices }
      delete actionChoicesUpdated[actionChoiceDottedName]

      updateCurrentSimulationActionChoices(actionChoicesUpdated)
    } else {
      updateCurrentSimulationActionChoices({
        ...currentSimulation.actionChoices,
        [actionChoiceDottedName]: true,
      })
    }
  }

  const rejectAction = (actionChoiceDottedName: string) => {
    const currentSimulation = getCurrentSimulation()

    updateCurrentSimulationActionChoices({
      ...currentSimulation.actionChoices,
      [actionChoiceDottedName]: false,
    })
  }
  return { toggleActionChoice, rejectAction }
}
