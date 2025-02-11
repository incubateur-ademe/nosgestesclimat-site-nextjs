import { trackingIframe } from '@/constants/tracking/misc'
import { trackEvent, trackPageView } from '@/utils/matomo/trackEvent'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useGetTrackedUrl } from './useGetTrackedUrl'
export function useTrackIframe(isIframe: boolean) {
  const path = usePathname()

  const url = useGetTrackedUrl()

  // inspired from https://usehooks-ts.com/react-hook/use-intersection-observer
  const ref = useRef<HTMLDivElement | null>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [observed, setObserved] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Set up the intersection observer
  useEffect(() => {
    if (!isIframe) {
      return
    }

    const node = ref.current
    if (!node) return

    // Add interaction listeners
    const handleInteraction = () => {
      setHasInteracted(true)
    }

    node.addEventListener('mouseenter', handleInteraction)
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
  }, [ref, isIframe])

  // Track the page view when the iframe is visible
  useEffect(() => {
    if (!isIframe) {
      return
    }

    if (!observed && entry && entry.isIntersecting) {
      // Track the page view
      trackPageView(url)
    }
  }, [entry, observed, url, isIframe])

  // Track the iframe event when the iframe is visible AND has been interacted with
  useEffect(() => {
    if (!isIframe || !hasInteracted) {
      return
    }

    if (!observed && entry && entry.isIntersecting) {
      setObserved(true)
      const urlParams = new URLSearchParams(window.location.search)

      const isIframeParameterDefined = urlParams.get('iframe') !== null

      if (isIframe && !isIframeParameterDefined) {
        urlParams.set('iframe', '')
        urlParams.set(
          'integratorUrl',
          document.location.ancestorOrigins &&
            document.location.ancestorOrigins.length > 0
            ? document.location.ancestorOrigins[0]
            : document.referrer
        )
      }

      trackEvent(
        trackingIframe(
          urlParams.get('integratorUrl') || "Pas d'URL d'intégration"
        )
      )
    }
  }, [entry, observed, path, isIframe, hasInteracted])

  return ref
}
