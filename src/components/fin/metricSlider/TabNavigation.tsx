'use client'

import Trans from '@/components/translation/Trans'
import { carboneMetric, eauMetric } from '@/constants/metric'
import Badge from '@/design-system/layout/Badge'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { Metric } from '@/publicodes-state/types'
import { twMerge } from 'tailwind-merge'
import HeadingButtons from './heading/HeadingButtons'

const tabSelectedClasses =
  'border-x-primary-50 border-b-transparent border-t-primary-50 bg-gray-100'
const tabNotSelectedClasses =
  'border-transparent border-b-primary-50 text-primary-700'
const carboneTabClasses: Record<Metric, string> = {
  [carboneMetric]: tabSelectedClasses,
  [eauMetric]: tabNotSelectedClasses,
}
const eauTabClasses: Record<Metric, string> = {
  [carboneMetric]: tabNotSelectedClasses,
  [eauMetric]: tabSelectedClasses,
}

const carboneLabelClasses: Record<Metric, string> = {
  [carboneMetric]: 'font-black text-secondary-700',
  [eauMetric]: 'font-medium',
}
const eauLabelClasses: Record<Metric, string> = {
  [carboneMetric]: 'font-medium',
  [eauMetric]: 'font-black text-secondary-700',
}

type Props = {
  isSticky?: boolean
  isStatic?: boolean
  shouldShowWater?: boolean
}
export default function TabNavigation({
  isSticky,
  isStatic,
  shouldShowWater,
}: Props) {
  const { t } = useClientTranslation()

  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  return (
    <div
      className={twMerge(
        'pointer-events-auto relative flex w-full items-end justify-between bg-white transition-all',
        isSticky ? 'pt-3' : 'pt-0.5'
      )}>
      <div className="flex">
        <button
          aria-label={t('Mon empreinte carbone')}
          onClick={() => setCurrentMetric(carboneMetric)}
          className={twMerge(
            'z-40 mb-0 rounded-t-xl border-2 px-4 pb-1 pt-2 text-lg font-medium transition-all duration-300',
            carboneTabClasses[currentMetric]
          )}>
          <span className="hidden lg:inline">
            <Trans>Mon empreinte</Trans>{' '}
          </span>
          <strong
            className={twMerge(
              'capitalize lg:normal-case',
              carboneLabelClasses[currentMetric]
            )}>
            <Trans>carbone</Trans>
          </strong>
        </button>
        {shouldShowWater && (
          <button
            aria-label={t('Mon empreinte eau')}
            onClick={() => setCurrentMetric(eauMetric)}
            className={twMerge(
              'relative z-40 mb-0 rounded-t-xl border-2 px-4 pb-1 pt-2 text-lg font-medium transition-all duration-300',
              eauTabClasses[currentMetric]
            )}>
            <span className="hidden lg:inline">
              <Trans>Mon empreinte</Trans>{' '}
            </span>
            <strong
              className={twMerge(
                'capitalize lg:normal-case',
                eauLabelClasses[currentMetric]
              )}>
              <Trans>eau</Trans>
            </strong>
            <Badge
              size="xs"
              color="secondary"
              className="absolute bottom-full left-full -translate-x-6 translate-y-3 ">
              BETA
            </Badge>
          </button>
        )}
      </div>
      {!isStatic && <HeadingButtons />}
    </div>
  )
}
