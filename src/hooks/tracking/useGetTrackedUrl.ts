import {
  ADMINISTRATOR_EMAIL_KEY,
  ADMINISTRATOR_NAME_KEY,
} from '@/constants/group'
import i18nConfig from '@/i18nConfig'
import { useSearchParams } from 'next/navigation'

import { usePathname } from 'next/navigation'

// Params to anonymise and their replacement in the URL
const PARAMS_TO_ANONYMISE = {
  [ADMINISTRATOR_NAME_KEY]: 'administrator_name',
  [ADMINISTRATOR_EMAIL_KEY]: 'administrator_email',
  email: 'email',
  'partner-token': 'partner_token',
  'partner-fallback': 'partner_fallback',
}

function handlePathnameAnonymisation(pathname: string) {
  // Replace the organisation slug by the placeholder
  const pathNameSegment = pathname
    .split('/')
    .filter((segment) => segment !== '')

  let pathnameModified = String(pathname)

  if (
    pathNameSegment[0] === 'organisations' &&
    !['connexion', 'creer', 'demander-demo', 'creer-campagne'].includes(
      pathNameSegment[1]
    )
  ) {
    pathnameModified = pathnameModified.replace(pathNameSegment[1], 'orga_slug')
  }

  // Replace the poll slug by the placeholder
  if (pathNameSegment[2] === 'campagnes') {
    pathnameModified = pathnameModified.replace(pathNameSegment[3], 'poll_slug')
  }

  // Anonymise other params
  const urlParams = new URLSearchParams(pathnameModified.split('?')[1] ?? '')

  Object.entries(PARAMS_TO_ANONYMISE).forEach(([param, replacementKey]) => {
    pathnameModified = pathnameModified.replace(
      encodeURIComponent(urlParams.get(param) as string),
      replacementKey
    )
  })

  return pathnameModified
}

export function useGetTrackedUrl() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  let pathnameUpdated = String(pathname)

  // We remove the lang prefix from the pathname
  i18nConfig.locales.map((locale) => {
    if (pathname?.startsWith(`/${locale}`)) {
      pathnameUpdated = pathname.slice(3)
    }
  })

  // We convert the question searchParams to a real url
  const questionParams = searchParams.get('question')
  if (questionParams) {
    const category = questionParams.split('.')[0]
    const question = questionParams.replace(category + '.', '')
    pathnameUpdated += `/${category}/${question}`
  }

  // We convert the groupId to a real url
  const groupId = searchParams.get('groupId')
  if (groupId) {
    pathnameUpdated += `/${groupId}`
  }

  // We add a trailing slash
  if (!pathnameUpdated.endsWith('/')) {
    pathnameUpdated += '/'
  }

  // We add the searchParams to the url
  const search = searchParams.toString()
  if (search) {
    pathnameUpdated += `?${search}`
  }

  // We don't want to track the slugs of the organisations and theirs polls on Matomo, as it is publicly accessible.
  const anonymizedUrl = handlePathnameAnonymisation(pathnameUpdated)

  return { url: pathnameUpdated, anonymizedUrl }
}
