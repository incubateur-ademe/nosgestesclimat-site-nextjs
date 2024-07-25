'use client'

import Trans from '@/components/translation/Trans'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { twMerge } from 'tailwind-merge'
import HeadingButtons from './heading/HeadingButtons'

type Props = {
  sticky?: boolean
}
export default function DesktopTabNavigation({ sticky }: Props) {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  return (
    <div className="relative z-10 hidden w-full items-end justify-between pt-0.5 lg:flex">
      <div className={twMerge('flex', sticky && 'gap-2')}>
        <button
          onClick={() => setCurrentMetric('carbone')}
          className={twMerge(
            'mb-0 rounded-t-xl border-2 px-4 font-medium transition-all duration-500',
            currentMetric !== 'carbone'
              ? 'border-transparent border-b-primary-50 text-primary-700'
              : 'border-x-primary-50 border-b-transparent border-t-primary-50 bg-gray-100',
            sticky ? 'px-6 pb-0 pt-1 text-sm' : 'pb-1 pt-2 text-lg',
            sticky && currentMetric !== 'carbone' && 'border-primary-50'
          )}>
          {!sticky && (
            <>
              <Trans>Mon empreinte</Trans>{' '}
            </>
          )}
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
            'mb-0 rounded-t-xl border-2 px-4 font-medium transition-all duration-500',
            currentMetric !== 'eau'
              ? 'border-transparent border-b-primary-50 text-primary-700'
              : 'border-x-primary-50 !border-b-transparent border-t-primary-50 bg-gray-100',
            sticky ? 'px-6 pb-0 pt-1 text-sm' : 'pb-1 pt-2 text-lg',
            sticky && currentMetric !== 'eau' && 'border-primary-50'
          )}>
          {!sticky && (
            <>
              <Trans>Mon empreinte</Trans>{' '}
            </>
          )}
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
      {!sticky && <HeadingButtons endPage />}
    </div>
  )
}
