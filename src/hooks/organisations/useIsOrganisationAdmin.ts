'use client'

import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import { useUser } from '@/publicodes-state'
import { useParams } from 'next/navigation'

export function useIsOrganisationAdmin() {
  const { user } = useUser()

  const params = useParams()

  const { data: organisation, isLoading } = useFetchOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  return { isAdmin: organisation?.slug === params?.orgaSlug, isLoading }
}
