'use client'

import { trackingFAQClick } from '@/constants/tracking/pages/faq'
import { trackEvent } from '@/utils/analytics/trackEvent'
import { useEffect, useRef } from 'react'

type FAQTrackingWrapperProps = {
  questionId: string
  children: React.ReactNode
}

export default function FAQTrackingWrapper({
  questionId,
  children,
}: FAQTrackingWrapperProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const hasTracked = useRef(false)

  useEffect(() => {
    const details = detailsRef.current
    if (!details) return

    const handleToggle = () => {
      // Track only when opening the FAQ item (not when closing)
      if (details.open && !hasTracked.current) {
        trackEvent(trackingFAQClick(questionId))
        hasTracked.current = true
      }
    }

    details.addEventListener('toggle', handleToggle)

    return () => {
      details.removeEventListener('toggle', handleToggle)
    }
  }, [questionId])

  return (
    <details ref={detailsRef} id={questionId}>
      {children}
    </details>
  )
}
