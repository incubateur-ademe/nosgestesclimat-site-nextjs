'use client'

import { useState } from 'react'
import { Trans } from 'react-i18next'

import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { Simulation } from '@/types/simulation'
import CategoryTable from './_components/CategoryTable'
import { AllOpenProvider } from './_contexts/AllOpenContext'

export default function AnswerList() {
  const [isAllOpen, setIsAllOpen] = useState(false)

  const { t } = useClientTranslation()

  const { simulations, currentSimulation: currentSimulationId } = useUser()

  const currentSimulation = simulations.find(
    (simulation: Simulation) => simulation.id === currentSimulationId
  )

  const { foldedSteps = [] } = currentSimulation || {}

  return (
    <AllOpenProvider value={isAllOpen}>
      <div className="answer-list">
        {foldedSteps.length > 0 ?? (
          <>
            <div className="flex items-center">
              <h2>
                <Trans>📋 Mes réponses</Trans>
              </h2>

              <div className="flex items-center">
                <CheckboxInputGroup
                  name="unfoldAnswerList"
                  label={isAllOpen ? t('Tout déplier') : t('Tout replier')}
                  value={isAllOpen}
                  onChange={() => setIsAllOpen(!isAllOpen)}
                />
              </div>
            </div>
            <CategoryTable />
          </>
        )}
      </div>
    </AllOpenProvider>
  )
}
