import { useEffect, useState } from 'react'

const rules = ['WebView', '(iPhone|iPod|iPad)(?!.*Safari/)', 'Android.*(wv)']
const regex = new RegExp(`(${rules.join('|')})`, 'ig')

export const useRedirectIfInAppBrowser = () => {
  const [isInApp, setIsInApp] = useState(false)

  useEffect(() => {
    setIsInApp(Boolean(navigator.userAgent.match(regex)))
  }, [])

  useEffect(() => {
    if (isInApp) {
      window.location.href = `intent:${window.location.href}/#Intent;end`
    }
  }, [isInApp])

  return { isInApp }
}
