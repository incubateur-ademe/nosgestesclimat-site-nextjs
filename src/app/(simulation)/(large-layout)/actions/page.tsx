'use client'

import { SimulationContext } from '@/publicodes-state/providers/simulationProvider/context'
import { useContext } from 'react'
import ActionsContent from './_components/ActionsContent'
import ActionsTutorial from './_components/ActionsTutorial'
import SimulationMissing from './_components/SimulationMissing'
import ActionsPageSkeleton from './skeleton'

export default function ActionsPage() {
  const { rules } = useContext(SimulationContext)

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
