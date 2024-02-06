'use client'

import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import { capitalizeString } from '@/utils/capitalizeString'
import { useParams, usePathname } from 'next/navigation'
import Trans from '../translation/Trans'

const TARGETED_PATHS = ['organisations']

function getOrganizationItems({
  pathname,
  params,
}: {
  pathname: string
  params: any
}): {
  href: string
  label: string | JSX.Element
  isActive: boolean
}[] {
  if (!pathname.includes('organisations')) {
    return []
  }

  // These are the items for the organization page, the connexion and the creation page
  const baseItems = [
    {
      href: '/',
      label: <Trans>Accueil</Trans>,
      isActive: pathname === '/',
    },
    {
      href: '/organisations',
      label: <Trans>Organisations</Trans>,
      isActive: pathname === '/organisations',
    },
  ]

  if (!pathname.includes('mon-espace')) return baseItems

  const allItems = [...baseItems]

  if (params.slug) {
    allItems.push({
      href: `/organisations/mon-espace/${params.slug}`,
      label: <span>{capitalizeString(String(params.slug))}</span>,
      isActive: pathname === `/organisations/${params.slug}`,
    })
  }

  if (pathname.includes('resultats-detailles')) {
    allItems.push({
      href: `/organisations/mon-espace/${params.slug}/resultats-detailles`,
      label: <Trans>Résultats détaillés</Trans>,
      isActive:
        pathname ===
        `/organisations/mon-espace/${params.slug}/resultats-detailles`,
    })
  }

  if (pathname.includes('parametres')) {
    allItems.push({
      href: `/organisations/mon-espace/${params.slug}/parametres`,
      label: <Trans>Paramètres</Trans>,
      isActive:
        pathname === `/organisations/mon-espace/${params.slug}/parametres`,
    })
  }

  return allItems
}

export default function FilAriane() {
  const pathname = usePathname()
  const params = useParams()

  if (!TARGETED_PATHS.some((path) => pathname.includes(path))) return null

  const getBreadcrumbsItems = (): {
    href: string
    label: string | JSX.Element
    isActive: boolean
  }[] => {
    // Organization path
    if (pathname.includes('organisations')) {
      return getOrganizationItems({ pathname, params })
    }
    return []
  }

  return <Breadcrumbs items={getBreadcrumbsItems()} />
}
