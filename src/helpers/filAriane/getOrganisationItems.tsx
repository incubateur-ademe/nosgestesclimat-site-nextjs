'use client'

import TransClient from '@/components/translation/trans/TransClient'
import type { User } from '@/publicodes-state/types'
import type { PublicOrganisationPoll } from '@/types/organisations'
import type { ReactNode } from 'react'

function formatSlugToName(slug: string) {
  return decodeURIComponent(slug).replaceAll('-', ' ')
}

function getBaseItems({ pathname }: { pathname: string }) {
  return [
    {
      href: '/',
      label: <TransClient>Accueil</TransClient>,
      isActive: pathname === '/',
    },
    {
      href: '/organisations',
      label: <TransClient>Organisations</TransClient>,
      isActive: pathname === '/organisations',
    },
  ]
}

function getOrganisationEspaceItems({
  pathname,
  params,
  user,
  isAdmin,
  poll,
}: {
  pathname: string
  params: any
  user: User
  isAdmin: boolean
  poll?: PublicOrganisationPoll | null
}) {
  const items = []
  if (params.orgaSlug) {
    if (isAdmin) {
      items.push({
        href: `/organisations/${params.orgaSlug}`,
        label: <span>{formatSlugToName(params.orgaSlug)}</span>,
        isActive: pathname === `/organisations/${params.orgaSlug}`,
        isDisabled: !user?.organisation?.administratorEmail,
      })
    }

    if (pathname.includes('campagnes')) {
      items.push({
        href: `/organisations/${params.orgaSlug}/campagnes/${params.pollSlug}`,
        label: (
          <>
            {poll?.name ?? (
              <span>
                <TransClient>Campagne de</TransClient> {poll?.organisation.name}
              </span>
            )}
          </>
        ),
        isActive:
          pathname ===
          `/organisations/${params.orgaSlug}/campagnes/${params.pollSlug}`,
      })
    }

    if (pathname.includes('parametres')) {
      items.push({
        href: `/organisations/${params.orgaSlug}/parametres`,
        label: <TransClient>Paramètres</TransClient>,
        isActive:
          pathname === `/organisations/${params.orgaSlug}/parametres` ||
          pathname ===
            `/organisations/${params.orgaSlug}/campagnes/${params.pollSlug}/parametres`,
      })
    }
  }
  return items
}

export function getOrganisationItems({
  pathname,
  params,
  user,
  isAdmin,
  poll,
}: {
  pathname: string
  params: any
  user: User
  isAdmin: boolean
  poll?: PublicOrganisationPoll | null
}): {
  href: string
  label: string | ReactNode
  isActive: boolean
}[] {
  if (!pathname.includes('organisations')) {
    return []
  }

  // These are the items for the organisation page, the connexion and the creation page
  const items = [...getBaseItems({ pathname })]

  if (pathname.includes('demander-demo')) {
    items.push({
      href: '/organisations/demander-demo',
      label: <TransClient>Demander une démo</TransClient>,
      isActive: pathname === '/organisations/demander-demo',
    })
    return items
  }

  // These are the items for the organisation page
  items.push(
    ...getOrganisationEspaceItems({ pathname, params, user, isAdmin, poll })
  )

  return items
}
