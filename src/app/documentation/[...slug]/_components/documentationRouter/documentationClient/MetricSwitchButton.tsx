'use client'

import { carboneMetric, eauMetric } from '@/constants/metric'
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
        color={metric === carboneMetric ? 'primary' : 'secondary'}
        onClick={() => setMetric(carboneMetric)}
        size="sm"
        aria-label={t('Evaluer la métrique carbone')}
        className="flex items-center gap-2 px-4 py-3">
        <span>Carbone</span> <Emoji>⚫️</Emoji>
      </Button>
      <Button
        color={metric === eauMetric ? 'primary' : 'secondary'}
        onClick={() => setMetric(eauMetric)}
        size="sm"
        aria-label={t('Evaluer la métrique eau')}
        className="flex items-center gap-2 px-4 py-3">
        <span>Eau</span> <Emoji>💧</Emoji>
      </Button>
    </div>
  )
}
