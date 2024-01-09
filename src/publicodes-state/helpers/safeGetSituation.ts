import { dottedNamesMigration } from '@/constants/dottedNamesMigration'
import { captureException } from '@sentry/react'
import { Situation } from '../types'

export const safeGetSituation = ({
  situation,
  everyRules,
}: {
  situation: Situation
  everyRules: string[]
}): any => {
  const unsupportedDottedNamesFromSituation = Object.keys(situation).filter(
    (dottedName) => {
      // We check if the dotteName is a rule of the model
      if (!everyRules.includes(dottedName)) {
        const error = new Error(
          `Error trying to use ${dottedName} from the user situation: the rule doesn't exist in the model`
        )
        console.warn(error)
        captureException(error)
        return true
      }
      // We check if the value from a mutliple choices question `dottedName`
      // is defined as a rule `dottedName . value` in the model.
      // If not, the value in the situation is an old option, that is not an option anymore.
      if (
        typeof situation[dottedName] === 'string' &&
        situation[dottedName] !== 'oui' &&
        situation[dottedName] !== 'non' &&
        !everyRules.includes(`${dottedName} . ${situation[dottedName]}`)
      ) {
        const error = new Error(
          `Error trying to use ${dottedName} answer from the user situation: ${situation[dottedName]} doesn't exist in the model`
        )
        console.warn(error)
        captureException(error)
        return true
      }
    }
  )

  const filteredSituation = { ...situation }

  unsupportedDottedNamesFromSituation.map((dottedName: string) => {
    const situationValue = situation[dottedName] as string
    // We check if the non supported dottedName is a key to migrate.
    // Ex: "logement . chauffage . bois . type . bûche . consommation": "xxx" which is now ""logement . chauffage . bois . type . bûches . consommation": "xxx"
    if (Object.keys(dottedNamesMigration.key).includes(dottedName)) {
      filteredSituation[dottedNamesMigration.key[dottedName]] = situationValue
      delete filteredSituation[dottedName]
    } else if (
      // We check if the value of the non supported dottedName value is a value to migrate.
      // Ex: answer "logement . chauffage . bois . type": "bûche" changed to "bûches"
      Object.keys(dottedNamesMigration.value).includes(dottedName) &&
      Object.keys(dottedNamesMigration.value[dottedName]).includes(
        situationValue
      )
    ) {
      filteredSituation[dottedName] =
        dottedNamesMigration.value[dottedName][situationValue]
    } else {
      // In all other case, we drop the non supported dottedName from the situation.
      // Ex: "transport . boulot . commun . type": "vélo" we don't want to migrate.
      delete filteredSituation[dottedName]
    }
  })

  return filteredSituation
}
