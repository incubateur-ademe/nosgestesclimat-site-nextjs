'use client'

import Title from '@/design-system/layout/Title'
import { useFetchPollData } from '@/hooks/organisations/useFetchPollData'
import { useParams } from 'next/navigation'
import AdminSection from './_components/AdminSection'

export default function CampagnePage() {
  const { pollSlug, orgaSlug } = useParams()

  const { data: pollData, isLoading } = useFetchPollData({
    orgaSlug: decodeURIComponent(orgaSlug as string),
    pollSlug: decodeURIComponent(pollSlug as string),
  })

  return (
    <div className="mb-4 flex flex-col justify-between md:flex-nowrap">
      <Title title={isLoading ? '...' : pollData?.name} />

      <AdminSection pollData={pollData} />
    </div>
  )
}
