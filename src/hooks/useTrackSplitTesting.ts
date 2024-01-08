import { splitTestingCookieName } from '@/constants/split-testing'
import { getCookie } from '@/utils/getCookies'
import { useEffect } from 'react'

export function useTrackSplitTesting() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SPLIT_TESTING_BRANCH) return

    const splitTestingPercentage = getCookie(splitTestingCookieName)

    if (splitTestingPercentage !== undefined) {
      window._paq.push([
        'trackEvent',
        'abtesting',
        process.env.NEXT_PUBLIC_SPLIT_TESTING_BRANCH,
        Number(splitTestingPercentage) <
        Number(process.env.NEXT_PUBLIC_SPLIT_TESTING_PERCENTAGE ?? 0.5)
          ? process.env.NEXT_PUBLIC_SPLIT_TESTING_BRANCH
          : 'original',
      ])
    }
  }, [])
}
