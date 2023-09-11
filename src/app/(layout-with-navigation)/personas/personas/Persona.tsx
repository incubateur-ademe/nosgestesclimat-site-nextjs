'use client'

import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { useUser } from '@/publicodes-state'
import { Persona as PersonaType } from '@/publicodes-state/types'

type Props = {
  persona: PersonaType
  dottedName: string
}

export default function Persona({ persona, dottedName }: Props) {
  const { initSimulation } = useUser()

  return (
    <Card>
      <div className="flex flex-col items-center justify-between">
        <div className="text-lg">{persona['icônes']}</div>
        <h3>{persona.nom}</h3>
        <p className="text-center text-sm">
          {persona['résumé'] || persona['description']}
        </p>
        <Button
          size="sm"
          onClick={() =>
            initSimulation({
              situation: persona.situation,
              persona: dottedName,
            })
          }>
          Selectionner
        </Button>
      </div>
    </Card>
  )
}
