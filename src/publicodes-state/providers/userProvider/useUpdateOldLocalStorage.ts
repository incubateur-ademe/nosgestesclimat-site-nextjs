import { dottedNamesMigration } from '@/constants/dottedNamesMigration'
import { LocalStorage, Simulation } from '@/publicodes-state/types'
import { useEffect } from 'react'

type Props = {
  storageKey: string
}

export default function useUpdateOldLocalStorage({ storageKey }: Props) {
  useEffect(() => {
    const oldLocalStorage = localStorage.getItem(
      'ecolab-climat::persisted-simulation::v2'
    )
    const currentLocalStorage: LocalStorage = JSON.parse(
      localStorage.getItem(storageKey) || '{}'
    )
    // We don't import the storage if you have a simulation with a persona because it's too buggy and no one cares
    if (
      oldLocalStorage &&
      !oldLocalStorage.includes('persona') &&
      !currentLocalStorage
    ) {
      localStorage.setItem(storageKey, oldLocalStorage)
    }

    // We migrate rules according to `dottedNamesMigration` table
    const filteredLocalStorage: LocalStorage = { ...currentLocalStorage }
    const simulations = filteredLocalStorage?.simulations

    simulations?.map((simulation: Simulation): void => {
      const situation = simulation.situation
      const foldedSteps = simulation.foldedSteps
      Object.entries(situation).map(([dottedName, nodeValue]) => {
        // We check if the non supported dottedName is a key to migrate.
        // Ex: "logement . chauffage . bois . type . bûche . consommation": "xxx" which is now ""logement . chauffage . bois . type . bûches . consommation": "xxx"
        if (Object.keys(dottedNamesMigration.key).includes(dottedName)) {
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
    localStorage.setItem(storageKey, JSON.stringify(filteredLocalStorage))
  }, [storageKey])
}
