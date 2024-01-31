'use client'

import { useSimulation } from '@/publicodes-state'
import { Persona as PersonaType } from '@/publicodes-state/types'
import Persona from './Persona'

type Props = {
  personas: Record<string, PersonaType>
}

export default function PersonaList({ personas }: Props) {
  const { everyMosaic, everyMosaicChildren, safeEvaluate, safeGetRule } =
    useSimulation()
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {Object.keys(personas).map((key) => (
        <Persona
          key={key}
          personaDottedName={key}
          persona={personas[key]}
          everyMosaic={everyMosaic}
          everyMosaicChildren={everyMosaicChildren}
          safeEvaluate={safeEvaluate}
          safeGetRule={safeGetRule}
        />
      ))}
    </div>
  )
}
