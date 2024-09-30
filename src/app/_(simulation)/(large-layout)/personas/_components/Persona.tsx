'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { fixSituationWithPartialMosaic } from '@/helpers/personas/fixSituationWithPartialMosaic'
import { getPersonaFoldedSteps } from '@/helpers/personas/getPersonaFoldedSteps'
import { useDisposableEngine, useSimulation, useUser } from '@/publicodes-state'
import {
  DottedName,
  Persona as PersonaType,
} from '@incubateur-ademe/nosgestesclimat'
import { useRouter } from 'next/navigation'

type Props = {
  persona: PersonaType
  personaDottedName: string
}

export default function Persona({ persona, personaDottedName }: Props) {
  const router = useRouter()

  const { initSimulation, hideTutorial, currentSimulation } = useUser()

  const { engine } = useDisposableEngine({ situation: {} })

  const {
    everyMosaicChildrenWithParent,
    everyQuestions,
    everyRules,
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
            const fixedSituation = fixSituationWithPartialMosaic({
              situation: persona.situation,
              everyMosaicChildrenWithParent,
              safeGetRule,
              safeEvaluate,
            })
            initSimulation({
              situation: fixedSituation,
              persona: personaDottedName,
              foldedSteps: getPersonaFoldedSteps({
                situation: persona.situation,
                everyMosaicChildrenWithParent,
                everyQuestions,
                everyRules,
                engine,
                safeGetRule,
                safeEvaluate,
              }) as DottedName[],
              progression: 1,
            })
            hideTutorial('testIntro')
            router.refresh()
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
