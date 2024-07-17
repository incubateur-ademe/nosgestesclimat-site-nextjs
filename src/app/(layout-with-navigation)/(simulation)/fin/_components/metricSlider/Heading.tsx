'use client'

import Trans from '@/components/translation/Trans'
import { Metric } from '@/publicodes-state/types'
import HeadingButtons from './heading/HeadingButtons'

type Props = {
  metric: Metric
}

const titles = {
  carbone: <Trans>carbone</Trans>,
  eau: <Trans>eau</Trans>,
}
export default function Heading({ metric }: Props) {
  return (
    <>
      <div className="flex w-full flex-wrap items-center justify-between py-4 pl-4 pr-2">
        <h1 className="mb-0 text-lg md:text-2xl">
          <Trans>Mon empreinte</Trans>{' '}
          <strong className="font-black text-secondary-700">
            {titles[metric]}
          </strong>
        </h1>
        <HeadingButtons endPage />
      </div>
    </>
  )
}
