import Trans from '@/components/translation/Trans'
import { User } from '@/publicodes-state/types'
import { PollData } from '@/types/organisations'

function formatSlugToName(slug: string) {
  return decodeURIComponent(slug).replaceAll('-', ' ')
}

function getBaseItems({ pathname }: { pathname: string }) {
  return [
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
  poll?: PollData | null
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
        label: <>{poll?.name ?? <Trans>Sans titre</Trans>}</>,
        isActive:
          pathname ===
          `/organisations/${params.orgaSlug}/campagnes/${params.pollSlug}`,
      })
    }

    if (pathname.includes('parametres')) {
      items.push({
        href: `/organisations/${params.orgaSlug}/parametres`,
        label: <Trans>Paramètres</Trans>,
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
  poll?: PollData | null
}): {
  href: string
  label: string | JSX.Element
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
      label: <Trans>Demander une démo</Trans>,
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
