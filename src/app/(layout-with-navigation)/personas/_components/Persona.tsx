'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import {
  useCurrentSimulation,
  useSimulation,
  useUser,
} from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { Persona as PersonaType } from '@incubateur-ademe/nosgestesclimat'
import { fixSituationWithPartialMosaic } from '../_helpers/fixSituationWithPartialMosaic'
import { getPersonaFoldedSteps } from '../_helpers/getPersonaFoldedSteps'

type Props = {
  persona: PersonaType
  personaDottedName: DottedName
}

export default function Persona({ persona, personaDottedName }: Props) {
  const { initSimulation, hideTutorial } = useUser()

  const currentSimulation = useCurrentSimulation()

  const {
    everyMosaicChildrenWithParent,
    everyQuestions,
    everyRules,
    pristineEngine,
    safeEvaluate,
    safeGetRule,
  } = useSimulation()

  const isCurrentPersonaSelected =
    currentSimulation.persona === personaDottedName

  return (
    <Card
      className={`${
        isCurrentPersonaSelected
          ? '!border-2 border-green-500 bg-green-200'
          : 'border-none bg-primary-50'
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
          onClick={() => {
            initSimulation({
              situation: fixSituationWithPartialMosaic({
                situation: persona.situation,
                everyMosaicChildrenWithParent,
                safeGetRule,
                safeEvaluate,
              }),
              persona: personaDottedName,
              foldedSteps: getPersonaFoldedSteps({
                situation: persona.situation,
                everyMosaicChildrenWithParent,
                everyQuestions,
                everyRules,
                pristineEngine,
                safeGetRule,
                safeEvaluate,
              }),
            })
            hideTutorial('testIntro')
          }}>
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
