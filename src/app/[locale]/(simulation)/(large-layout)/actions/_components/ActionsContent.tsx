'use client'

import getActions from '@/helpers/actions/getActions'
import {
  useCurrentSimulation,
  useEngine,
  useSimulation,
  useTempEngine,
} from '@/publicodes-state'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Actions from './actionsContent/Actions'
import AllerPlusLoin from './actionsContent/AllerPlusLoin'
import CategoryFilters from './actionsContent/CategoryFilters'
import OptionBar from './actionsContent/OptionBar'

export default function ActionsContent() {
  const { getCategory } = useEngine()
  const containerRef = useRef<HTMLDivElement>(null)

  const [radical, setRadical] = useState(true)

  const searchParams = useSearchParams()

  const category = searchParams.get('catégorie')

  const { actionChoices, progression } = useCurrentSimulation()

  const { rules, getSpecialRuleObject } = useTempEngine()

  const { safeEvaluate } = useSimulation()
  const actions = getActions({
    rules,
    radical,
    safeEvaluate,
    getSpecialRuleObject,
    actionChoices,
  })

  const actionsDisplayed = actions.filter((action: any) =>
    category ? getCategory(action.dottedName) === category : true
  )

  const isSimulationWellStarted = progression > 0.5

  // Manage tab navigation for all focusable elements
  useEffect(() => {
    if (!containerRef.current) return

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    focusableElements.forEach((el) => {
      if (isSimulationWellStarted) {
        // If simulation is started, remove tabIndex=-1 if we added it
        if (el.getAttribute('data-original-tab-index') !== null) {
          const originalValue = el.getAttribute('data-original-tab-index')
          if (originalValue) {
            el.setAttribute('tabindex', originalValue)
          } else {
            el.removeAttribute('tabindex')
          }
          el.removeAttribute('data-original-tab-index')
        }
      } else {
        // If simulation is not started, save original tabIndex and set to -1
        if (el.getAttribute('data-original-tab-index') === null) {
          const currentTabIndex = el.getAttribute('tabindex')
          if (currentTabIndex !== null) {
            el.setAttribute('data-original-tab-index', currentTabIndex)
          } else {
            el.setAttribute('data-original-tab-index', '')
          }
          el.setAttribute('tabindex', '-1')
        }
      }
    })
  }, [isSimulationWellStarted])

  return (
    <div
      ref={containerRef}
      className={`${
        isSimulationWellStarted ? '' : 'pointer-events-none opacity-90'
      } text-center`}
      aria-hidden={isSimulationWellStarted ? false : true}>
      <div className="relative">
        <CategoryFilters actions={actionsDisplayed} />

        <OptionBar
          setRadical={setRadical}
          radical={radical}
          actions={actionsDisplayed}
        />
      </div>

      <Actions
        actions={actionsDisplayed.reverse()}
        rules={rules}
        radical={radical}
      />

      <AllerPlusLoin />
    </div>
  )
}
