import { trackPageView } from '@/utils/matomo/trackEvent'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function useTrackPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    let url = pathname

    // We remove the /en/ or /fr/ prefix from the pathname
    if (pathname.startsWith('/en') || pathname.startsWith('/fr')) {
      url = pathname.slice(3)
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
