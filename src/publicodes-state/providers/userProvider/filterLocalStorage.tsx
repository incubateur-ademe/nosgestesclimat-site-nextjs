import { dottedNamesMigration } from '@/constants/dottedNamesMigration'
import {
  DottedName,
  LocalStorage,
  NodeValue,
  Simulation,
  Situation,
} from '@/publicodes-state/types'

function handleMigrationKey({
  ruleName,
  nodeValue,
  situation,
  foldedSteps,
}: {
  ruleName: DottedName
  nodeValue: NodeValue
  situation: Situation
  foldedSteps: DottedName[]
}) {
  if (!dottedNamesMigration.keysToMigrate[ruleName]) {
    return
  }

  // The key is not a key to migrate but a key to delete
  if (dottedNamesMigration.keysToMigrate[ruleName] === '') {
    delete situation[ruleName]
    const index = foldedSteps.indexOf(ruleName)

    if (index > -1) {
      foldedSteps.splice(index, 1)
    }
    return
  }

  // The key is renamed and needs to be migrated
  situation[dottedNamesMigration.keysToMigrate[ruleName]] = nodeValue

  delete situation[ruleName]
  const index = foldedSteps.indexOf(ruleName)

  if (index > -1) {
    foldedSteps[index] = dottedNamesMigration.keysToMigrate[ruleName]
  }
}

function handleMigrationValue({
  ruleName,
  nodeValue,
  situation,
  foldedSteps,
}: {
  ruleName: DottedName
  nodeValue: NodeValue
  situation: Situation
  foldedSteps: DottedName[]
}) {
  if (!dottedNamesMigration.valuesToMigrate[ruleName]) {
    return
  }

  // The value is not a value to migrate and the key has to be deleted
  if (
    dottedNamesMigration.valuesToMigrate[ruleName][nodeValue as string] === ''
  ) {
    delete situation[ruleName]
    const index = foldedSteps.indexOf(ruleName)
    if (index > -1) {
      foldedSteps.splice(index, 1)
    }
    return
  }

  // The value is renamed and needs to be migrated
  situation[ruleName] =
    dottedNamesMigration.valuesToMigrate[ruleName][nodeValue as string]
}

export default function filterLocalStorage(
  currentLocalStorage: LocalStorage
): LocalStorage {
  // we can't use spread operator {... currentLocalStorage} as it doesn't deeply clone the object
  const filteredLocalStorage = JSON.parse(JSON.stringify(currentLocalStorage))
  const simulations = filteredLocalStorage?.simulations

  const unsupportedDottedNamesFromSituation: DottedName[] = []

  simulations?.map((simulation: Simulation): void => {
    const situation = simulation.situation
    const foldedSteps = simulation.foldedSteps

    Object.entries(situation).map(([ruleName, nodeValue]) => {
      // We check if the non supported ruleName is a key to migrate.
      // Ex: "logement . chauffage . bois . type . bûche . consommation": "xxx" which is now ""logement . chauffage . bois . type . bûches . consommation": "xxx"
      if (Object.keys(dottedNamesMigration.keysToMigrate).includes(ruleName)) {
        unsupportedDottedNamesFromSituation.push(ruleName)

        handleMigrationKey({
          ruleName,
          nodeValue,
          situation,
          foldedSteps,
        })
      }

      if (
        // We check if the value of the non supported ruleName value is a value to migrate.
        // Ex: answer "logement . chauffage . bois . type": "bûche" changed to "bûches"
        // If a value is specified but empty, we consider it to be deleted (we need to ask the question again)
        // Ex: answer "transport . boulot . commun . type": "vélo"
        Object.keys(dottedNamesMigration.valuesToMigrate).includes(ruleName) &&
        Object.keys(dottedNamesMigration.valuesToMigrate[ruleName]).includes(
          nodeValue as string
        )
      ) {
        unsupportedDottedNamesFromSituation.push(ruleName)

        handleMigrationValue({
          ruleName,
          nodeValue,
          situation,
          foldedSteps,
        })
      }
    })
  })

  return filteredLocalStorage
}
