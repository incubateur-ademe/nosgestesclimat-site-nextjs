'use client'

import { trackEvent } from '@/utils/analytics/trackEvent'
import { useEffect } from 'react'

export default function SplitTestingTracker() {
  useEffect(() => {
    // Get the tracking event from the response headers
    const trackingHeader = document.querySelector(
      'meta[name="x-matomo-tracking"]'
    )
    if (trackingHeader) {
      try {
        const trackingEvent = JSON.parse(
          trackingHeader.getAttribute('content') || ''
        )
        trackEvent(trackingEvent)
      } catch (error) {
        console.error('Error parsing tracking event:', error)
      }
    }
  }, [])

  return null
}
