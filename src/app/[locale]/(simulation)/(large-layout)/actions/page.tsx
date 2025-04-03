'use client'

import { useSimulation } from '@/publicodes-state'
import ActionsContent from './_components/ActionsContent'
import ActionsTutorial from './_components/ActionsTutorial'
import SimulationMissing from './_components/SimulationMissing'
import ActionsPageSkeleton from './skeleton'

export default function ActionsPage() {
  const { rules } = useSimulation()

  if (!rules) {
    return <ActionsPageSkeleton />
  }

  return (
    <div className="mx-auto my-4 pb-4">
      <SimulationMissing />

      <ActionsTutorial />

      <ActionsContent />
    </div>
  )
}
