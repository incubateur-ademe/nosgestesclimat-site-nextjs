'use client'

import { useCurrentSimulation } from '@/publicodes-state'
import Trans from '../translation/trans/TransClient'

type Props = { currentStep: number }

export default function StepsDisplay({ currentStep }: Props) {
  const { progression } = useCurrentSimulation()

  return (
    <p className="text-secondary-700 mb-2 text-sm font-bold">
      <Trans>Étape</Trans> {currentStep} <Trans>sur</Trans>{' '}
      {progression === 1 ? 2 : 3}
    </p>
  )
}
