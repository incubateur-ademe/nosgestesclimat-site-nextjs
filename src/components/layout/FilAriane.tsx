'use client'

import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import { getOrganisationItems } from '@/helpers/filAriane/getOrganisationItems'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import { useFetchPollData } from '@/hooks/organisations/useFetchPollData'
import { useUser } from '@/publicodes-state'
import { useParams, usePathname } from 'next/navigation'

const TARGETED_PATHS = ['/organisations']

export default function FilAriane({ className }: { className?: string }) {
  const pathname = usePathname()

  const params = useParams()

  const { user } = useUser()

  // Handles fetching the organisation data if the user is an administrator
  const { data: organisation } = useFetchOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const isAdmin = organisation?.slug === params.orgaSlug

  const { data: pollData } = useFetchPollData({
    orgaSlug: decodeURIComponent(params.orgaSlug as string),
    pollSlug: decodeURIComponent(params.pollSlug as string),
    enabled: !!params.pollSlug,
  })

  if (!TARGETED_PATHS.some((path) => pathname.includes(path))) return null

  const getBreadcrumbsItems = (): {
    href: string
    label: string | JSX.Element
    isActive: boolean
  }[] => {
    // Organisation path
    if (pathname.includes('/organisations')) {
      return getOrganisationItems({
        pathname,
        params,
        user,
        isAdmin,
        poll: pollData,
      })
    }

    return []
  }

  return <Breadcrumbs className={className} items={getBreadcrumbsItems()} />
}
