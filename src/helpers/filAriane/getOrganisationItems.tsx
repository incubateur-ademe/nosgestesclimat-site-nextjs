import Trans from '@/components/translation/Trans'
import { User } from '@/publicodes-state/types'
import { capitalizeEachWordInString } from '@/utils/capitalizeEachWordInString'

function formatSlugToName(slug: string) {
  return capitalizeEachWordInString(slug.replaceAll('-', ' '))
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
        isDisabled: !user?.administratorEmail,
      })
    }

    if (pathname.includes('resultats-detailles')) {
      items.push({
        href: `/organisations/${params.slug}/resultats-detailles`,
        label: (
          <>
            <Trans>Résultats détaillés</Trans>
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
        label: <Trans>Paramètres</Trans>,
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
      label: <Trans>Demander une démo</Trans>,
      isActive: pathname === '/organisations/demander-demo',
    })
    return items
  }

  // These are the items for the organisation page
  items.push(...getOrganisationEspaceItems({ pathname, params, user, isAdmin }))

  return items
}
