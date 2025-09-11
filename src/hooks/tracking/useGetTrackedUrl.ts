import i18nConfig from '@/i18nConfig'
import { useSearchParams } from 'next/navigation'

import { usePathname } from 'next/navigation'

function handleOrganisationModifications(url: string) {
  // Replace the organisation slug by the placeholder
  const pathNameSegment = url.split('/').filter((segment) => segment !== '')

  let urlModified = url
  if (
    pathNameSegment[0] === 'organisations' &&
    !['connexion', 'creer', 'demander-demo', 'creer-campagne'].includes(
      pathNameSegment[1]
    )
  ) {
    urlModified = urlModified.replace(pathNameSegment[1], 'orga_slug')
  }

  // Replace the poll slug by the placeholder
  if (pathNameSegment[2] === 'campagnes') {
    urlModified = urlModified.replace(pathNameSegment[3], 'poll_slug')
  }

  return urlModified
}

export function useGetTrackedUrl() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  let url = pathname

  // We remove the lang prefix from the pathname
  i18nConfig.locales.map((locale) => {
    if (pathname?.startsWith(`/${locale}`)) {
      url = pathname.slice(3)
    }
  })

  // We convert the question searchParams to a real url
  const questionParams = searchParams.get('question')
  if (questionParams) {
    const category = questionParams.split('.')[0]
    const question = questionParams.replace(category + '.', '')
    url += `/${category}/${question}`
  }

  // We convert the groupId to a real url
  const groupId = searchParams.get('groupId')
  if (groupId) {
    url += `/${groupId}`
  }

  // We add a trailing slash
  if (!url.endsWith('/')) {
    url += '/'
  }

  // We add the searchParams to the url
  const search = searchParams.toString()
  if (search) {
    url += `?${search}`
  }

  // We don't want to track the slugs of the organisations and theirs polls on Matomo, as it is publicly accessible.
  const anonymizedUrl = handleOrganisationModifications(url)

  return { url, anonymizedUrl }
}
