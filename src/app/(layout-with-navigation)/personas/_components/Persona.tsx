'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { useUser } from '@/publicodes-state'
import { Persona as PersonaType } from '@/publicodes-state/types'

type Props = {
  persona: PersonaType
  dottedName: string
}

export default function Persona({ persona, dottedName }: Props) {
  const { initSimulation, getCurrentSimulation } = useUser()

  const isCurrentPersonaSelected =
    getCurrentSimulation()?.persona === dottedName

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
              situation: persona.situation,
              persona: dottedName,
              foldedSteps: Object.keys(persona.situation) || [],
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
