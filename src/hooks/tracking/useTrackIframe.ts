import {
  trackingIframeInteraction,
  trackingIframeVisit,
} from '@/constants/tracking/misc'
import {
  captureIframeInteraction,
  captureIframeVisit,
} from '@/constants/tracking/posthogTrackers'
import {
  trackEvent,
  trackPageView,
  trackPosthogEvent,
} from '@/utils/analytics/trackEvent'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGetTrackedUrl } from './useGetTrackedUrl'

export function useTrackIframe(isIframe: boolean) {
  const path = usePathname()

  const { url, anonymizedUrl } = useGetTrackedUrl()

  // inspired from https://usehooks-ts.com/react-hook/use-intersection-observer
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [observed, setObserved] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const getIntegratorUrl = (isIframe: boolean) => {
    const urlParams = new URLSearchParams(window.location.search)

    const isIframeParameterDefined = urlParams.get('iframe') !== null

    if (isIframe && !isIframeParameterDefined) {
      urlParams.set('iframe', 'true')
      urlParams.set(
        'integratorUrl',
        document.location.ancestorOrigins &&
          document.location.ancestorOrigins.length > 0
          ? document.location.ancestorOrigins[0]
          : document.referrer
      )
    }

    return urlParams.get('integratorUrl') || "Pas d'URL d'intégration"
  }

  // Set up the intersection observer
  useEffect(() => {
    if (!isIframe) {
      return
    }

    const node =
      typeof window !== 'undefined'
        ? // Element located in MainLayoutProviders
          document.getElementById('nosgestesclimat-container')
        : null

    if (!node) return

    // Add interaction listeners
    const handleInteraction = () => {
      setHasInteracted(true)
    }

    node.addEventListener('click', handleInteraction)
    node.addEventListener('touchstart', handleInteraction)

    const hasIOSupport = !!window.IntersectionObserver
    if (!hasIOSupport) {
      return () => {
        node.removeEventListener('mouseenter', handleInteraction)
        node.removeEventListener('click', handleInteraction)
        node.removeEventListener('touchstart', handleInteraction)
      }
    }

    const observer = new IntersectionObserver(([entry]) => setEntry(entry))
    observer.observe(node)

    return () => {
      observer.disconnect()
      node.removeEventListener('mouseenter', handleInteraction)
      node.removeEventListener('click', handleInteraction)
      node.removeEventListener('touchstart', handleInteraction)
    }
  }, [isIframe])

  // Track the page view when the iframe is visible
  useEffect(() => {
    if (!isIframe) {
      return
    }

    if (!observed && entry?.isIntersecting) {
      // Track the page view
      trackPageView(url, anonymizedUrl)

      // And with an event
      const urlInteractor = getIntegratorUrl(isIframe)

      trackEvent(trackingIframeVisit(urlInteractor))
      trackPosthogEvent(captureIframeVisit(urlInteractor))
    }
  }, [entry, observed, url, isIframe, anonymizedUrl])

  // Track the iframe event when the iframe is visible AND has been interacted with
  useEffect(() => {
    if (!isIframe || !hasInteracted) {
      return
    }

    if (!observed && entry?.isIntersecting) {
      setObserved(true)

      const urlInteractor = getIntegratorUrl(isIframe)

      trackEvent(trackingIframeInteraction(urlInteractor))
      trackPosthogEvent(captureIframeInteraction(urlInteractor))
    }
  }, [entry, observed, path, isIframe, hasInteracted])
}
