'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { useCurrentSimulation } from '@/publicodes-state'
import { capitalizeString } from '@/utils/capitalizeString'

export default function PersonaWarning() {
  const { persona } = useCurrentSimulation()

  if (!persona) return null
  return (
    <p>
      <TransClient>👤 Vous utilisez actuellement le persona</TransClient>{' '}
      <span className="font-bold">
        {capitalizeString(persona.split(' . ')[1])}
      </span>
    </p>
  )
}
