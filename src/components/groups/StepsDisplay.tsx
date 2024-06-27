'use client'

import { useCurrentSimulation } from '@/publicodes-state'
import Trans from '../translation/Trans'

type Props = {
  currentStep: number
}

export default function StepsDisplay({ currentStep }: Props) {
  const { progression } = useCurrentSimulation()

  return (
    <p className="mb-2 text-sm font-bold text-secondary-700">
      <Trans>Étape</Trans> {currentStep} <Trans>sur</Trans>{' '}
      {progression === 1 ? 2 : 3}
    </p>
  )
}
