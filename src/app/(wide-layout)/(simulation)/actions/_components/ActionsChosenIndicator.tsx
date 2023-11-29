'use client'

import Trans from '@/components/translation/Trans'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'

export default function ActionsChosenIndicator() {
  const { t } = useClientTranslation()

  const { getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  if (!currentSimulation) return

  const actionChoices = currentSimulation.actionChoices

  const count = Object.values(actionChoices).filter((a) => a === true).length

  if (count == 0) {
    return '.'
  }

  return (
    <span>
      ,{' '}
      <span className="mr-2 inline-block h-[1.8rem] w-[1.3rem] rounded-sm bg-[#77b255] text-center align-middle font-bold leading-[0.85rem] text-white">
        <div>{count}</div>
        <div title={t('actions choisies')}>&#10004;</div>
      </span>
      <Trans>sélectionnées</Trans>.
    </span>
  )
}
