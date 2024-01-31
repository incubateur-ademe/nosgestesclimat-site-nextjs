'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { useUser } from '@/publicodes-state'
import {
  DottedName,
  NGCEvaluatedNode,
  NGCRuleNode,
  Persona as PersonaType,
} from '@/publicodes-state/types'
import { fixSituationWithPartialMosaic } from '../_helpers/fixSituationWithPartialMosaic'
type Props = {
  persona: PersonaType
  personaDottedName: DottedName
  everyMosaic: DottedName[]
  everyMosaicChildren: DottedName[]
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (rule: DottedName) => NGCEvaluatedNode | null
}

export default function Persona({
  persona,
  personaDottedName,
  everyMosaic,
  everyMosaicChildren,
  safeEvaluate,
  safeGetRule,
}: Props) {
  const { initSimulation, getCurrentSimulation } = useUser()

  const isCurrentPersonaSelected =
    getCurrentSimulation()?.persona === personaDottedName

  const personaSituation = fixSituationWithPartialMosaic(
    persona.situation,
    everyMosaic,
    everyMosaicChildren,
    safeEvaluate,
    safeGetRule
  )

  return (
    <Card
      className={`${
        isCurrentPersonaSelected
          ? '!border-2 border-green-500 bg-green-200'
          : ''
      } items-center`}>
      <div className="text-lg">{persona['icônes']}</div>

      <h3>{persona.nom}</h3>

      <p className="text-center text-sm">
        {persona['résumé'] || persona['description']}
      </p>

      {!isCurrentPersonaSelected && (
        <Button
          size="sm"
          className="align-self-end mt-auto"
          disabled={isCurrentPersonaSelected}
          onClick={() =>
            initSimulation({
              situation: personaSituation,
              persona: personaDottedName,
              foldedSteps: Object.keys(personaSituation) || [],
            })
          }>
          <Trans>Sélectionner</Trans>
        </Button>
      )}

      {isCurrentPersonaSelected && (
        <p className="align-self-end mb-0 mt-auto p-1 text-sm font-bold">
          <Trans>Sélectionné·e</Trans>
        </p>
      )}
    </Card>
  )
}
