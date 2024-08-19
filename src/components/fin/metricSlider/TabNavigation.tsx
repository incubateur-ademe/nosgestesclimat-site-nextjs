'use client'

import Trans from '@/components/translation/Trans'
import Badge from '@/design-system/layout/Badge'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { twMerge } from 'tailwind-merge'
import HeadingButtons from './heading/HeadingButtons'

type Props = {
  isSticky?: boolean
  isStatic?: boolean
}
export default function TabNavigation({ isSticky, isStatic }: Props) {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  return (
    <div
      className={twMerge(
        'pointer-events-auto relative flex w-full items-end justify-between bg-white transition-all',
        isSticky ? 'pt-3' : 'pt-0.5'
      )}>
      <div className="flex">
        <button
          onClick={() => setCurrentMetric('carbone')}
          className={twMerge(
            'z-40 mb-0 rounded-t-xl border-2 px-4 pb-1 pt-2 text-lg font-medium transition-all duration-300',
            currentMetric !== 'carbone'
              ? ' border-transparent border-b-primary-50 text-primary-700'
              : 'border-x-primary-50 border-b-transparent border-t-primary-50 bg-gray-100'
          )}>
          <span className="hidden lg:inline">
            <Trans>Mon empreinte</Trans>{' '}
          </span>
          <strong
            className={twMerge(
              'capitalize lg:normal-case',
              currentMetric !== 'carbone'
                ? 'font-medium'
                : ' font-black text-secondary-700'
            )}>
            carbone
          </strong>
        </button>
        <button
          onClick={() => setCurrentMetric('eau')}
          className={twMerge(
            'relative z-40 mb-0 rounded-t-xl border-2 px-4 pb-1 pt-2 text-lg font-medium transition-all duration-300',
            currentMetric !== 'eau'
              ? 'z-40 border-transparent border-b-primary-50 text-primary-700'
              : 'border-x-primary-50 !border-b-transparent border-t-primary-50 bg-gray-100 '
          )}>
          <span className="hidden lg:inline">
            <Trans>Mon empreinte</Trans>{' '}
          </span>
          <strong
            className={twMerge(
              'capitalize lg:normal-case',
              currentMetric !== 'eau'
                ? 'font-medium'
                : ' font-black text-secondary-700'
            )}>
            eau
          </strong>
          <Badge
            size="xs"
            color="secondary"
            className="absolute bottom-full left-full -translate-x-6 translate-y-3 ">
            BETA
          </Badge>
        </button>
      </div>
      {!isStatic && <HeadingButtons endPage />}
    </div>
  )
}
