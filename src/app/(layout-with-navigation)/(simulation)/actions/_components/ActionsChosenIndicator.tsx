'use client'

import TransClient from '@/components/translation/TransClient'
import { Appear } from '@/design-system/utils/Animate'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'

export default function ActionsChosenIndicator() {
  const { t } = useClientTranslation()

  const { getCurrentSimulation } = useUser()

  const { actionChoices } = getCurrentSimulation()

  const count = Object.values(actionChoices).filter((a) => a === true).length

  if (count == 0) {
    return '.'
  }

  return (
    <span>
      ,{' '}
      <span className="text-white text-center rounded-sm bg-[#77b255] mr-2 w-[1.3rem] h-[1.8rem] font-bold leading-[0.85rem] inline-block align-middle">
        <Appear>
          <div>{count}</div>
          <div title={t('actions choisies')}>&#10004;</div>
        </Appear>
      </span>
      <TransClient>sélectionnées</TransClient>.
    </span>
  )
}
