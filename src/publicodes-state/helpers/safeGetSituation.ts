import { captureException } from '@sentry/react'
import { DottedName, Situation } from '../types'

export const safeGetSituation = ({
  situation,
  everyRules,
}: {
  situation: Situation
  everyRules: DottedName[]
}): any => {
  const unsupportedDottedNamesFromSituation = Object.keys(situation).filter(
    (dottedName) => {
      // We check if the dotteName is a rule of the model
      if (!everyRules.includes(dottedName)) {
        const error = new Error(
          `error trying to use "${dottedName}" from the user situation: the rule doesn't exist in the model`
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
          `error trying to use "${dottedName}" answer from the user situation: "${situation[dottedName]}" doesn't exist in the model`
        )
        console.warn(error)
        captureException(error)
        return true
      }
    }
  )

  const filteredSituation = { ...situation }

  unsupportedDottedNamesFromSituation.map((dottedName: string) => {
    // If a dottedName is not supported in the model, it is dropped from the situation.
    delete filteredSituation[dottedName]
  })

  return filteredSituation
}
