'use client'

import Button from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { Metric } from '@/publicodes-state/types'

type Props = {
  metric: Metric
  setMetric: (metric: Metric) => void
}

export default function MetricSwitchButton({ metric, setMetric }: Props) {
  const { t } = useClientTranslation()

  return (
    <div className="mb-2 flex justify-center gap-2 lg:justify-end">
      <Button
        lang="fr"
        color={metric === 'carbone' ? 'primary' : 'secondary'}
        onClick={() => setMetric('carbone')}
        size="sm"
        aria-label={t('Evaluer la métrique carbone')}
        className="flex items-center gap-2 px-4 py-3">
        <span>Carbone</span> <Emoji>⚫️</Emoji>
      </Button>
      <Button
        color={metric === 'eau' ? 'primary' : 'secondary'}
        onClick={() => setMetric('eau')}
        size="sm"
        aria-label={t('Evaluer la métrique eau')}
        className="flex items-center gap-2 px-4 py-3">
        <span>Eau</span> <Emoji>💧</Emoji>
      </Button>
    </div>
  )
}
