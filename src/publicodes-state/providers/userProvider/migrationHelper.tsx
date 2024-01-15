import { dottedNamesMigration } from '@/constants/dottedNamesMigration'
import {
  DottedName,
  LocalStorage,
  NodeValue,
  Simulation,
  Situation,
} from '@/publicodes-state/types'

function handleMigrationKey({
  dottedName,
  nodeValue,
  situation,
  foldedSteps,
}: {
  dottedName: DottedName
  nodeValue: NodeValue
  situation: Situation
  foldedSteps: DottedName[]
}) {
  if (!dottedNamesMigration.keysToMigrate[dottedName]) {
    return
  }

  // The key is not a key to migrate but a key to delete
  if (dottedNamesMigration.keysToMigrate[dottedName] === '') {
    delete situation[dottedName]
    const index = foldedSteps.indexOf(dottedName)

    if (index > -1) {
      foldedSteps.splice(index, 1)
    }
    return
  }

  // The key is renamed and needs to be migrated
  situation[dottedNamesMigration.keysToMigrate[dottedName]] = nodeValue

  delete situation[dottedName]
  const index = foldedSteps.indexOf(dottedName)

  if (index >= 0) {
    foldedSteps[index] = dottedNamesMigration.keysToMigrate[dottedName]
  }
}

function handleMigrationValue({
  dottedName,
  nodeValue,
  situation,
  foldedSteps,
}: {
  dottedName: DottedName
  nodeValue: NodeValue
  situation: Situation
  foldedSteps: DottedName[]
}) {
  if (!dottedNamesMigration.valuesToMigrate[dottedName]) {
    return
  }

  if (
    dottedNamesMigration.valuesToMigrate[dottedName][nodeValue as string] === ''
  ) {
    delete situation[dottedName]
    const index = foldedSteps.indexOf(dottedName)
    if (index > -1) {
      foldedSteps.splice(index, 1)
    }
    return
  }

  situation[dottedName] =
    dottedNamesMigration.valuesToMigrate[dottedName][nodeValue as string]
}

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
      if (
        Object.keys(dottedNamesMigration.keysToMigrate).includes(dottedName)
      ) {
        unsupportedDottedNamesFromSituation.push(dottedName)

        handleMigrationKey({
          dottedName,
          nodeValue,
          situation,
          foldedSteps,
        })
      }

      if (
        // We check if the value of the non supported dottedName value is a value to migrate.
        // Ex: answer "logement . chauffage . bois . type": "bûche" changed to "bûches"
        // If a value is specified but empty, we consider it to be deleted (we need to ask the question again)
        // Ex: answer "transport . boulot . commun . type": "vélo"
        Object.keys(dottedNamesMigration.valuesToMigrate).includes(
          dottedName
        ) &&
        Object.keys(dottedNamesMigration.valuesToMigrate[dottedName]).includes(
          nodeValue as string
        )
      ) {
        unsupportedDottedNamesFromSituation.push(dottedName)

        handleMigrationValue({
          dottedName,
          nodeValue,
          situation,
          foldedSteps,
        })
      }
    })
  })

  const shouldMigrate: boolean =
    unsupportedDottedNamesFromSituation.length !== 0

  return shouldMigrate ? filteredLocalStorage : undefined
}
