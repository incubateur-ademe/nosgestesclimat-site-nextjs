'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useState } from 'react'
import ActionsChosenIndicator from './ActionsChosenIndicator'

type Props = {
  actions: any
  setRadical: any
  radical: boolean
}

export default function OptionBar({ actions, setRadical, radical }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const { t } = useClientTranslation()

  const numberOfAvailableFinalActions = actions.length

  if (!isOpen) {
    return (
      <div className="absolute right-0 top-1 text-right">
        <button
          title={t('Ouvrir les options de tri')}
          onClick={() => setIsOpen(true)}
          className="text-orange-dark">
          <Emoji role="img" aria-label={t('Ouvrir les options de tri')}>
            ⚙️
          </Emoji>
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto my-2 flex items-center justify-center">
      <small role="status">
        {t('publicodes.ActionsOptionsBar.actionsRecap', {
          numberOfAvailableFinalActions,
        })}

        <ActionsChosenIndicator />
      </small>{' '}
      <small className="hidden md:block">
        <Trans>Triées par :</Trans>
      </small>{' '}
      <small className="block md:hidden">
        <Trans>Tri :</Trans>
      </small>{' '}
      <Button
        size="sm"
        color="text"
        className="!underline"
        onClick={() => setRadical(!radical)}
        title={t('Choisir le type de tri des actions')}>
        {radical ? (
          <span>
            <Trans>le + d'impact climat</Trans>
          </span>
        ) : (
          <span>
            <Trans>le - d'impact climat</Trans>
          </span>
        )}
      </Button>
      <button
        title={t('Fermer les options de tri')}
        onClick={() => setIsOpen(false)}>
        <span role="img" aria-label={t('Fermer les options de tri')}>
          ❌
        </span>
      </button>
    </div>
  )
}
