'use client'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import { NorthStarValue } from '@/types/northstar'
import Emoji from '../utils/Emoji'
import Button from './Button'

type Props = {
  onClick: (index: NorthStarValue) => void
  disabled?: boolean
}

export default function SmileyGrading({ onClick, disabled }: Props) {
  const { t } = useClientTranslation()

  const SMILEYS = [
    {
      emoji: '😕',
      label: t('Pas vraiment, envoyer cette réponse'),
    },
    {
      emoji: '😐',
      label: t('Moyennement, envoyer cette réponse'),
    },
    {
      emoji: '🙂',
      label: t('Oui plutôt, envoyer cette réponse'),
    },
    { emoji: '😃', label: t('Tout à fait, envoyer cette réponse') },
  ]

  return (
    <ul className="flex gap-2">
      {SMILEYS.map(({ emoji, label }, index) => (
        <li key={emoji}>
          <Button
            onClick={() => !disabled && onClick(index as NorthStarValue)}
            color="text"
            className="flex h-[48px] w-[48px] items-center justify-center !p-2"
            disabled={disabled}
            aria-label={label}
            title={label}>
            <Emoji className="text-2xl">{emoji}</Emoji>
          </Button>
        </li>
      ))}
    </ul>
  )
}
