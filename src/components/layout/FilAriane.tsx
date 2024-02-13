'use client'

import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import { getOrganisationItems } from '@/helpers/filAriane/getOrganisationItems'
import { useParams, usePathname } from 'next/navigation'

const TARGETED_PATHS = ['organisations']

export default function FilAriane() {
  const pathname = usePathname()
  const params = useParams()

  if (!TARGETED_PATHS.some((path) => pathname.includes(path))) return null

  const getBreadcrumbsItems = (): {
    href: string
    label: string | JSX.Element
    isActive: boolean
  }[] => {
    // Organisation path
    if (pathname.includes('organisations')) {
      return getOrganisationItems({ pathname, params })
    }

    return []
  }

  return <Breadcrumbs items={getBreadcrumbsItems()} />
}
