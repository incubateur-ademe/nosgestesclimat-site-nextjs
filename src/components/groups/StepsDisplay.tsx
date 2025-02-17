'use client'

import { useCurrentSimulation } from '@/publicodes-state'
import TransClient from '../translation/trans/TransClient'

type Props = { currentStep: number }

export default function StepsDisplay({ currentStep }: Props) {
  const { progression } = useCurrentSimulation()

  return (
    <p className="mb-2 text-sm font-bold text-secondary-700">
      <TransClient>Étape</TransClient> {currentStep}{' '}
      <TransClient>sur</TransClient> {progression === 1 ? 2 : 3}
    </p>
  )
}
