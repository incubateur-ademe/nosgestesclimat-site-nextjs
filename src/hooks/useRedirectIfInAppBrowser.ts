import { useEffect, useState } from 'react'
import { useIframe } from './useIframe'

// We only check if the user agent is an In App browser on Android
const rules = ['WebView', 'Android.*(wv)']
const regex = new RegExp(`(${rules.join('|')})`, 'ig')

export const useRedirectIfInAppBrowser = () => {
  const [isInApp, setIsInApp] = useState(false)
  const { isIframe } = useIframe()

  useEffect(() => {
    setIsInApp(Boolean(navigator.userAgent.match(regex)))
  }, [])

  useEffect(() => {
    if (isInApp && !isIframe) {
      window.location.href = `intent:${window.location.href}/#Intent;end`
    }
  }, [isInApp, isIframe])

  return { isInApp }
}
