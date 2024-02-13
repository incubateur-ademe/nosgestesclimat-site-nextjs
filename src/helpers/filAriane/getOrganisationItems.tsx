import Trans from '@/components/translation/Trans'
import { capitalizeString } from '@/utils/capitalizeString'

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
}: {
  pathname: string
  params: any
}) {
  const items = []
  if (params.slug) {
    items.push({
      href: `/organisations/mon-espace/${params.slug}`,
      label: <span>{capitalizeString(String(params.slug))}</span>,
      isActive: pathname === `/organisations/${params.slug}`,
    })

    if (pathname.includes('resultats-detailles')) {
      items.push({
        href: `/organisations/mon-espace/${params.slug}/resultats-detailles`,
        label: <Trans>Résultats détaillés</Trans>,
        isActive:
          pathname ===
          `/organisations/mon-espace/${params.slug}/resultats-detailles`,
      })
    }

    if (pathname.includes('parametres')) {
      items.push({
        href: `/organisations/mon-espace/${params.slug}/parametres`,
        label: <Trans>Paramètres</Trans>,
        isActive:
          pathname === `/organisations/mon-espace/${params.slug}/parametres`,
      })
    }
  }
  return items
}

export function getOrganisationItems({
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

  if (pathname.includes('mon-espace')) {
    items.push(...getOrganisationEspaceItems({ pathname, params }))
  }

  return items
}
