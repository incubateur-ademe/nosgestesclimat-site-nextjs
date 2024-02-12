'use client'

import { Persona as PersonaType } from '@/publicodes-state/types'
import Persona from './Persona'

type Props = {
  personas: Record<string, PersonaType>
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
