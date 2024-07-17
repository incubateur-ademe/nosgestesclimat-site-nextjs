'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
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
      <div className="flex w-full flex-wrap items-start justify-between p-4">
        <Title
          className="text-lg md:text-2xl"
          hasSeparator={false}
          title={
            <>
              <Trans>Mon empreinte</Trans>{' '}
              <strong className="font-black text-secondary-700">
                {titles[metric]}
              </strong>
            </>
          }
        />
        <HeadingButtons endPage />
      </div>
    </>
  )
}
