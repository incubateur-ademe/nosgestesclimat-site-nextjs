'use client'

import Link from '@/components/Link'
import { clickContactEvent } from '@/constants/tracking/pages/faq'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function ContactUsLink() {
  return (
    <Link
      href="/contact"
      onClick={() => {
        trackEvent(clickContactEvent)
      }}>
      accéder à notre page de contact
    </Link>
  )
}
