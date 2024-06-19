'use client'

import RecommendedAction from './RecommendedAction'

export default function RecommendedActions() {
  return (
    <div className="max-w-screen overflow-auto">
      <ul className="flex flex-row gap-4">
        {[
          'alimentation . viande faible empreinte',
          'transport . covoiturage',
          'logement . rénovation énergétique',
        ].map((actionDottedName, index) => (
          <RecommendedAction
            actionDottedName={actionDottedName}
            key={`recommended-actionDottedName-${index}`}
          />
        ))}
      </ul>
    </div>
  )
}
