'use client'

import Trans from '@/components/translation/Trans'
import { useCurrentSimulation } from '@/publicodes-state'
import { capitalizeString } from '@/utils/capitalizeString'

export default function PersonaWarning() {
  const { persona } = useCurrentSimulation()

  if (!persona) return null
  return (
    <p>
      <Trans>👤 Vous utilisez actuellement le persona</Trans>{' '}
      <span className="font-bold">
        {capitalizeString(persona.split(' . ')[1])}
      </span>
    </p>
  )
}
