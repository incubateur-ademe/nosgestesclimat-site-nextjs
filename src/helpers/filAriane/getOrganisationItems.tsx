'use client'

import type { User } from '@/publicodes-state/types'
import type { PublicOrganisationPoll } from '@/types/organisations'
import type { TFunction } from 'i18next'

function formatSlugToName(slug: string) {
  return decodeURIComponent(slug).replaceAll('-', ' ')
}

function getOrganisationEspaceItems({
  pathname,
  params,
  user,
  isAdmin,
  poll,
  t,
}: {
  pathname: string
  params: any
  user: User
  isAdmin: boolean
  poll?: PublicOrganisationPoll | null
  t: TFunction
}) {
  const items = []
  if (params.orgaSlug) {
    if (isAdmin) {
      items.push({
        href: `/organisations/${params.orgaSlug}`,
        label: formatSlugToName(params.orgaSlug),
        isActive: pathname === `/organisations/${params.orgaSlug}`,
        isDisabled: !user?.organisation?.administratorEmail,
      })
    }

    if (pathname.includes('campagnes') && poll) {
      items.push({
        href: `/organisations/${params.orgaSlug}/campagnes/${params.pollSlug}`,
        label: poll?.name ?? t('Campagne de') + ' ' + poll?.organisation.name,
        isActive:
          pathname ===
          `/organisations/${params.orgaSlug}/campagnes/${params.pollSlug}`,
      })
    }

    if (pathname.includes('parametres')) {
      items.push({
        href: `/organisations/${params.orgaSlug}/parametres`,
        label: t('Paramètres'),
        isActive:
          pathname === `/organisations/${params.orgaSlug}/parametres` ||
          pathname ===
            `/organisations/${params.orgaSlug}/campagnes/${params.pollSlug}/parametres`,
      })
    }
  }

  if (pathname.includes('connexion')) {
    items.push({
      href: `/organisations/connexion`,
      label: t('Connexion'),
      isActive: pathname === `/organisations/connexion`,
    })
  }

  return items
}

export function getOrganisationItems({
  pathname,
  params,
  user,
  isAdmin,
  poll,
  t,
}: {
  pathname: string
  params: any
  user: User
  isAdmin: boolean
  poll?: PublicOrganisationPoll | null
  t: TFunction
}): {
  href: string
  label: string
  isActive: boolean
}[] {
  if (!pathname.includes('organisations')) {
    return []
  }

  // These are the items for the organisation page, the connexion and the creation page
  const items = []

  if (pathname.includes('demander-demo')) {
    items.push({
      href: '/organisations/demander-demo',
      label: t('Demander une démo'),
      isActive: pathname === '/organisations/demander-demo',
    })
    return items
  }

  // These are the items for the organisation page
  items.push(
    ...getOrganisationEspaceItems({ pathname, params, user, isAdmin, poll, t })
  )

  return items
}
