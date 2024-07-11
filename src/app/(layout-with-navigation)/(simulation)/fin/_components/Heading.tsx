'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import HeadingButtons from './heading/HeadingButtons'

const titles = {
  carbone: <Trans>carbone</Trans>,
  eau: <Trans>eau</Trans>,
}
export default function Heading() {
  const currentMetric = useCurrentMetric()

  return (
    <>
      <div className="mb-4 flex flex-wrap items-start justify-between">
        <Title
          className="text-lg md:text-2xl"
          title={
            <>
              <Trans>Mon empreinte</Trans>{' '}
              <span className="text-secondary-700">
                {titles[currentMetric]}
              </span>
            </>
          }
        />
        <HeadingButtons endPage />
      </div>
    </>
  )
}
