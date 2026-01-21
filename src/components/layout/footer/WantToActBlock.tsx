'use client'

import Trans from '@/components/translation/trans/TransClient'
import {
  captureFooterNewsletterClick,
  footerNewsletterCTAClick,
} from '@/constants/tracking/layout'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'

export default function WantToActBlock() {
  return (
    <section className="border-primary-700 flex w-96 max-w-full flex-col items-start gap-4 rounded-xl border p-4">
      <p className="text-primary-700 mb-0 font-bold">
        <Trans>Envie d'agir, pas à pas ?</Trans>
      </p>
      <p className="mb-0">
        <Trans>
          Recevez nos infolettres pour comprendre, apprendre et passer à
          l'action simplement.
        </Trans>
      </p>

      <ButtonLink
        color="secondary"
        onClick={() => {
          trackEvent(footerNewsletterCTAClick)
          trackPosthogEvent(captureFooterNewsletterClick())
        }}
        href="/gestion-infolettres">
        <Trans>Je choisis mes infolettres</Trans>
      </ButtonLink>
    </section>
  )
}
