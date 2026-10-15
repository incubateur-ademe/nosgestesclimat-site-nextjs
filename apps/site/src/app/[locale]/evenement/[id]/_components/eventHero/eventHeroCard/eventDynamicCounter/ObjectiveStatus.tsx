import Trans from '@/components/translation/trans/TransServer'
import Emoji from '@/design-system/utils/Emoji'
import type { EventStatusWithoutNotStarted } from '@nosgestesclimat/core/features/events/types/status'

interface Props {
  progressPercentage: number
  status: EventStatusWithoutNotStarted
}

export default function ObjectiveStatus({ progressPercentage, status }: Props) {
  if (progressPercentage > 100) {
    return (
      <span>
        <Trans i18nKey="event.dynamicCounter.target.title.over">
          Objectif dépassé
        </Trans>{' '}
        <Emoji>{status === 'ended' ? '✅' : '🚀'}</Emoji>
      </span>
    )
  }

  if (progressPercentage === 100) {
    return (
      <span>
        <Trans i18nKey="event.dynamicCounter.target.title.topped">
          Objectif atteint
        </Trans>{' '}
        <Emoji>🚀</Emoji>
      </span>
    )
  }

  return (
    <Trans i18nKey="event.dynamicCounter.target.title.default">Objectif</Trans>
  )
}
