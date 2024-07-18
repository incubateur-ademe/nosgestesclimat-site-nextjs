'use client'

import Trans from '@/components/translation/Trans'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { twMerge } from 'tailwind-merge'
import HeadingButtons from './heading/HeadingButtons'

export default function DesktopTabNavigation() {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  return (
    <div className="relative z-10 hidden w-full items-end justify-between pt-1 lg:flex">
      <div className="flex">
        <button
          onClick={() => setCurrentMetric('carbone')}
          className={twMerge(
            'mb-0 rounded-t-xl border-2 px-4 pb-1 pt-2 text-lg font-medium transition-all duration-500',
            currentMetric !== 'carbone'
              ? 'border-transparent border-b-primary-50 text-primary-700'
              : 'border-x-primary-50 border-b-transparent border-t-primary-50 bg-gray-100'
          )}>
          <Trans>Mon empreinte</Trans>{' '}
          <strong
            className={twMerge(
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
            'mb-0 rounded-t-xl border-2 px-4 pb-1 pt-2 text-lg font-medium transition-all duration-500',
            currentMetric !== 'eau'
              ? 'border-transparent border-b-primary-50 text-primary-700'
              : 'border-x-primary-50 border-b-transparent border-t-primary-50 bg-gray-100'
          )}>
          <Trans>Mon empreinte</Trans>{' '}
          <strong
            className={twMerge(
              currentMetric !== 'eau'
                ? 'font-medium'
                : ' font-black text-secondary-700'
            )}>
            eau
          </strong>
        </button>
      </div>
      <HeadingButtons endPage />
    </div>
  )
}
