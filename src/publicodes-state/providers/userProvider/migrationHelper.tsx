import { dottedNamesMigration } from '@/constants/dottedNamesMigration'
import { DottedName, LocalStorage, Simulation } from '@/publicodes-state/types'

export default function migrationHelper(
  currentLocalStorage: LocalStorage
): LocalStorage | undefined {
  // we can't use spread operator {... currentLocalStorage} as it doesn't deeply clone the object
  const filteredLocalStorage = JSON.parse(JSON.stringify(currentLocalStorage))
  const simulations = filteredLocalStorage?.simulations

  const unsupportedDottedNamesFromSituation: DottedName[] = []

  simulations?.map((simulation: Simulation): void => {
    const situation = simulation.situation
    const foldedSteps = simulation.foldedSteps
    Object.entries(situation).map(([dottedName, nodeValue]) => {
      // We check if the non supported dottedName is a key to migrate.
      // Ex: "logement . chauffage . bois . type . bûche . consommation": "xxx" which is now ""logement . chauffage . bois . type . bûches . consommation": "xxx"
      if (Object.keys(dottedNamesMigration.key).includes(dottedName)) {
        unsupportedDottedNamesFromSituation.push(dottedName)
        if (dottedNamesMigration.key[dottedName] !== '') {
          situation[dottedNamesMigration.key[dottedName]] = nodeValue
          delete situation[dottedName]
          const index = foldedSteps.indexOf(dottedName)
          if (index >= 0) {
            foldedSteps[index] = dottedNamesMigration.key[dottedName]
          }
        } else {
          delete situation[dottedName]
          const index = foldedSteps.indexOf(dottedName)
          if (index > -1) {
            foldedSteps.splice(index, 1)
          }
        }
      }
      if (
        // We check if the value of the non supported dottedName value is a value to migrate.
        // Ex: answer "logement . chauffage . bois . type": "bûche" changed to "bûches"
        // If a value is specified but empty, we consider it to be deleted (we need to ask the question again)
        // Ex: answer "transport . boulot . commun . type": "vélo"
        Object.keys(dottedNamesMigration.value).includes(dottedName) &&
        Object.keys(dottedNamesMigration.value[dottedName]).includes(
          nodeValue as string
        )
      ) {
        unsupportedDottedNamesFromSituation.push(dottedName)
        if (
          dottedNamesMigration.value[dottedName][nodeValue as string] !== ''
        ) {
          situation[dottedName] =
            dottedNamesMigration.value[dottedName][nodeValue as string]
        } else {
          delete situation[dottedName]
          const index = foldedSteps.indexOf(dottedName)
          if (index > -1) {
            foldedSteps.splice(index, 1)
          }
        }
      }
    })
  })
  const haveToMigrate: boolean =
    unsupportedDottedNamesFromSituation.length !== 0

  return haveToMigrate ? filteredLocalStorage : undefined
}
