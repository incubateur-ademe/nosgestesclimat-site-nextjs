import i18nConfig from '@/i18nConfig'

import { usePathname, useSearchParams } from 'next/navigation'

// Params to anonymise and their replacement in the URL
const PARAMS_TO_ANONYMISE = {
  email: 'email',
  'partner-token': 'partner_token',
  'partner-fallback': 'partner_fallback',
  guestName: 'guest_name',
}

function handlePathnameAnonymisation(pathname: string) {
  let pathnameModified = String(pathname)

  // Anonymise params
  const urlParams = new URLSearchParams(pathnameModified.split('?')[1] ?? '')

  Object.entries(PARAMS_TO_ANONYMISE).forEach(([param, replacementKey]) => {
    pathnameModified = pathnameModified.replace(
      encodeURIComponent(urlParams.get(param)!),
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

  // We don't want to track the slugs of the organisations and theirs polls, as it is publicly accessible.
  const anonymizedUrl = handlePathnameAnonymisation(pathnameUpdated)

  return { url: pathnameUpdated, anonymizedUrl }
}
