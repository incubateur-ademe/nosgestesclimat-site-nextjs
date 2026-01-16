'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import Card from '@/design-system/layout/Card'
import { fixSituationWithPartialMosaic } from '@/helpers/personas/fixSituationWithPartialMosaic'
import { getPersonaFoldedSteps } from '@/helpers/personas/getPersonaFoldedSteps'
import { useDisposableEngine, useEngine, useUser } from '@/publicodes-state'
import type {
  DottedName,
  Persona as PersonaType,
} from '@incubateur-ademe/nosgestesclimat'
import { useRouter } from 'next/navigation'

interface Props {
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
  } = useEngine()

  const isCurrentPersonaSelected =
    currentSimulation.persona === personaDottedName

  return (
    <Card
      className={`${
        isCurrentPersonaSelected
          ? 'border-2! border-green-500 bg-green-200'
          : 'bg-primary-50 border-none'
      } items-center`}>
      <div className="text-lg">{persona['icônes']}</div>

      <h2>{persona.nom}</h2>

      <p className="text-center text-sm">
        {persona['résumé'] || persona.description}
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
        <p className="align-self-end mt-auto mb-0 p-1 text-sm font-bold">
          <Trans>Sélectionné·e</Trans>
        </p>
      )}
    </Card>
  )
}
