import { locales } from '@/i18nConfig'
import { trackPageView } from '@/utils/matomo/trackEvent'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function useTrackPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    let url = pathname

    // We remove the lang prefix from the pathname
    locales.map((locale) => {
      if (pathname.startsWith(`/${locale}`)) {
        url = pathname.slice(3)
      }
    })

    // If there is an organisation name in the pathname, we change it to "organisation-name"
    const pathNameSegment = url.split('/')
    if (
      pathNameSegment[0] === 'organisations' &&
      !['connexion', 'creation', 'demander-demo'].includes(pathNameSegment[1])
    ) {
      url = url.replace(pathNameSegment[1], 'organisation-name')
    }

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

    trackPageView(url)
  }, [pathname, searchParams])
}
