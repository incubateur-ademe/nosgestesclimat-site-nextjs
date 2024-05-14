'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import HeadingButtons from './heading/HeadingButtons'

export default function Heading() {
  return (
    <>
      <div className="mb-4 flex flex-wrap items-start justify-between">
        <Title
          className="text-lg md:text-2xl"
          title={<Trans>Mon empreinte</Trans>}
        />
        <HeadingButtons endPage />
      </div>
    </>
  )
}
