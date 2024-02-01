import getQuestionsOfMosaic from '@/publicodes-state/helpers/getQuestionsOfMosaic'
import { DottedName } from '@/publicodes-state/types'
import { Situation } from '@/types/simulation'

export const getPersonaFoldedSteps = (
  personaSituation: Situation,
  everyMosaic: DottedName[],
  everyMosaicChildren: DottedName[],
  rawMissingVariables: Record<string, number>
) => {
  const personaFoldedSteps = [
    ...Object.keys(rawMissingVariables),
    ...Object.keys(personaSituation),
  ]

  everyMosaic.forEach((mosaic) => {
    const expectedMosaicGroup = getQuestionsOfMosaic({
      dottedName: mosaic,
      everyMosaicChildren,
    })
    let isMosaicInSituation = false
    expectedMosaicGroup.forEach((dottedName) => {
      const index = personaFoldedSteps.indexOf(dottedName)
      if (index > -1) {
        personaFoldedSteps.splice(index, 1)
        isMosaicInSituation = true
      }
    })
    if (isMosaicInSituation) {
      personaFoldedSteps.push(mosaic)
    }
  })

  return personaFoldedSteps
}
