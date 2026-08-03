'use client'
import { carboneMetric, eauMetric } from '@/constants/model/metric'
import Emoji from '@/design-system/utils/Emoji'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Metrics } from '@incubateur-ademe/nosgestesclimat'
import Trans from '../translation/trans/TransClient'

interface OptionType {
  value: string
  label: string
  icon: string
}

export default function FootprintSelector({
  footprintSelected,
  onChange,
}: {
  footprintSelected: Metrics
  onChange: (footprint: Metrics) => void
}) {
  const { t } = useClientTranslation()

  const options: OptionType[] = [
    { value: carboneMetric, label: t('Carbone'), icon: '🌡️' },
    { value: eauMetric, label: t('Eau'), icon: '💧' },
  ]

  const selectedOption = options.find(
    (option) => option.value === footprintSelected
  )

  return (
    <div className="relative rounded-lg">
      <div className="relative block h-full">
        <Select
          value={footprintSelected}
          onValueChange={(value) => onChange((value || '') as Metrics)}>
          <SelectTrigger
            aria-label={t('footprintSelector.ariaLabel', 'Choisir une empreinte')}
            className="min-w-28 cursor-pointer rounded-lg border-2 border-primary-700 bg-transparent py-1 pl-2 pr-2 text-sm text-primary-800 shadow-none transition-colors hover:border-primary-800 hover:bg-primary-100 focus-visible:border-primary-700 focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 focus-visible:outline-hidden">
            <SelectValue>
              {selectedOption && (
                <span className="flex flex-col">
                  <span
                    id="footprint-select-label"
                    className="-mb-1 text-[0.6rem] font-normal text-primary-700 select-none">
                    <Trans>Empreinte</Trans>
                  </span>
                  <span className="flex items-center font-bold">
                    {selectedOption.label}{' '}
                    <Emoji>{selectedOption.icon}</Emoji>
                  </span>
                </span>
              )}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <span className="flex items-center">
                  {option.label} <Emoji>{option.icon}</Emoji>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
