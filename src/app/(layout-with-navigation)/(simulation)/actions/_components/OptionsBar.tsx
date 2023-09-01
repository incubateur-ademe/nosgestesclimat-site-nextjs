'use client'

import TransClient from '@/components/translation/TransClient'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useState } from 'react'
import ActionsChosenIndicator from './ActionsChosenIndicator'

type Props = {
  actions: any
  setRadical: any
  radical: boolean
}

export default function ActionsOptionsBar({
  actions,
  setRadical,
  radical,
}: Props) {
  const [visible, setVisible] = useState(false)

  const { t } = useClientTranslation()

  const numberOfAvailableFinalActions = actions.length

  if (!visible) {
    return (
      <div className="text-right absolute right-0">
        <button
          title={t('Ouvrir les options de tri')}
          onClick={() => setVisible(true)}>
          <span role="img" aria-label={t('Ouvrir les options de tri')}>
            ⚙️
          </span>
        </button>
      </div>
    )
  }

  return (
    <div className="block text-center">
      <small role="status">
        {t('publicodes.ActionsOptionsBar.actionsRecap', {
          numberOfAvailableFinalActions,
        })}
        <ActionsChosenIndicator />
      </small>{' '}
      <small className="hidden md:block">
        <TransClient>Triées par :</TransClient>
      </small>{' '}
      <small className="md:hidden block">
        <TransClient>Tri :</TransClient>
      </small>{' '}
      <Button
        onClick={() => setRadical(!radical)}
        title={t('Choisir le type de tri des actions')}>
        {radical ? (
          <span>
            <TransClient>le + d'impact climat</TransClient>
          </span>
        ) : (
          <span>
            <TransClient>le - d'impact climat</TransClient>
          </span>
        )}
      </Button>
      <button
        title={t('Fermer les options de tri')}
        onClick={() => setVisible(false)}>
        <span role="img" aria-label={t('Fermer les options de tri')}>
          ❌
        </span>
      </button>
    </div>
  )
}
