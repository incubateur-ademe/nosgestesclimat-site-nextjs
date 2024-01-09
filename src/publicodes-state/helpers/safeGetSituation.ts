import { dottedNamesMigration } from '@/constants/dottedNamesMigration'
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
      // We check if the dotteName is a rule of the model and migrate the rule if it's possible
      if (!everyRules.includes(dottedName)) {
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
        return true
      }
    }
  )

  const filteredSituation = situation

  unsupportedDottedNamesFromSituation.map((dottedName: string) => {
    const situationValue = situation[dottedName] as string
    // We check if the non supported dottedName is a key to migrate.
    // Ex: "logement . chauffage . bois . type . bûche . consommation": "xxx" which is now ""logement . chauffage . bois . type . bûches . consommation": "xxx"
    if (Object.keys(dottedNamesMigration.key).includes(dottedName)) {
      delete Object.assign(filteredSituation, {
        [dottedNamesMigration.key[dottedName]]: situationValue,
      })[dottedName]
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
