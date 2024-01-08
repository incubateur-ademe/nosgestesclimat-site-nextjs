import { Situation } from '../types'
import { dottedNamesMigration } from './dottedNamesMigration'

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
      // We check if the value of a dottedName waiting for an answer from "une possiblité"
      // is defined as a rule `dottedName . value` in the model
      // and migrate the rule if it's possible
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
    if (Object.keys(dottedNamesMigration.key).includes(dottedName)) {
      delete Object.assign(filteredSituation, {
        [dottedNamesMigration.key[dottedName]]: situationValue,
      })[dottedName]
    } else if (
      Object.keys(dottedNamesMigration.value).includes(dottedName) &&
      Object.keys(dottedNamesMigration.value[dottedName]).includes(
        situationValue
      )
    ) {
      filteredSituation[dottedName] =
        dottedNamesMigration.value[dottedName][situationValue]
    } else {
      delete filteredSituation[dottedName]
    }
  })

  return filteredSituation
}
