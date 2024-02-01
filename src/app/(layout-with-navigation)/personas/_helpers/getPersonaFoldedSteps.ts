import getQuestionsOfMosaic from '@/publicodes-state/helpers/getQuestionsOfMosaic'
import { safeGetSituation } from '@/publicodes-state/helpers/safeGetSituation'
import {
  DottedName,
  Engine,
  NGCEvaluatedNode,
  NGCRuleNode,
} from '@/publicodes-state/types'
import { Situation } from '@/types/simulation'
import { fixSituationWithPartialMosaic } from './fixSituationWithPartialMosaic'

type Props = {
  situation: Situation
  everyMosaic: DottedName[]
  everyMosaicChildren: DottedName[]
  everyQuestions: DottedName[]
  everyRules: DottedName[]
  pristineEngine: Engine
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (rule: DottedName) => NGCEvaluatedNode | null
}

export const getPersonaFoldedSteps = ({
  situation,
  everyMosaic,
  everyMosaicChildren,
  everyQuestions,
  everyRules,
  pristineEngine,
  safeGetRule,
  safeEvaluate,
}: Props) => {
  const personaSituation = fixSituationWithPartialMosaic({
    situation,
    everyMosaic,
    everyMosaicChildren,
    safeGetRule,
    safeEvaluate,
  })
  const safeSituation = safeGetSituation({
    situation: personaSituation,
    everyRules,
  })

  pristineEngine.setSituation(safeSituation)

  // The persona folded steps are obtained by getting the missing variable
  const personaFoldedSteps = [
    ...Object.keys(
      pristineEngine.evaluate('bilan')?.missingVariables || {}
    ).filter((missingVariable) => everyQuestions.includes(missingVariable)),
    ...Object.keys(safeSituation),
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
