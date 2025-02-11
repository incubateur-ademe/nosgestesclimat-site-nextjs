import Trans from '@/components/translation/Trans'
import { carboneMetric } from '@/constants/metric'
import Badge from '@/design-system/layout/Badge'
import Emoji from '@/design-system/utils/Emoji'
import { formatCarbonFootprint } from '@/helpers/formatters/formatCarbonFootprint'
import { useRule } from '@/publicodes-state'
import type { Simulation } from '@/types/organisations'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { t } from 'i18next'
import RepartitionChart from './RepartitionChart'

type Props = {
  simulations: Simulation[]
  value: number
  category: DottedName
  maxValue: number
}

const CATEGORY_LABELS = {
  alimentation: t('Alimentation'),
  logement: t('Logement'),
  transport: t('Transport'),
  'services sociétaux': t('Services'),
  divers: t('Divers'),
}

export default function CategoryListItem({
  simulations,
  value,
  category,
  maxValue,
}: Props) {
  const { icons } = useRule(category)

  const { formattedValue, unit } = formatCarbonFootprint(value, {
    shouldUseAbbreviation: true,
  })

  return (
    <li className="flex flex-col justify-between gap-2 border-t border-solid border-gray-300 py-2 last:border-b md:flex-row md:gap-8">
      <div className="flex items-center justify-between gap-4 md:w-64">
        <div className="flex items-baseline gap-1">
          <Emoji className="mr-2">{icons}</Emoji>{' '}
          <span>
            <Trans>
              {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
            </Trans>
          </span>
        </div>

        <div className="flex flex-col items-end">
          <Badge category={category} className="text-xs">
            {formattedValue} {unit}
          </Badge>
        </div>
      </div>

      <RepartitionChart
        className="min-h-[2.5rem] flex-1 rounded-xl"
        color={`bg-${category.includes('services') ? 'servicessocietaux' : category}-500`}
        maxValue={maxValue}
        items={simulations.map((obj) => ({
          value: obj.computedResults[carboneMetric].categories[category],
          shouldBeHighlighted: !!obj.user?.id,
        }))}
        id={category}
      />
    </li>
  )
}
