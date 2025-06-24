import { MUST_NOT_ASK_QUESTIONS } from '@/publicodes-state/constants/questions'
import { checkIfDottedNameShouldNotBeIgnored } from '@/publicodes-state/helpers/checkIfDottedNameShouldNotBeIgnored'
import type { MissingVariables } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { EvaluatedNode, PublicodesExpression } from 'publicodes'

// Gathered from nosgestesclimat-site
const filteredDottedNames: DottedName[] = [
  'divers . publicité',
  'services sociétaux . pression locale',
  'services sociétaux . voter',
  'divers . aider les autres',
  'divers . partage NGC',
  'transport . infolettre',
  'métrique',
  'déforestation',
  'logement . électricité verte',
  'logement . chauffage . électricité',
  'futureco-data . transport . ferry . distance aller . orthodromique',
  'futureco-data . transport . ferry . durée du voyage',
  'futureco-data . transport . ferry . vitesse en kmh',
  'futureco-data . transport . ferry . cabine',
  'futureco-data . transport . ferry . groupe',
  'futureco-data . transport . ferry . consommation de services',
  'futureco-data . transport . ferry . voiture',
  'services sociétaux . devenir producteur photovoltaique',
  'services sociétaux . bien placer argent',
]

export const filterRelevantMissingVariables = ({
  missingVariables,
  extendedFoldedSteps,
  everyQuestions,
  safeEvaluate,
  rawMissingVariables,
}: {
  missingVariables: DottedName[]
  extendedFoldedSteps: DottedName[]
  everyQuestions: DottedName[]
  safeEvaluate: (rule: PublicodesExpression) => EvaluatedNode | null
  rawMissingVariables: MissingVariables
}) => {
  return missingVariables.filter((dottedName: DottedName) => {
    const isFolded = extendedFoldedSteps.indexOf(dottedName) >= 0
    const isManuallyExcluded = filteredDottedNames?.includes(dottedName)
    const isMustNotAskQuestion = MUST_NOT_ASK_QUESTIONS?.has(dottedName)
    const isRelevantQuestion = everyQuestions.includes(dottedName)

    // Vérification d'applicabilité via Publicodes
    const isApplicable = checkIfDottedNameShouldNotBeIgnored({
      dottedName,
      safeEvaluate,
      rawMissingVariables,
    })
    if (dottedName.startsWith('logement . construction')) {
      console.log({
        dottedName,
        result: checkIfDottedNameShouldNotBeIgnored({
          dottedName,
          safeEvaluate,
          rawMissingVariables: {} as MissingVariables,
        }),
        evaluation: safeEvaluate(dottedName),
      })
    }

    return (
      !isManuallyExcluded &&
      !isFolded &&
      !isMustNotAskQuestion &&
      isRelevantQuestion &&
      isApplicable
    )
  })
}
