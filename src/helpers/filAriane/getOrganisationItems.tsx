import { User } from '@/publicodes-state/types'

function formatSlugToName(slug: string) {
  return decodeURIComponent(slug).replaceAll('-', ' ')
}

function getBaseItems({ pathname }: { pathname: string }) {
  return [
    {
      href: '/',
      label: <NGCTrans>Accueil</NGCTrans>,
      isActive: pathname === '/',
    },
    {
      href: '/organisations',
      label: <NGCTrans>Organisations</NGCTrans>,
      isActive: pathname === '/organisations',
    },
  ]
}

function getOrganisationEspaceItems({
  pathname,
  params,
  user,
  isAdmin,
}: {
  pathname: string
  params: any
  user: User
  isAdmin: boolean
}) {
  const items = []

  if (params.slug) {
    if (isAdmin) {
      items.push({
        href: `/organisations/${params.slug}`,
        label: <span>{formatSlugToName(params.slug)}</span>,
        isActive: pathname === `/organisations/${params.slug}`,
        isDisabled: !user?.organisation?.administratorEmail,
      })
    }

    if (pathname.includes('resultats-detailles')) {
      items.push({
        href: `/organisations/${params.slug}/resultats-detailles`,
        label: (
          <>
            <NGCTrans>Résultats détaillés</NGCTrans>
            {!isAdmin ? ` -  ${formatSlugToName(params.slug)}` : ''}
          </>
        ),
        isActive:
          pathname === `/organisations/${params.slug}/resultats-detailles`,
      })
    }

    if (pathname.includes('parametres')) {
      items.push({
        href: `/organisations/${params.slug}/parametres`,
        label: <NGCTrans>Paramètres</NGCTrans>,
        isActive: pathname === `/organisations/${params.slug}/parametres`,
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
}: {
  pathname: string
  params: any
  user: User
  isAdmin: boolean
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
      label: <NGCTrans>Demander une démo</NGCTrans>,
      isActive: pathname === '/organisations/demander-demo',
    })
    return items
  }

  // These are the items for the organisation page
  items.push(...getOrganisationEspaceItems({ pathname, params, user, isAdmin }))

  return items
}
