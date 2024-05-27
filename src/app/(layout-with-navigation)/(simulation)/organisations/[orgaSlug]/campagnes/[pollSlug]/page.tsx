'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useParams } from 'next/navigation'

export default function CampagnePage() {
  const { pollSlug } = useParams()

  console.log(pollSlug)

  return (
    <div className="mb-4 flex flex-col justify-between md:flex-nowrap">
      <Title title={<Trans>Campagne</Trans>} />
    </div>
  )
}
