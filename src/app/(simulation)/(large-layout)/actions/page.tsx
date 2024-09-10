'use client'

import { SimulationContext } from '@/publicodes-state/providers/simulationProvider/context'
import { useContext } from 'react'
import ActionsContent from './_components/ActionsContent'
import ActionsTutorial from './_components/ActionsTutorial'
import SimulationMissing from './_components/SimulationMissing'

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

function ActionsPageSkeleton() {
  return (
    <div className="mx-auto my-4 animate-pulse pb-4">
      <div className="mb-8 h-36 w-full rounded-md bg-primary-100"></div>

      <div className="mx-auto grid grid-cols-1 gap-8 sm:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="mx-auto h-56 w-48 rounded-md bg-primary-100"></div>
        ))}
      </div>
    </div>
  )
}
