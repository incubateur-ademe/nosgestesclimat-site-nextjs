'use client'

import { useCurrentSimulation } from '@/publicodes-state'
import { capitalizeString } from '@/utils/capitalizeString'

export default function PersonaWarning() {
  const { persona } = useCurrentSimulation()

  if (!persona) return null
  return (
    <p>
      <NGCTrans>👤 Vous utilisez actuellement le persona</NGCTrans>{' '}
      <span className="font-bold">
        {capitalizeString(persona.split(' . ')[1])}
      </span>
    </p>
  )
}
