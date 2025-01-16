'use client'

import type { Personas } from '@abc-transitionbascarbone/near-modele'
import Persona from './Persona'

type Props = {
  personas: Personas
}

export default function PersonaList({ personas }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {Object.keys(personas).map((key) => (
        <Persona key={key} personaDottedName={key} persona={personas[key]} />
      ))}
    </div>
  )
}
